import { FeatureRepository } from "./feature.repository";
import { FeatureResolver } from "./evaluation/feature.resolver";
import {RoleResolver, UserResolver, PercentResolver} from "./evaluation/rule.resolver";
import { CreateFeatureDto, CreateFeatureRuleDto } from "./features.dto";
import {EvaluationResult} from "../../shared/types/evaluation-context";
import {ExperimentRepository} from "../experiments/experiment.repository";
import {ExperimentResolver} from "../experiments/experiment.resolver";
import {ExperimentResolve} from "../../shared/types/experiment-resolve";

export class FeatureService {
    constructor(
        private readonly repo = new FeatureRepository(),
        private readonly resolver = new FeatureResolver([
            new RoleResolver(),
            new UserResolver(),
            new PercentResolver()
        ]),
        private readonly expRepo = new ExperimentRepository(),
        private readonly expResolver = new ExperimentResolver()
    ) {}

    async createFeature(feature: CreateFeatureDto) {
        return this.repo.create({
            key: feature.key,
            isEnabled: feature.isEnabled ?? false
        });
    }

    async getFeature(key: string) {
        const feature = await this.repo.findByKey(key);

        if (!feature) {
            throw new Error(`Could not find feature with key "${key}"`);
        }
        return feature;
    }

    async addRule(featureKey: string, rule: CreateFeatureRuleDto) {
        const feature = await this.repo.findByKey(featureKey);
        if (!feature) throw new Error(`Could not find feature with key "${featureKey}"`);

        return this.repo.addRule(feature.id, {
            type: rule.type,
            config: rule.config,
            priority: rule.priority ?? 0
        });
    }

    async deleteRule(featureKey: string, ruleId: number) {
        const feature = await this.repo.findByKey(featureKey);
        if (!feature) throw new Error(`Could not find feature with key "${featureKey}"`);

        return this.repo.deleteRule(ruleId);
    }

    async evaluation(key: string, userId: number, role: string): Promise<EvaluationResult> {
        const feature = await this.repo.findByKey(key);
        if (!feature) throw new Error(`Could not find feature with key "${key}"`);

        const resolver = this.resolver.resolve(feature, { userId, role });
        if (!resolver.enabled) {
            return { enabled: false }
        }

        const experiment = feature.experiments[0];
        if (!experiment) return resolver;

        let variant: ExperimentResolve | null = null;
        let assignment = await this.expRepo.getAssignment(
            experiment.id, userId
        );
        if (assignment) {
            variant = {
                id: assignment.variant.id,
                key: assignment.variant.key,
                payload: assignment.variant.payload
            };
        } else {
            variant = this.expResolver.assign(
                experiment,
                { userId, role }
            );

            if (variant) {
                await this.expRepo.createAssignment({
                    userId,
                    experimentId: experiment.id,
                    variantId: variant.id
                });
            }
        }

        return {
            ...resolver,
            experiment: variant
                ? {
                    key: variant.key,
                    payload: variant.payload
                } : undefined
        };
    }
}