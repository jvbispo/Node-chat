import { Router } from "express";
import { getCustomRepository } from "typeorm";
import SettingsController from "./controllers/settingsController";
import SettingsRepository from "./repositories/SettingsRepository";


const routes = Router();
const settingsController = new SettingsController();

routes.post('/settings', async (req, res): Promise<void> => settingsController.create(req,res));

export default routes;