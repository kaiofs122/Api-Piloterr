import { Router } from "express";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { JobController } from "./controllers/job/JobController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { UpdateUserController } from "./controllers/user/UpdateUserController";
import { JobQueryController } from "./controllers/job/JobQueryController";
import { RemoveJobController } from "./controllers/job/RemoveJobController"; 
import { CreateJobApplicationController } from "./controllers/jobApplication/CreateJobApplicationController";
import { RemoveJobApplicationController } from "./controllers/jobApplication/RemoveJobApplicationController";
import { ListJobApplicationsController } from "./controllers/jobApplication/ListJobApplicationController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router();

router.post('/users', new CreateUserController().handle);
router.post('/session', new AuthUserController().handle);
router.put('/users/update', isAuthenticated, new UpdateUserController().handle);

router.get('/jobs', isAuthenticated, new JobController().handle);
router.get('/jobs/all', isAuthenticated, new JobQueryController().listAll);
router.get('/jobs/:id', isAuthenticated, new JobQueryController().findById);
router.delete('/jobs/:id', isAuthenticated, new RemoveJobController().handle);

router.post('/application', isAuthenticated, new CreateJobApplicationController().handle)
router.get('/application', isAuthenticated, new ListJobApplicationsController().handle)
router.delete('/application/remove/:applicationId', isAuthenticated, new RemoveJobApplicationController().handle);



router.get('/me', isAuthenticated, new DetailUserController().handle);

export { router };