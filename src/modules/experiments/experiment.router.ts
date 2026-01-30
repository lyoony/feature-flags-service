 import {Router} from "express";
import {ExperimentController} from "./experiment.controller";

export const experimentRouter = Router();
const controller = new ExperimentController();

experimentRouter.post('/', controller.create);
experimentRouter.get('/:key', controller.getExperiment);
experimentRouter.post('/:key/variants', controller.addVariants);