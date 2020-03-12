import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import UserGroupsController from './app/controllers/UserGroupsController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.post('/avatar', upload.single('file'), AvatarController.store);

routes.post('/usergroup', UserGroupsController.store);

export default routes;
