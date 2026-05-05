import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../data/prisma/client';
import type { CriarUsuarioDTO } from '../presentation/dtos/CriarUsuarioDTO';

export class UsuarioService {
  async cadastrar(dados: CriarUsuarioDTO) {
    const { name, email, phone, cpf, username, password } = dados;

    // Verificar se o usuário já existe
    const usuarioExistente = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email },
          { username },
          { cpf: cpf || null }
        ]
      }
    });

    if (usuarioExistente) {
      throw new Error('Usuário, email ou CPF já cadastrado');
    }

    const senha_hash = await bcrypt.hash(password || '', 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome: name,
        email,
        telefone: phone || null,
        cpf: cpf || null,
        username,
        senha_hash,
      },
    });

    // Remover a senha hash do objeto de retorno
    const { senha_hash: _, ...usuarioSemSenha } = novoUsuario;
    return usuarioSemSenha;
  }

  async autenticar(email: string, password: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      throw new Error('Email ou senha inválidos');
    }

    const senhaCorreta = await bcrypt.compare(password, usuario.senha_hash);

    if (!senhaCorreta) {
      throw new Error('Email ou senha inválidos');
    }

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    const { senha_hash: _, ...usuarioSemSenha } = usuario;

    return {
      usuario: usuarioSemSenha,
      token
    };
  }

  async atualizar(id: number, dados: Partial<CriarUsuarioDTO>) {
    const { name, email, phone, cpf, username, password } = dados;

    const usuario = await prisma.usuario.findUnique({
      where: { id }
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const data: any = {};

    if (name) data.nome = name;
    if (email) data.email = email;
    if (phone) data.telefone = phone;
    if (cpf) data.cpf = cpf;
    if (username) data.username = username;
    
    if (password) {
      data.senha_hash = await bcrypt.hash(password, 10);
    }

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data
    });

    const { senha_hash: _, ...usuarioSemSenha } = usuarioAtualizado;
    return usuarioSemSenha;
  }

  async buscarPorId(id: number) {
    const usuario = await prisma.usuario.findUnique({
      where: { id }
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const { senha_hash: _, ...usuarioSemSenha } = usuario;
    return usuarioSemSenha;
  }
}
