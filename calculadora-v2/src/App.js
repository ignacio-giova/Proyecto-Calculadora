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
        <h1 className="font-black text-center">Calculadora - V2</h1>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-50 flex flex-col border rounded-lg border-4 border-orange-400 p-8 w-3/4 h-3/5 items-center">
          
         {/* Input  */}
          <ul className="w-4/5 mx-auto flex items-center w-full gap-2">
            <li>
              <button className="px-4 py-2 bg-red-500 text-white rounded">C</button>
            </li>
            <li className="flex-grow">
              <input className="w-full border border-gray-300 p-2 rounded"
                placeholder='Ingrese expresión' />
            </li>
            <li>
              <button className="px-4 py-2 bg-green-500 text-white rounded">Enter</button>
            </li>
          </ul>

        {/* Botones */}
        <div className="mt-6 flex flex-col justify-center items-center w-3/4 h-3/4 gap-4 text-white">
          <div className="flex gap-4">
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              1
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              2
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              3
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
              +
            </button>
          </div>

          <div className="flex gap-4">
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              4
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              5
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              6
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
              -
            </button>
          </div>

          <div className="flex gap-4">
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              7
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              8
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              9
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
              *
            </button>
          </div>

          <div className="flex gap-4">
            <button className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
              (
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
              1
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
              )
            </button>
            <button className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
              /
            </button>
          </div>
        </div>

          

        </div>
      </div>
    </div>
  );
}

export default App;
