import {Router} from "express";
import {FeatureController} from "./feature.controller";

export const featureRouter = Router();
const controller: FeatureController = new FeatureController();

featureRouter.post('/', controller.create);
featureRouter.get('/:key', controller.getFeature);
featureRouter.post('/:key/rule', controller.addRule);
featureRouter.delete('/:key/rule/:ruleId', controller.deleteRule);

featureRouter.get('/:key/evaluate', controller.evaluate);