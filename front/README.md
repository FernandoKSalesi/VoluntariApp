# VoluntariApp

O VoluntariApp é uma plataforma desenvolvida para conectar voluntários a eventos e organizações que precisam de ajuda.

## Stack do Projeto

- **React** com **Vite**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** para componentes de interface
- **pnpm** como gerenciador de pacotes

O projeto organiza seu código baseado em Clean Architecture (dividido principalmente em `domain`, `data`, `presentation` e `core`).

## Como rodar localmente

1. Certifique-se de ter o [Node.js](https://nodejs.org/) e o [pnpm](https://pnpm.io/) instalados.
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Rode o servidor de dev:
   ```bash
   pnpm dev
   ```

Acesse a aplicação no navegador pelo endereço que aparecer no terminal (geralmente `http://localhost:5173`).

## Estrutura Básica

- `src/domain/`: Modelos de dados e as interfaces (contratos) dos repositórios.
- `src/data/`: Implementação dos repositórios, chamadas de API e mocks.
- `src/presentation/`: Páginas, componentes visuais e "controllers" (hooks que ligam a UI aos dados).
- `src/core/`: Código compartilhado, rotas e utilitários.

