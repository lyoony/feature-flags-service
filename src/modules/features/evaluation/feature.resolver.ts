import { Feature, FeatureRule } from "../../../generated/prisma";
import { RuleResolver } from "./rule.resolver";
import { EvaluationContext } from "../../../shared/types/evaluation-context";
import { EvaluationResult } from "../../../shared/types/evaluation-context";

export class FeatureResolver {
    constructor(
        private readonly ruleResolvers: RuleResolver[]
    ) {}

    resolve(feature: Feature & { rules: FeatureRule[] }, ctx: EvaluationContext): EvaluationResult {
        if (!feature.isEnabled) {
            return { enabled: false };
        }

        const rules: FeatureRule[] = [...feature.rules].sort(
            (a: FeatureRule, b: FeatureRule) => a.priority - b.priority
        );
        for (const rule of rules) {
            const resolver = this.ruleResolvers.find(r =>
                r.support(rule.type)
            );

            if (!resolver) continue;

            if (resolver.resolve(rule, ctx)) {
                return { enabled: true, reason: rule.type };
            }
        }

        return { enabled: false };
    }
}