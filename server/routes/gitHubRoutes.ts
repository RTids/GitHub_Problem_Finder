import { Router } from 'express';
import { getAccessToken } from '../controllers/getAccessTokenController.ts';
import { getUserData } from '../controllers/getUserDataController.ts';
import { getIssueByLabe } from '../controllers/getIssueByLabelController.ts'

const router = Router();

router.get('/getAccessToken', getAccessToken);
router.get('/getUserData', getUserData);
router.get('/getIssueByLabel', getIssueByLabel)

export default router;
