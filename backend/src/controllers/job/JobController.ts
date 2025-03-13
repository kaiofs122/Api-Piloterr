import { Request, Response } from 'express';
import { JobService } from '../../services/job/JobService';

class JobController {

  async handle(req: Request, res: Response) {
    const jobService = new JobService();

    const params = req.query;

    const jobs = await jobService.execute(params);

    if (jobs.length > 0) {
      res.json(jobs);
    } else {
      res.status(404).json({ message: 'Nenhuma vaga encontrada' });
    }
  }
}

export { JobController };
