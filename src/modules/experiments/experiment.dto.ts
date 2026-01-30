import {Prisma} from "../../generated/prisma";

export interface CreateExperimentDto {
    featureKey: string;
    key: string;
}

export interface CreateVariantDto {
    key: string;
    percentage: number;
    payload?: Prisma.JsonValue;
}

export interface CreateAssignmentDto {
    userId: number;
    experimentId: number;
    variantId: number;
}