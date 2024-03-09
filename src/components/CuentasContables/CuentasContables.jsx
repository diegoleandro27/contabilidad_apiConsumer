import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CuentasContables = () => {
  const [cuentasContables, setCuentasContables] = useState([]);
  const [nuevaCuentaDescripcion, setNuevaCuentaDescripcion] = useState("");
  const [cuentaAEditar, setCuentaAEditar] = useState(null);

  const server = "api-contabilidad.azurewebsites.net";

  const fetchCuentasContables = async () => {
    try {
      const response = await axios.get(
        ` https://${server}/Contabilidad/CuentasContables`
      );
      setCuentasContables(response.data.cuentasContables);
    } catch (error) {
      console.error("Error fetching cuentas contables:", error);
    }
  };

  const handleCrearCuenta = async () => {
    try {
      await axios.post(`https://${server}/Contabilidad/CuentasContables`, {
        descripcion: nuevaCuentaDescripcion,
      });
      fetchCuentasContables();
      setNuevaCuentaDescripcion("");
    } catch (error) {
      console.error("Error al crear la cuenta contable:", error);
    }
  };

  const handleEditarCuenta = async (cuentaId, nuevaDescripcion) => {
    try {
      await axios.put(
        `https://${server}/Contabilidad/CuentasContables/${cuentaId}`,
        {
          descripcion: nuevaDescripcion,
        }
      );
      fetchCuentasContables();
      setCuentaAEditar(null);
    } catch (error) {
      console.error("Error al actualizar la cuenta contable:", error);
    }
  };

  const handleDeleteCuenta = async (cuentaId) => {
    try {
      await axios.delete(
        `https://${server}/Contabilidad/CuentasContables/${cuentaId}`
      );
      fetchCuentasContables();
    } catch (error) {
      console.error("Error al eliminar la cuenta contable:", error);
    }
  };

  useEffect(() => {
    fetchCuentasContables();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Cuentas Contables</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-black">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Accion</th>
            </tr>
          </thead>
          <tbody>
            {cuentasContables.map((cuenta) => (
              <tr key={cuenta.id}>
                <td className="border px-4 py-2">{cuenta.id}</td>
                <td className="border px-4 py-2">{cuenta.descripcion}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDeleteCuenta(cuenta.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {cuentasContables.length === 0 && (
              <tr>
                <td colSpan="2" className="border px-4 py-2 text-center">
                  No hay cuentas contables disponibles.
                </td>
              </tr>
            )}
            {cuentaAEditar && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                  <input
                    type="text"
                    value={cuentaAEditar.descripcion}
                    onChange={(e) =>
                      setCuentaAEditar({
                        ...cuentaAEditar,
                        descripcion: e.target.value,
                      })
                    }
                    className="px-4 py-2 border rounded-lg mb-4"
                  />
                  <button
                    onClick={() =>
                      handleEditarCuenta(
                        cuentaAEditar.id,
                        cuentaAEditar.descripcion
                      )
                    }
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={() => setCuentaAEditar(null)}
                    className="text-gray-600 hover:text-gray-800 ml-2 font-medium text-sm px-3 py-1.5"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Descripción de la nueva cuenta"
          value={nuevaCuentaDescripcion}
          onChange={(e) => setNuevaCuentaDescripcion(e.target.value)}
          className="px-4 py-2 border rounded-lg mr-2 text-black"
        />
        <button
          onClick={handleCrearCuenta}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Crear Nueva Cuenta Contable
        </button>
      </div>
    </div>
  );
};

export default CuentasContables;
