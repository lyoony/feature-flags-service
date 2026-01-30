export interface EvaluationContext {
    userId?: number;
    role?: string;
}

export interface EvaluationResult {
    enabled: boolean;
    reason?: string;
    experiment?: {
        key: string;
        payload?: unknown;
    }
}