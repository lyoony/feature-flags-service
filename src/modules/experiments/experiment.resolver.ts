import {Experiment, ExperimentVariant} from "../../generated/prisma";
import {EvaluationContext} from "../../shared/types/evaluation-context";
import {ExperimentResolve} from "../../shared/types/experiment-resolve";
import {getDeterministicPercent} from "../../shared/hash/deterministicHashing";

export class ExperimentResolver {
    assign(
        experiment: Experiment & { variants: ExperimentVariant[] },
        ctx: EvaluationContext
    ): ExperimentResolve | null {
        if (!ctx.userId) return null;

        const bucket = getDeterministicPercent(`${experiment.id}:${ctx.userId}`);
        let current = 0;
        for (const variant of experiment.variants) {
            current+= variant.percentage;
            if (bucket < current) {
                return {
                    id: variant.id,
                    key: variant.key,
                    payload: variant.payload
                };
            }
        }

        return null;
    }
}