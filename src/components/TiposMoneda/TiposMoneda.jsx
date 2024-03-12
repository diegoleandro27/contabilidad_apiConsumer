import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TipoCuentas = () => {
  const [tiposMoneda, setTiposMoneda] = useState([]);
  const [nuevaMonedaCodigoISO, setNuevaMonedaCodigoISO] = useState("");
  const [nuevaMonedaDescripcion, setNuevaMonedaDescripcion] = useState("");

  const server = "ap1-contabilidad.azurewebsites.net";

  const fetchTiposMoneda = async () => {
    try {
      const response = await axios.get(
        `https://${server}/Contabilidad/Monedas`
      );
      setTiposMoneda(response.data.monedas);
    } catch (error) {
      console.error("Error fetching tipos de monedas:", error);
    }
  };

  const handleCrearTipoMoneda = async () => {
    console.log(nuevaMonedaCodigoISO, nuevaMonedaDescripcion);
    try {
      const response = await axios.post(
        `https://${server}/Contabilidad/AgregarMoneda?CodigoIso=${nuevaMonedaCodigoISO}&Descripcion=${nuevaMonedaDescripcion}`
      );
      fetchTiposMoneda();
      setNuevaMonedaCodigoISO("");
      setNuevaMonedaDescripcion("");
      console.log('Creado con éxito');
    } catch (error) {
      console.error("Error al crear el nuevo tipo de moneda:", error);
    }
  };

  useEffect(() => {
    fetchTiposMoneda();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">Tipos de Moneda</h1>
        <div>
          <input
            type="text"
            placeholder="Código ISO de la nueva moneda"
            value={nuevaMonedaCodigoISO}
            onChange={(e) => setNuevaMonedaCodigoISO(e.target.value)}
            className="px-4 py-2 border rounded-lg mr-2 text-black"
          />
          <input
            type="text"
            placeholder="Descripción de la nueva moneda"
            value={nuevaMonedaDescripcion}
            onChange={(e) => setNuevaMonedaDescripcion(e.target.value)}
            className="px-4 py-2 border rounded-lg mr-2 text-black"
          />
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-3"
            onClick={handleCrearTipoMoneda}
          >
            Agregar moneda
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-black">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Códio ISO</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Última tasa cambiaria</th>
            </tr>
          </thead>
          <tbody>
            {tiposMoneda.map((moneda) => (
              <tr key={moneda.id}>
                <td className="border px-4 py-2">{moneda.id}</td>
                <td className="border px-4 py-2">{moneda.codigoIso}</td>
                <td className="border px-4 py-2">{moneda.descripcion}</td>
                <td className="border px-4 py-2">{moneda.tasaCambio}</td>
              </tr>
            ))}
            {tiposMoneda.length === 0 && (
              <tr>
                <td colSpan="3" className="border px-4 py-2 text-center">
                  No hay monedas disponibles disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoCuentas;
