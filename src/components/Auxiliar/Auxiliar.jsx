import React, { useState } from "react";
import axios from "axios";

const TipoCuentas = () => {
  const [idAuxiliar, setIdAuxiliar] = useState(1);
  const [entradaContable, setEntradaContable] = useState(null);

  const handleIdChange = (e) => {
    setIdAuxiliar(e.target.value);
  };

  const handleObtenerEntradaContable = async () => {
    try {
      const response = await axios.get(
        `https://ap1-contabilidad.azurewebsites.net/Contabilidad/ObtenerEntradaContablexAux?Id=${idAuxiliar}`
      );
      setEntradaContable(response.data.entradaContable[0]); // Asumiendo que la respuesta es un arreglo y queremos el primer elemento
    } catch (error) {
      console.error("Error fetching entrada contable:", error);
    }
  };

  const renderEntradaContable = () => {
    if (!entradaContable) {
      return (
        <tr>
          <td colSpan="5" className="border px-4 py-2 text-center">
            No hay entrada contable disponible para el ID auxiliar: {idAuxiliar}
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td className="border px-4 py-2">{entradaContable.id}</td>
        <td className="border px-4 py-2">{entradaContable.descripcion}</td>
        <td className="border px-4 py-2">{entradaContable.fecha}</td>
        <td className="border px-4 py-2">{entradaContable.monto}</td>
        <td className="border px-4 py-2">{entradaContable.estado}</td>
        <td className="border px-4 py-2">{entradaContable.auxiliar}</td>
      </tr>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Entrada Contable por Auxiliar</h1>
      <div className="flex items-center mb-4">
        <label className="mr-2">ID Auxiliar:</label>
        <input
          type="number"
          value={idAuxiliar}
          onChange={handleIdChange}
          className="px-4 py-2 border rounded-lg mr-2 text-black"
        />
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={handleObtenerEntradaContable}
        >
          Obtener Entrada Contable
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto rounded-lg overflow-hidden">
          <thead className="bg-gray-200 dark:bg-gray-700 text-black">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Descripción</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Monto</th>
              <th className="px-4 py-2">Estado</th>
              <th className="px-4 py-2">Auxiliar</th>
            </tr>
          </thead>
          <tbody>
            {renderEntradaContable()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TipoCuentas;
