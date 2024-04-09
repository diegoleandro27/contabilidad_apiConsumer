import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AsientosContables = () => {
  const [asientosContables, setAsientosContables] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState("");
  // const [asientoId, setAsientoId] = useState(25);

  const server = "ap1-contabilidad.azurewebsites.net";

  let URL_ENTRADA = `https://${server}/Contabilidad/ObtenerEntradaContablexAux?Id=1`;

  const fetchAsientosContables = async () => {
    if (fechaFiltro) {
      URL_ENTRADA += `&fecha=${fechaFiltro}`;
    }

    try {
      const response = await axios.get(URL_ENTRADA);
      setAsientosContables(response.data.entradaContable);
    } catch (error) {
      console.error("Error fetching asientos contables:", error);
    }
  };

  const handleFechaChange = (event) => {
    setFechaFiltro(event.target.value);
  };

  // const handleAsientoChange = (event) => {
  //   setAsientoId(event.target.value);
  // };
  // const options = [];
  // for (let i = 1; i <= 22; i++) {
  //   options.push(
  //     <option className="text-black" key={i} value={i}>
  //       {i}
  //     </option>
  //   );
  // }

  useEffect(() => {
    fetchAsientosContables();
  }, [fechaFiltro]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Asientos Contables</h1>
      <div className="mb-8">
        <Link
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4"
          to="/registroAsiento"
        >
          Crear Entrada Contable
        </Link>

        <div className="mt-8">
          <label>Filtro de busqueda: </label>
          {/* Input para seleccionar la fecha */}
          <input
            type="date"
            value={fechaFiltro}
            onChange={handleFechaChange}
            className=" border-gray-300 rounded-md text-black mx-3"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-black">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Auxiliar</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Monto Total</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Moneda</th>
              <th className="px-4 py-2">Cuenta</th>
              <th className="px-4 py-2">Tipo de Movimiento</th>
              <th className="px-4 py-2">Monto de cuenta</th>
            </tr>
          </thead>
          <tbody>
            {asientosContables.map((asiento) => (
              <React.Fragment key={asiento.id}>
                <tr>
                  <td className="border px-4 py-2" rowSpan={"3"}>
                    {asiento.id}
                  </td>
                  <td className="border px-4 py-2" rowSpan={"3"}>
                    {asiento.descripcion}
                  </td>
                  <td className="border px-4 py-2" rowSpan={"3"}>
                    {asiento.auxiliar}
                  </td>
                  <td className="border px-4 py-2" rowSpan={"3"}>
                    {asiento.fecha}
                  </td>
                  <td className="border px-4 py-2 text-center" rowSpan={"3"}>
                    {asiento.monto}
                  </td>
                  <td className="border px-4 py-2" rowSpan={"3"}>
                    {asiento.estado}
                  </td>
                  <td className="border px-4 py-2" rowSpan={"3"}>
                    {asiento.moneda}
                  </td>
                </tr>
                {asiento.registros.map((registro, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{registro.cuenta}</td>
                    <td className="border px-4 py-2">
                      {registro.tipoMovimiento}
                    </td>
                    <td className="border px-4 py-2">{registro.monto}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
            {asientosContables.length === 0 && (
              <tr>
                <td colSpan="7" className="border px-4 py-2 text-center">
                  No hay asientos contables disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AsientosContables;
