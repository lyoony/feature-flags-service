export interface ExperimentVariant {
    id: number;
    key: string;
    percentage: number;
}

export interface ExperimentEntity {
    id: number;
    key: string;
    featureId: number;
    variants: ExperimentVariant[];
}