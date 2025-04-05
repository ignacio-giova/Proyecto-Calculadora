import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const parseExpression = (expr) => {
    expr = expr.replace(/\s+/g, ''); // Eliminar espacios

    // Caso base: es un número
    if (!isNaN(expr) && !isNaN(parseFloat(expr))) {
      return {
        type: 'number',
        value: parseFloat(expr)
      };
    }

    const operators = [
      { ops: ['+', '-'], precedence: 1 },
      { ops: ['*', '/'], precedence: 2 }
    ];

    let splitPos = -1;
    let currentOp = null;

    // Buscar operador de menor precedencia (derecha a izquierda)
    for (const group of operators) {
      for (let i = expr.length - 1; i >= 0; i--) {
        const char = expr[i];
        if (group.ops.includes(char)) {
          splitPos = i;
          currentOp = char;
          break;
        }
      }
      if (splitPos !== -1) break;
    }

    if (splitPos === -1) {
      // Si no se encontró un operador, la expresión es inválida
      throw new Error('Expresión inválida');
    }

    const leftExpr = expr.substring(0, splitPos);
    const rightExpr = expr.substring(splitPos + 1);

    return {
      type: 'operation',
      operator: currentOp,
      left: parseExpression(leftExpr),
      right: parseExpression(rightExpr)
    };
  };

  const evaluate = (node) => {
    if (node.type === 'number') {
      return node.value;
    }
    const left = evaluate(node.left);
    const right = evaluate(node.right);
    
    switch (node.operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': 
        // Error si se divide por Cero
        if (right === 0) throw new Error("División por cero");
        return left / right;
      default: throw new Error('Operador desconocido');
    }
  };

  // Uso de try/catch para agarrar errores
  const calcular = () => {
    try {
      const expr = String(input); // Asegurar que input es string
      const parsed = parseExpression(expr);
      const result = evaluate(parsed);

      if (!isFinite(result)) {
        setError("Error: división por cero");
      } else {
        setInput(result.toString());
        setError("");
      }
    } catch (error) {
      setError("Error: expresión inválida");
    }
  };

  // Cambia si hubo un error antes
  const handleChange = (e) => {
    setInput(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-orange-400 shadow text-white text-4xl py-6">
        <h1 className="font-black text-center">Calculadora - V2</h1>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-50 flex flex-col border rounded-lg border-4 border-orange-400 p-8 w-3/4 h-3/5 items-center">
          
          {/* Input  */}
          <ul className="w-4/5 mx-auto flex items-center gap-2">
            <li>
              <button 
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setInput("");
                  setError(""); //Sacar el msj de error
                }}>
                AC
              </button>
            </li>
            <li className="flex-grow">
              <input 
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="Ingrese expresión"
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    calcular();
                  }
                }}
              />
            </li>
            <li>
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={calcular}>
                Enter
              </button>
            </li>
          </ul>

          {/* Mensaje de Error */}
          <p className="mt-4 text-red-500 font-bold">{error}</p>

          {/* Botones de la calculadora */}
          <div className="mt-6 flex flex-col justify-center items-center w-3/4 h-3/4 gap-4 text-white">
            <div className="flex gap-4">
              <button 
                onClick={() => setInput(input + "1")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                1
              </button>
              <button 
                onClick={() => setInput(input + "2")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                2
              </button>
              <button 
                onClick={() => setInput(input + "3")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                3
              </button>
              <button 
                onClick={() => setInput(input + "+")}
                className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
                +
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setInput(input + "4")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                4
              </button>
              <button
                onClick={() => setInput(input + "5")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                5
              </button>
              <button
                onClick={() => setInput(input + "6")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                6
              </button>
              <button
                onClick={() => setInput(input + "-")}
                className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
                -
              </button>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setInput(input + "7")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                7
              </button>
              <button
                onClick={() => setInput(input + "8")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                8
              </button>
              <button
                onClick={() => setInput(input + "9")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                9
              </button>
              <button
                onClick={() => setInput(input + "*")}
                className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
                *
              </button>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setInput(input + ".")}
                className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
                .
              </button>
              <button
                onClick={() => setInput(input + "0")}
                className="w-16 h-16 flex items-center justify-center bg-orange-400 hover:bg-orange-600 rounded text-2xl font-bold">
                0
              </button>
              <button
                onClick={() => setInput(String(input).slice(0, -1))}
                className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
                ←
              </button>
              <button
                onClick={() => setInput(input + "/")}
                className="w-16 h-16 flex items-center justify-center bg-red-400 hover:bg-red-600 rounded text-2xl font-black">
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