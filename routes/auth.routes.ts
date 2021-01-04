import { Router } from 'express';
import { AuthController } from '../src/Http/Controllers/Auth/AuthController';
import { authValidator } from './../src/Validators/Auth/AuthValidator';

const authController = new AuthController();
const router = Router();

router.post('/login', authValidator, async (request, response, next) => {
    try {
        return await authController.login(request, response);
    } catch (error) {
        next(error);
    }
});

export default router;
