import { Request, Response } from 'express';
import { RemoveJobService } from '../../services/job/RemoveJobService';

class RemoveJobController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const removeJobService = new RemoveJobService();

    try {
      const result = await removeJobService.execute(id);
      res.json({ 
        message: 'Vaga excluída com sucesso',
        deletedJob: result
      });
      
    } catch (error) {
      if (error.message.includes('não encontrada')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.message.includes('inválido')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
}

export { RemoveJobController };