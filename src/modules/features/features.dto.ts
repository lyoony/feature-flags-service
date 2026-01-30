export interface CreateFeatureDto {
    key: string;
    isEnabled?: boolean;
}

export type CreateFeatureRuleDto =
    | {
        type: "ROLE";
        config: { role: "admin" };
        priority?: number;
    }
    | {
        type: "USER";
        config: { userId: number };
        priority?: number;
    }
    | {
        type: "PERCENT";
        config: { percentage: number };
        priority?: number;
    };