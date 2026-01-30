import {FeatureRule} from "../../generated/prisma";

export function parseRoleRule(rule: FeatureRule) {
    if (rule.type !== "ROLE") return null;

    if (
        typeof rule.config !== "object" ||
        rule.config === null ||
        !("role" in rule.config)
    ) {
        return null;
    }

    return rule.config as { role: string };
}

export function parseUserRule(rule: FeatureRule) {
    if (rule.type !== "USER") return null;

    if (
        typeof rule.config !== "object" ||
        rule.config === null ||
        !("userId" in rule.config)
    ) {
        return null;
    }

    return rule.config as { userId: number };
}

export function parsePercentRule(rule: FeatureRule) {
    if (rule.type !== "PERCENT") return null;

    if (
        typeof rule.config !== "object" ||
        rule.config === null ||
        !("percentage" in rule.config)
    ) {
        return null;
    }

    return rule.config as { percentage: number };
}