import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./App.css";
import {
  Auxiliar,
  CuentasContables,
  Home,
  Navbars,
  RegistroAsiento,
  TipoCuentas,
  TiposMoneda,
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
      <Route path="/tiposMoneda" element={<TiposMoneda />} />
      <Route path="/Auxiliar" element={<Auxiliar />} />
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
