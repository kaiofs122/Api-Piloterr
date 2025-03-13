import { Request, Response } from "express";
import { JobQueryService } from "../../services/job/JobQueryService";

class JobQueryController {
  async listAll(req: Request, res: Response) {
    const { id, localizacao, palavraChave } = req.query;

    const jobs = await new JobQueryService().listAll({
      id: id ? String(id) : undefined,
      localizacao: localizacao ? String(localizacao) : undefined,
      palavraChave: palavraChave ? String(palavraChave) : undefined
    });

    return res.json(jobs);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const job = await new JobQueryService().findById(id);
    return job ? res.json(job) : res.status(404).json({ error: "Vaga não encontrada" });
  }
}

export { JobQueryController };
