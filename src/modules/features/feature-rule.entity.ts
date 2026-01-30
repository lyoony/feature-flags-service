type RoleConfig = {
    role: "admin"
};

type UserConfig = {
    userId: number
};

type PercentConfig = {
    percentage: number
};

export type RuleEntity =
    | { type: "ROLE", config: RoleConfig }
    | { type: "USER", config: UserConfig }
    | { type: "PERCENT", config: PercentConfig }