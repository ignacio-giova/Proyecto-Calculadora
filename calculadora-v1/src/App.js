import { useState } from 'react';
import './App.css';

function App() {
  const [valor1, setValor1] = useState("");  // Estado para el primer valor
  const [valor2, setValor2] = useState("");  // Estado para el segundo valor
  const [resultado, setResultado] = useState("");  // Estado para el resultado

  const calcular = (operador) => {
    const num1 = parseFloat(valor1);
    const num2 = parseFloat(valor2);

    // Validar si los valores ingresados son números
    if (isNaN(num1) || isNaN(num2)) {
      setResultado("Error");
      return;
    }

    switch (operador) {
      case "+":
        setResultado(num1 + num2);
        break;
      case "-":
        setResultado(num1 - num2);
        break;
      case "*":
        setResultado(num1 * num2);
        break;
      case "/":
        setResultado(num2 !== 0 ? num1 / num2 : "Error");
        break;
      default:
        setResultado("Error");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-orange-400 shadow text-white text-4xl py-6">
        <h1 className="font-black text-center">Calculadora - V1</h1>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-50 flex flex-col border rounded-lg border-4 border-orange-400 p-8 w-3/4 h-1/2">
          
          {/* Inputs */}
          <div className="flex justify-center gap-24 mt-6 text-2xl">
            <input 
              className="border border-lg p-1 text-center" 
              type="text" 
              placeholder="Primer Valor"
              value={valor1}
              onChange={(e) => setValor1(e.target.value)}
            />
            <input 
              className="border border-lg p-1 text-center" 
              type="text" 
              placeholder="Segundo Valor"
              value={valor2}
              onChange={(e) => setValor2(e.target.value)}
            />
          </div>

          {/* Botones de operaciones */}
          <div className="flex justify-center gap-5 text-white text-5xl m-10 font-black	">
            <button onClick={() => calcular("+")} className="bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500">+</button>
            <button onClick={() => calcular("-")} className="bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500">-</button>
            <button onClick={() => calcular("*")} className="bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500">*</button>
            <button onClick={() => calcular("/")} className="bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500">/</button>
          </div>

          {/* Resultado */}
          <div className="text-2xl text-center">
            <h3 className="mb-4">Resultado</h3>
            <label className="bg-white border rounded-md p-2 text-gray-400">
              {resultado !== "" ? resultado : "Valor Resultado"}
            </label>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
