import { Request, Response } from "express";
import { RemoveJobApplicationService } from "../../services/jobApplication/RemoveJobApplicationService";

class RemoveJobApplicationController {
  async handle(req: Request, res: Response) {
    
    const applicationId = req.params.applicationId;

    const removeJobApplicationService = new RemoveJobApplicationService();

    const application = await removeJobApplicationService.execute({ applicationId });

    return res.json(application);
  }
}

export { RemoveJobApplicationController };
