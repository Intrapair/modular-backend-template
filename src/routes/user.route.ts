import { Router } from 'express';

import { getAllUsers } from '../controllers/user.controller';

export default (router: Router) => {
    router.get('/users', getAllUsers);
};
