import type { Request, Response } from 'express';
import { UsuarioService } from '../../services/UsuarioService';
import type { CriarUsuarioDTO } from '../dtos/CriarUsuarioDTO';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  async create(req: Request, res: Response) {
    try {
      const dados: CriarUsuarioDTO = req.body;
      const usuario = await this.usuarioService.cadastrar(dados);
      
      return res.status(201).json(usuario);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.usuarioService.autenticar(email, password);
      
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = req.userId;
      
      if (!id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      const dados = req.body;
      const usuario = await this.usuarioService.atualizar(id, dados);
      
      return res.status(200).json(usuario);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async showMe(req: Request, res: Response) {
    try {
      const id = req.userId;

      if (!id) {
        return res.status(401).json({ message: 'Não autorizado' });
      }

      const usuario = await this.usuarioService.buscarPorId(id);

      return res.status(200).json(usuario);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}
