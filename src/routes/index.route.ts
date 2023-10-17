import { Router } from 'express';
import userRoutes from './user.route';

const router = Router();

userRoutes(router);

export default router;
