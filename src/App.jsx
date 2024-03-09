import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import {
  CuentasContables,
  Home,
  Navbars,
  RegistroAsiento,
  TipoCuentas,
} from "./components";

const AppLayout = () => (
  <>
    <Navbars />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/registroAsiento" element={<RegistroAsiento />} />
      <Route path="/cuentasContables" element={<CuentasContables />} />
      <Route path="/tipoCuenta" element={<TipoCuentas />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
