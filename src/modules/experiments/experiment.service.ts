import {ExperimentRepository} from "./experiment.repository";
import {CreateExperimentDto, CreateVariantDto} from "./experiment.dto";
import {FeatureRepository} from "../features/feature.repository";

export class ExperimentService {
    constructor(
        private readonly repo = new ExperimentRepository(),
        private readonly featureRepo = new FeatureRepository()
    ) {}

    async createExperiment(experiment: CreateExperimentDto) {
        const feature = await this.featureRepo.findByKey(experiment.featureKey);
        if (!feature) throw new Error(`Could not find feature with key "${experiment.featureKey}"`);

        return this.repo.create(feature.id, experiment.key);
    }

    async getExperiment(key: string) {
        const experiment = await this.repo.getByKey(key);
        if (!experiment) throw new Error(`Could not find experiment with key "${key}"`);

        return experiment;
    }

    async addVariants(key: string, variants: CreateVariantDto[]) {
        const experiment = await this.repo.getByKey(key);
        if (!experiment) throw new Error(`Could not find experiment with key "${key}"`);

        const total = variants.reduce((sum, v) => sum + v.percentage, 0);
        if (total !== 100) {
            throw new Error(
                `Сумма процентов вариантов превышает 100% (сейчас ${total}%)`
            );
        }

        return this.repo.addVariants(experiment.id, variants);
    }
}