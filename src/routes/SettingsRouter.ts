import { Router } from "express";
import SettingsController from "../controllers/SettingsController";


const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.post('/settings', async (req, res): Promise<void> => settingsController.create(req,res));

settingsRouter.get('/settings/:username', async (req, res): Promise<void> => settingsController.findByUsername(req,res));

settingsRouter.put('/settings/:username', async (req, res): Promise<void> => settingsController.update(req,res));

export default settingsRouter; 