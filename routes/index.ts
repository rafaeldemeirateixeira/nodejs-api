import { Router } from 'express';
import users from './users.routes';
import auth from './auth.routes';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', users);

export default routes
