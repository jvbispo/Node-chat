import { Router } from "express";
import SettingsController from "../controllers/SettingsController";


const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.post('/settings', async (req, res): Promise<void> => settingsController.create(req,res));

export default settingsRouter;