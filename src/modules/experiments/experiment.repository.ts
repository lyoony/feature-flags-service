import prisma from "../../db";
import {Experiment, ExperimentVariant, Prisma, ExperimentAssignment} from "../../generated/prisma";
import BatchPayload = Prisma.BatchPayload;
import {CreateVariantDto} from "./experiment.dto";

type ExperimentWithRelation = Prisma.ExperimentGetPayload<{
    include: {
        variants: true,
    },
}>;

type AssignmentWithRelation = Prisma.ExperimentAssignmentGetPayload<{
    include: {
        variant: true,
    },
}>;

export class ExperimentRepository {
    async create(featureId: number, key: string): Promise<Experiment> {
        return prisma.experiment.create({
            data: {
                key,
                feature_id: featureId,
            },
        });
    }

    async getByKey(key: string): Promise<ExperimentWithRelation | null> {
        const experiment = await prisma.experiment.findUnique({
            where: { key },
            include: {
                variants: true,
            },
        });

        if (!experiment) return null;

        return experiment;
    }

    async addVariants(experimentId: number, variants: CreateVariantDto[]): Promise<BatchPayload> {
        return prisma.experimentVariant.createMany({
            data: variants.map(v => ({
                experiment_id: experimentId,
                key: v.key,
                percentage: v.percentage,
                payload: v.payload as Prisma.InputJsonArray
            }))
        });
    }

    async updateVariants(variantId: number, data: Partial<CreateVariantDto>): Promise<ExperimentVariant> {
        return prisma.experimentVariant.update({
            where: { id: variantId },
            data: {
                key: data.key,
                percentage: data.percentage,
                payload: data.payload as Prisma.InputJsonArray
            },
        });
    }

    async createAssignment(data: { userId: number, experimentId: number, variantId: number }): Promise<ExperimentAssignment> {
        return prisma.experimentAssignment.create({
            data,
        });
    }

    async getAssignment(experimentId: number, userId: number): Promise<AssignmentWithRelation | null> {
        return prisma.experimentAssignment.findUnique({
            where: {
                userId_experimentId: {
                    userId,
                    experimentId,
                }
            },
            include: { variant: true },
        });
    }
}