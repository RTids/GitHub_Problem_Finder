import { Router } from 'express';
import { getAccessToken } from '../controllers/getAccessTokenController.ts';
import { getUserData } from '../controllers/getUserDataController.ts';

const router = Router();

router.get('/getAccessToken', getAccessToken);
router.get('/getUserData', getUserData);

export default router;
