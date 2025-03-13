import { Request, Response } from "express";
import { ListJobApplicationService } from "../../services/jobApplication/ListJobApplicationService";

class ListJobApplicationsController {
    async handle(req: Request, res: Response) {
        const userId = req.userId;

        try {
            const service = new ListJobApplicationService();
            const applications = await service.execute({ userId });
            
            return res.json(applications);

        } catch (error) {
            return res.status(500).json({
                error: error.message || "Internal server error",
                details: error.message.includes("Failed") 
                    ? "Database query failed" 
                    : "Unexpected error"
            });
        }
    }
}

export { ListJobApplicationsController };