import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TipoCuentas = () => {
  const [cuentasContables, setCuentasContables] = useState([]);

  useEffect(() => {
    const fetchCuentasContables = async () => {
      try {
        const response = await axios.get(
          "https://ap1-contabilidad.azurewebsites.net/Contabilidad/ObtenerEntradaContablexAux"
        );
        setCuentasContables(response.data.cuentasContables);
      } catch (error) {
        console.error("Error fetching cuentas contables:", error);
      }
    };

    fetchCuentasContables();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Auxiliares</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-black">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">nombre</th>
              <th className="px-4 py-2">estado</th>
            </tr>
          </thead>
          <tbody>
            {cuentasContables.map((auxiliar) => (
              <tr key={cuenta.id}>
                <td className="border px-4 py-2">{auxiliar.id}</td>
                <td className="border px-4 py-2">{auxiliar.descripcion}</td>
                <td className="border px-4 py-2">{auxiliar.estado}</td>
              </tr>
            ))}
            {cuentasContables.length === 0 && (
              <tr>
                <td colSpan="3" className="border px-4 py-2 text-center">
                  No hay cuentas Auxiliares disponibles.
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
