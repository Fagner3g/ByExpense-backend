import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AvatarController from './app/controllers/AvatarController';
import GroupController from './app/controllers/GroupController';
import AccoutController from './app/controllers/AccoutController';
import SubCategoryController from './app/controllers/SubCategoryController';
import CategoryController from './app/controllers/CategoryController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.post('/avatar', upload.single('file'), AvatarController.store);

routes.get('/groups', GroupController.index);
routes.get('/groups/:code', GroupController.show);
routes.post('/groups', GroupController.store);
routes.post('/groups/:code', GroupController.store);
routes.delete('/groups/:code', GroupController.delete);

routes.get('/accounts/:id', AccoutController.index);
routes.post('/accounts', AccoutController.store);

routes.get('/subcategories/:id', SubCategoryController.index);
routes.post('/subcategories', SubCategoryController.store);
routes.delete('/subcategories/:id', SubCategoryController.delete);

routes.get('/categories/:id', CategoryController.index);
routes.post('/categories', CategoryController.store);
routes.delete('/categories/:id', CategoryController.delete);

export default routes;
