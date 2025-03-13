import { Request, Response } from "express";
import { CreateJobApplicationService } from "../../services/jobApplication/CreateJobApplicationService"; 

class CreateJobApplicationController {
    async handle(req: Request, res: Response) {
        const { jobId } = req.body;
        const userId = req.userId;

        try {
            const addJobApplication = new CreateJobApplicationService();
            const application = await addJobApplication.execute({ userId, jobId });
            return res.json(application);

        } catch (error) {
            if (error.message.includes("já se candidatou")) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export { CreateJobApplicationController };