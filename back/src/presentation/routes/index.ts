import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { authMiddleware } from '../middlewares/authMiddleware';

const routes = Router();
const usuarioController = new UsuarioController();

routes.post('/usuarios', (req, res) => usuarioController.create(req, res));
routes.post('/auth/login', (req, res) => usuarioController.login(req, res));

// Rotas protegidas
routes.put('/usuarios', authMiddleware, (req, res) => usuarioController.update(req, res));
routes.get('/usuarios/me', authMiddleware, (req, res) => usuarioController.showMe(req, res));

export default routes;
