import axios from "axios";
import React, { useEffect, useState } from "react";
import { Label, Textarea } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const RegistroAsiento = () => {
  const [origenCuenta, setOrigenCuenta] = useState([]);
  const [tiposCuenta, setTiposCuenta] = useState([]);
  const [cuentasContables, setCuentasContables] = useState([]);
  const [estadosContables, setEstadosContables] = useState([]);
  const [monedas, setMonedas] = useState([]);
  const navigate = useNavigate();
  // Define the server address
  const server = "ap1-contabilidad.azurewebsites.net";

  /* These lines of code are constructing the URLs for making API requests to fetch different types of
    data related to accounting. The URLs are being constructed using the `server` variable which holds
    the base server address and appending the specific endpoints for fetching different types of data
    such as OrigenCuenta, TiposCuenta, CuentasContables, EstadosContables, and Monedas. These URLs will
    be used in the `axios.get` requests to retrieve the corresponding data from the server. */
  const URL_ORIGEN = `https://` + server + `/Contabilidad/OrigenCuenta`;
  const URL_TIPO = `https://` + server + `/Contabilidad/TiposCuenta`;
  const URL_CC = `https://` + server + `/Contabilidad/CuentasContables`;
  const URL_EC = `https://` + server + `/Contabilidad/EstadosContables`;
  const URL_Moneda = `https://` + server + `/Contabilidad/Monedas`;
  const URL_ASIENTO_CONTABLE =
    "https://" + server + "/Contabilidad/AsientoContable";

  const getOrigenCuenta = async () => {
    try {
      const response = await axios.get(URL_ORIGEN);
      setOrigenCuenta(response.data.cuentasContables);
    } catch (error) {
      console.log("Error fetching origen contables:", error);
    }
  };

  const getTiposCuenta = async () => {
    try {
      const response = await axios.get(URL_TIPO);
      setTiposCuenta(response.data.cuentasContables);
    } catch (error) {
      console.log("Error fetching tipos cuenta:", error);
    }
  };

  // Function to fetch CuentasContables data
  const getCuentasContables = async () => {
    try {
      const response = await axios.get(URL_CC);
      setCuentasContables(response.data.cuentasContables);
    } catch (error) {
      console.log("Error fetching cuentas contables:", error);
    }
  };

  // Function to fetch EstadosContables data
  const getEstadosContables = async () => {
    try {
      const response = await axios.get(URL_EC);
      setEstadosContables(response.data.estadosContables);
    } catch (error) {
      console.log("Error fetching estados contables:", error);
    }
  };

  // Function to fetch Monedas data
  const getMonedas = async () => {
    try {
      const response = await axios.get(URL_Moneda);
      setMonedas(response.data.monedas);
    } catch (error) {
      console.log("Error fetching monedas:", error);
    }
  };

  const handleInput = (event) => {
    event.target.value = event.target.value.replace(/[^\d]/g, ""); // Filter out non-digit characters
  };
  useEffect(() => {
    getOrigenCuenta();
    getTiposCuenta();
    getCuentasContables();
    getEstadosContables();
    getMonedas();
  }, []);

  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState(0);
  const [estado, setEstado] = useState(0);
  const [moneda, setMoneda] = useState(0);
  const [cuenta, setCuenta] = useState(0);
  const [tipoMovimiento, setTipoMovimiento] = useState(0);
  const [transacciones, setTransacciones] = useState([
    { cuenta: "", tipoMovimiento: "", monto: "" },
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    /* The above code is a JavaScript React code snippet that checks if the length of the `transacciones`
    array is less than 2. If the length is less than 2, it displays an alert message saying "El asiento
    contable debe tener al menos dos transacciones." and then returns, preventing the form from being
    submitted if there are not enough transactions. */
    if (transacciones.length < 2) {
      alert("El asiento contable debe tener al menos dos transacciones.");
      return; // No se envía el formulario si no hay suficientes transacciones
    }

    /* The above code is creating an object named `formData` in JavaScript React. This object contains
    properties such as `descripcion`, `auxiliar`, `fecha`, `monto`, `estado`, `moneda`, and
    `transacciones`. The values of these properties are being assigned based on the variables
    `descripcion`, `monto`, `estado`, `moneda`, and `transacciones`. The `fecha` property is being set
    to the current date in ISO format. */
    const formData = {
      descripcion: descripcion,
      auxiliar: 1,
      fecha: new Date().toISOString().split("T")[0],
      monto: monto,
      estado: estado,
      moneda: moneda,
      transacciones: transacciones,
    };

    try {
      // Send POST request to the API endpoint with the form data
      const response = await axios.post(URL_ASIENTO_CONTABLE, formData);
      console.log("Asiento contable registrado:", response.data);
      // Reset form fields after successful submission
      setDescripcion("");
      setOrigenCuenta([]);
      setTiposCuenta([]);
      setCuentasContables([]);
      setEstadosContables([]);
      setMonedas([]);
      setMonto(0);
      setEstado(0);
      setMoneda(0);
      setTransacciones([{ cuenta: "", tipoMovimiento: "", monto: "" }]);
    } catch (error) {
      console.error("Error submitting asiento contable:", error);
    }

    navigate("/registroAsiento");
  };

  const handleTransactionChange = (index, field, value) => {
    const newTransactions = [...transacciones];
    newTransactions[index][field] = value;
    setTransacciones(newTransactions);
  };

  const addTransaction = () => {
    setTransacciones([
      ...transacciones,
      { cuenta: "", tipoMovimiento: "", monto: "" },
    ]);
  };

  const removeTransaction = (index) => {
    const updatedTransactions = [...transacciones];
    updatedTransactions.splice(index, 1); // Elimina la transacción en el índice dado
    setTransacciones(updatedTransactions);
  };

  // Calcula la suma total de los montos dentro de las transacciones
  const totalMonto = transacciones.reduce((monto, transacciones) => {
    // Convierte el monto a un número y suma al total
    return monto + parseFloat(transacciones.monto || 0);
  }, 0);

  return (
    <div className="m-16">
      <div className="text-4xl text-center mb-10">
        <h1>Registro de Entrada Contable</h1>
      </div>
      <form className="px-44" onSubmit={handleSubmit}>
        <section className="gap-8 grid grid-cols-4">
          {/* The code snippet you provided is rendering a `<select>` dropdown element for selecting a type
     of account (Origen de cuenta) within a form. Here's a breakdown of what the code is doing: */}
          <div>
            <label
              htmlFor="Tipo"
              className="block mb-2 text-sm font-medium  dark:text-white text-white"
            >
              Selecciona Tipo de cuenta.
            </label>
            <select
              id="TipoCuenta"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
              required
              onChange={(e) => {
                setTipoMovimiento(e.target.value);
              }}
            >
              <option disabled selected>
                {" "}
                seleccione{" "}
              </option>
              {tiposCuenta.map((tp) => (
                <option key={tp.id} value={tp.id}>
                  {tp.descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* The code snippet you provided is rendering a `<select>` dropdown element for selecting a
          cuenta contable (accounting account) within a form. Here's a breakdown of what the code is
          doing: */}
          <div>
            <label
              htmlFor="estadoContable"
              className="block mb-2 text-sm font-medium  dark:text-white text-white"
            >
              Selecciona Estado contable
            </label>
            <select
              id="estadoContable"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
              required
              onChange={(e) => {
                setEstado(e.target.value);
              }}
            >
              <option disabled selected>
                {" "}
                seleccione{" "}
              </option>
              {estadosContables.map((ec) => (
                <option key={ec.id} value={ec.id}>
                  {ec.descripcion}
                </option>
              ))}
            </select>
          </div>

          {/* The code snippet you provided is rendering a `<select>` dropdown element for selecting a
          cuenta contable (accounting account) within a form. Here's a breakdown of what the code is
          doing: */}
          <div>
            <label
              htmlFor="Moneda"
              className="block mb-2 text-sm font-medium  dark:text-white text-white"
            >
              Selecciona Moneda
            </label>
            <select
              id="moneda"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
              required
              onChange={(e) => {
                setMoneda(e.target.value);
              }}
            >
              <option disabled selected>
                {" "}
                seleccione{" "}
              </option>
              {monedas.map((mm) => (
                <option key={mm.id} value={mm.id}>
                  {mm.descripcion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="totalMonto"
              className="block mb-2 text-sm font-medium dark:text-white text-white"
            >
              Monto Total
            </label>
            <input
              id="totalMonto"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
              value={totalMonto.toFixed(2)} // Mostrar el monto con dos decimales
              readOnly // Hacer que el campo sea de solo lectura
              onChange={(e) => {
                setMonto(totalMonto);
              }}
            />
          </div>
        </section>
        <div className=" mb-4">
          <div className="mb-2 block">
            <Label
              htmlFor="Dar"
              value="Tu descripcion"
              className=" text-white"
            />
          </div>
          <Textarea
            id="comment"
            placeholder="Deja tu descripcion de asiento"
            required
            rows={4}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
          />
        </div>

        {/*  The provided code snippet is rendering a form input field for entering a numeric value with specific
styling and attributes. Here's a breakdown of what the code is doing: */}

        {/* Transaction details */}
        <h2 className="text-3xl font-semibold mb-5 text-center">
          Transacciones{" "}
        </h2>
        {transacciones.map((transaction, index) => (
          <div key={index} className="grid grid-cols-4 gap-6">
            {/* The code snippet you provided is rendering a `<select>` dropdown element for selecting a
            type of account (Tipo de cuenta) within a form. Here's a breakdown of what the code is
            doing: */}
            <div>
              <Label
                htmlFor={`cuenta-${index}`}
                value={`Cuenta ${index + 1}`}
                className="text-white"
              />
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                required
                id={`cuenta-${index}`}
                value={transaction.cuenta}
                onChange={(e) =>
                  handleTransactionChange(index, "cuenta", e.target.value)
                }
              >
                <option selected> seleccione </option>
                {cuentasContables.map((cc) => (
                  <option key={cc.id} value={cc.id}>
                    {cc.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label
                htmlFor={`tipoMovimiento-${index}`}
                value={`Tipo Movimiento ${index + 1}`}
                className="text-white"
              />
              <select
                id={`tipoMovimiento-${index}`}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                required
                value={transaction.tipoMovimiento}
                onChange={(e) =>
                  handleTransactionChange(
                    index,
                    "tipoMovimiento",
                    e.target.value
                  )
                }
              >
                <option selected> seleccione </option>
                {origenCuenta.map((orig) => (
                  <option key={orig.id} value={orig.id}>
                    {orig.descripcion}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mt-1">
              <Label
                htmlFor={`monto-${index}`}
                value={`Monto ${index + 1}`}
                className="text-white"
              />
              <input
                type="number"
                className="text-black w-full rounded-lg "
                min={0}
                onInput={handleInput}
                onChange={(e) =>
                  handleTransactionChange(index, "monto", e.target.value)
                }
                id={`monto-${index}`}
                value={transaction.monto}
              />
            </div>
            <button
              type="button"
              className="text-white h-[40px] bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  text-center mt-6"
              onClick={() => removeTransaction(index)}
            >
              Eliminar
            </button>
          </div>
        ))}
        <div>
          <button
            type="button"
            onClick={addTransaction}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-5"
          >
            Agregar Transacción
          </button>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistroAsiento;
