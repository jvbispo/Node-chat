import { Router } from "express";
import settingsRouter from './SettingsRouter';
import usersRouter from './UsersRouter';
import messagesRouter from './MessagesRouter';


const routes = Router();

routes.use('', settingsRouter);
routes.use('', usersRouter);
routes.use('', messagesRouter);


export default routes;