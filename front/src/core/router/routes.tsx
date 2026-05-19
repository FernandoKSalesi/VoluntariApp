import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/presentation/components/RootLayout";
import { LandingPage } from "@/presentation/pages/LandingPage";
import { EventosPage } from "@/presentation/pages/EventosPage";
import { EventoDetalhePage } from "@/presentation/pages/EventoDetalhePage";
import { LoginPage } from "@/presentation/pages/LoginPage";
import { CadastroPage } from "@/presentation/pages/CadastroPage";
import { PerfilPage } from "@/presentation/pages/PerfilPage";
import { OrganizadorPage } from "@/presentation/pages/OrganizadorPage";
import { NotFoundPage } from "@/presentation/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "eventos", Component: EventosPage },
      { path: "eventos/:id", Component: EventoDetalhePage },
      { path: "login", Component: LoginPage },
      { path: "cadastro", Component: CadastroPage },
      { path: "perfil", Component: PerfilPage },
      { path: "organizador", Component: OrganizadorPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
