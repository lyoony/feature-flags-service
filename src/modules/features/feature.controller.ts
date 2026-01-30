import {FeatureService} from "./feature.service";
import {NextFunction, Request, Response} from "express";
import {CreateFeatureDto, CreateFeatureRuleDto} from "./features.dto";

interface RequestParams {
    key: string;
    ruleId: string;
}

export class FeatureController {
    private service: FeatureService = new FeatureService();

    create = async(req: Request<{}, {}, CreateFeatureDto>, res: Response, next: NextFunction) => {
        try {
            const feature = await this.service.createFeature(req.body);
            res.status(201).json(feature);
        } catch (err) {
            next(err);
        }
    }

    getFeature = async(req: Request<RequestParams>, res: Response, next: NextFunction) => {
        try {
            const { key } = req.params;
            const feature = await this.service.getFeature(key);
            res.json(feature);
        } catch (err) {
            next(err);
        }
    }

    addRule = async(req: Request<RequestParams, {}, CreateFeatureRuleDto>, res: Response, next: NextFunction) => {
        try {
            const { key } = req.params;
            const rule = await this.service.addRule(key, req.body);
            res.status(201).json(rule);
        } catch (err) {
            next(err);
        }
    }

    deleteRule = async(req: Request<RequestParams>, res: Response, next: NextFunction) => {
        try {
            const { key, ruleId } = req.params;
            await this.service.deleteRule(key, Number(ruleId));
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    evaluate = async(req: Request<RequestParams>, res: Response, next: NextFunction) => {
        try {
            const { key } = req.params;
            const evaluate = await this.service.evaluation(
                key,
                Number(req.query.userId),
                String(req.query.role)
            );
            res.status(200).json(evaluate);
        } catch (err) {
            next(err);
        }
    }
}