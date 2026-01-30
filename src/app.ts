import express from 'express';
import {featureRouter} from "./modules/features/feature.router";
import {experimentRouter} from "./modules/experiments/experiment.router";

export const app = express();

app.use(express.json());
app.use('/api/feature', featureRouter);
app.use('/api/experiment', experimentRouter);

app.get('/test', (req, res) => {
    res.json({ ok: true });
});
