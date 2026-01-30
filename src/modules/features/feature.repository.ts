import prisma from "../../db";
import { Feature, FeatureRule, Prisma } from "../../generated/prisma";

type FeatureWithRelation = Prisma.FeatureGetPayload<{
    include: {
        rules: true;
        experiments: {
            include: { variants: true };
        };
    };
}>;

export class FeatureRepository {
    async create(data: { key: string, isEnabled: boolean }): Promise<Feature> {
        return prisma.feature.create({
            data,
        });
    }

    async findByKey(key: string): Promise<FeatureWithRelation | null> {
        const feature = await prisma.feature.findUnique({
            where: { key },
            include: {
                rules: true,
                experiments: {
                    include: { variants: true },
                },
            },
        });

        if (!feature) return null;

        return feature;
    }

    async addRule(featureId: number, data: {
        type: string;
        config: any;
        priority: number;
    }): Promise<FeatureRule> {
        return prisma.featureRule.create({
            data: {
                feature_id: featureId,
                ...data,
            }
        });
    }

    async deleteRule(ruleId: number) {
        return prisma.featureRule.delete({
            where: { id: ruleId },
        });
    }
}