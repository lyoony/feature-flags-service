import {FeatureRule} from "../../../generated/prisma";
import {EvaluationContext} from "../../../shared/types/evaluation-context";
import {parsePercentRule, parseRoleRule, parseUserRule} from "../../../shared/helpers/config-parser";
import {getDeterministicPercent} from "../../../shared/hash/deterministicHashing";

export interface RuleResolver {
    support(type: FeatureRule["type"]): boolean;
    resolve(rule: FeatureRule, ctx: EvaluationContext): boolean;
}

export class RoleResolver implements RuleResolver {
    support(type: FeatureRule["type"]): boolean {
        return type === "ROLE";
    }

    resolve(rule: FeatureRule, ctx: EvaluationContext): boolean {
        const config = parseRoleRule(rule);
        if (!config) return false;

        return ctx.role === config.role;
    }
}

export class UserResolver implements RuleResolver {
    support(type: FeatureRule["type"]): boolean {
        return type === "USER";
    }

    resolve(rule: FeatureRule, ctx: EvaluationContext): boolean {
        const config = parseUserRule(rule);
        if (!config) return false;

        return ctx.userId === config.userId;
    }
}

export class PercentResolver implements RuleResolver {
    support(type: FeatureRule["type"]): boolean {
        return type === "PERCENT";
    }

    resolve(rule: FeatureRule, ctx: EvaluationContext): boolean {
        if (!ctx.userId) return false;

        const config = parsePercentRule(rule);
        if (!config) return false;

        const bucket = getDeterministicPercent(`${rule.feature_id}:${ctx.userId}`);

        return bucket < config.percentage;
    }
}