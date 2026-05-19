# Documento de Arquitetura de Software (Inicial)

## 1. Visão Geral
O sistema segue uma arquitetura em camadas orientada ao domínio. Ele é desenvolvido em TypeScript e utiliza princípios de *Clean Architecture* e o padrão *Repository* para acesso a dados.

## 2. Padrões Arquiteturais
*   **Arquitetura em Camadas:** Separação em Apresentação, Serviços de Negócio, Domínio e Acesso a Dados.
*   **Repository Pattern:** Abstração da persistência de dados.
*   **Data Transfer Objects (DTOs):** Encapsulamento de dados transitados entre a camada de apresentação e serviços.

## 3. Camadas do Sistema

### 3.1. Camada de Apresentação (`src/presentation/`)
Responsável por lidar com as requisições e respostas HTTP (provavelmente utilizando Express ou framework semelhante).
*   **Routes:** Define os endpoints da API.
*   **Controllers:** Recebem as requisições HTTP, delegam a lógica para os serviços e formatam as respostas HTTP.
*   **Middlewares:** Tratamento de segurança, autenticação, autorização e erros globais.
*   **DTOs:** Validação e formatação dos dados de entrada e saída.

### 3.2. Camada de Serviços / Aplicação (`src/services/`)
Contém as regras de negócio da aplicação.
*   *Exemplos:* `EventService.ts`, `UserService.ts`, `InscricaoService.ts`.
*   Aplica validações de negócio e orquestra operações entre múltiplos repositórios e entidades antes de devolver o resultado para os *Controllers*.

### 3.3. Camada de Domínio (`src/entities/`)
Contém as entidades puras e as regras de negócio fundamentais da aplicação, sem dependência de persistência ou infraestrutura externa.
*   *Principais Entidades:* `Evento`, `Usuario`, `Inscricao`, `Notificacao`.

### 3.4. Camada de Dados (`src/data/`)
Responsável pela persistência e comunicação com o banco de dados.
*   **Prisma (`src/data/prisma/client.ts`):** Utilizado como ORM (Object-Relational Mapper) para comunicação direta com o banco de dados.
*   **Repositories (`src/data/repositories/`):** Implementam a interface genérica para persistência e recuperação das entidades de domínio, isolando as regras de negócio dos detalhes do banco de dados.
