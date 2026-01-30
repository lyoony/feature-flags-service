import {RuleEntity} from "./feature-rule.entity";
import {ExperimentEntity} from "../experiments/experiment.entity";

export interface FeatureEntity {
    id: number;
    key: string;
    isEnabled: boolean;
    rules: RuleEntity[];
    experiments: ExperimentEntity[];
}