import { Router } from 'express';
import auth from './auth.routes';
import users from './users.routes';
import transfer from './transfers.routes';

const routes = Router();

routes.use('/auth', auth);
routes.use('/users', users);
routes.use('/transfers', transfer);

export default routes
