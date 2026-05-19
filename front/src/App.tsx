import { RouterProvider } from "react-router";
import { router } from "@/core/router/routes";

export default function App() {
  return <RouterProvider router={router} />;
}
