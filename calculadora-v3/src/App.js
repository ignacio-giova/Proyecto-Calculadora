import { useRef, useState } from 'react';
import './App.css';
import { DoubleLinkedList } from './DoubleLinkedList';


function App() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const history = useRef(new DoubleLinkedList())

  const parseExpression = (expr) => {
    expr = expr.replace(/\s+/g, ''); // Eliminar espacios
  
    // Si la expresión empieza y termina con paréntesis, se los quita
    if (isWrappedInParens(expr)) {
        expr = expr.slice(1, -1);
    }
  
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
  
    let parentesis = 0;
    let bandera = 0;
    let splitPos = -1;
    let currentOp = null;
  
    // Buscar operador de menor precedencia (derecha a izquierda)
    for (const group of operators) {
      // Iteramos de derecha a izquierda; la condición incluye !bandera para salir si ya se encontró
      for (let i = expr.length - 1; i >= 0 && !bandera; i--) {
        const char = expr[i];
        switch (char) {
          case ")":
            parentesis++;
            break;
          case "(":
            parentesis--;
            break;
          default:
            if (group.ops.includes(char) && parentesis === 0) {
              splitPos = i;
              currentOp = char;
              bandera = 1; // Indicamos que ya encontramos un operador válido
            }
        }
      }
      if (splitPos !== -1) break;
    }
  
    if (splitPos === -1 && parentesis !== 0) {
      // Si no se encontró un operador y hay parentesis abiertos o cerrados de más,
      // la expresión es inválida
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

  const isWrappedInParens = (expr) => {
    if (expr[0] !== '(' || expr[expr.length - 1] !== ')') return false;
    
    let count = 0;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '(') count++;
      else if (expr[i] === ')') count--;
      
      // Si el contador llega a 0 antes de finalizar, no están envolviendo toda la expresión.
      if (count === 0 && i < expr.length - 1) return false;
    }
    return count === 0;
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
        history.current.add(expr);
        history.current.printList();
      }
    } catch (error) {
      setError("Error: expresión inválida ");
    }
  };

  // Cambia si hubo un error antes
  const handleChange = (e) => {
    setInput(e.target.value);
    if (error) setError("");
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        calcular();
        break;

      case "ArrowUp":
        history.current.up();
        if(history.current.head != null)
          setInput(history.current.current.data);
        break;

      case "ArrowDown":
        history.current.down();
        if(history.current.head != null)
          setInput(history.current.current.data);
        break;

      default:
        break;
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-orange-400 shadow text-white text-4xl py-6">
        <h1 className="font-black text-center">Calculadora - V2</h1>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="bg-gray-50 flex flex-col border rounded-lg border-4 border-orange-400 p-8 w-3/4 h-3/5 items-center">
          
          {/* Input */}
          <ul className="w-4/5 mx-auto flex gap-2 h-12">
            {/* Botón AC */}
            <li>
              <button 
                className="h-full px-4 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setInput("");
                  setError("");
                }}>
                AC
              </button>
            </li>

            {/* Flechas verticales */}
            <li className="h-full flex flex-col bg-violet-500 text-white rounded overflow-hidden">
              <button 
                onClick={() => handleKeyDown({ key: "ArrowUp" })}
                className="flex-1 px-4 hover:bg-violet-600 flex items-center justify-center"
              >
                ▲
              </button>
              <button
                onClick={() => handleKeyDown({ key: "ArrowDown" })}
                className="flex-1 px-4 hover:bg-violet-600 flex items-center justify-center"
              >
                ▼
              </button>
            </li>

            {/* Input */}
            <li className="flex-grow">
              <input 
                className="w-full h-full border border-gray-300 px-2 py-1 rounded"
                placeholder="Ingrese expresión"
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </li>

            {/* Botón Enter */}
            <li>
              <button 
                className="h-full px-4 bg-green-500 text-white rounded hover:bg-green-600"
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