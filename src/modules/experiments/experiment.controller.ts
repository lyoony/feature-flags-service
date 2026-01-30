import {ExperimentService} from "./experiment.service";
import {NextFunction, Request, Response} from "express";
import {CreateExperimentDto, CreateVariantDto} from "./experiment.dto";

interface RequestParams {
    key: string;
}

export class ExperimentController {
    private service: ExperimentService = new ExperimentService();

    create = async(req: Request<{}, {}, CreateExperimentDto>, res: Response, next: NextFunction) => {
        try {
            const experiment = await this.service.createExperiment(req.body)
            res.status(201).json(experiment);
        } catch (err) {
            next(err);
        }
    }

    getExperiment = async (req: Request<RequestParams>, res: Response, next: NextFunction) => {
        try {
            const { key } = req.params;
            const experiment = await this.service.getExperiment(key);
            res.status(200).json(experiment);
        } catch (err) {
            next(err);
        }
    }

    addVariants = async (req: Request<RequestParams, {}, CreateVariantDto[]>, res: Response, next: NextFunction) => {
        try {
            const { key } = req.params;
            const createdVariants = await this.service.addVariants(key, req.body);
            res.status(201).json(createdVariants);
        } catch (err) {
            next(err);
        }
    }
}