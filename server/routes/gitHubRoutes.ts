import { Router } from 'express';
import { getAccessToken } from '../controllers/getAccessTokenController.ts';
import { getUserData } from '../controllers/getUserDataController.ts';
import { getIssueByLabel } from '../controllers/getIssueByLabelController.ts';
import { issueLimiter } from '../middleware/rateLimiter.ts';
import { getAssignedIssues } from '../controllers/getAssignedIssues.ts';

const router = Router();

router.get('/getAccessToken', getAccessToken);
router.get('/getUserData', getUserData);
router.get('/getIssueByLabel', issueLimiter, getIssueByLabel);
router.get('/getAssignedIssues', issueLimiter, getAssignedIssues);

export default router;
