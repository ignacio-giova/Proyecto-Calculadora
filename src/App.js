import {useState} from 'react'
import './App.css';

function App() {

  return (<>
    <div className="flex flex-col h-screen">
        <header className="bg-orange-400 shadow text-white text-4xl py-6">
          <h1 className="font-black text-center	"> Calculadora - V1</h1>
        </header>

        <div className="flex-1 flex items-center justify-center">
            <div className="bg-gray-50 flex flex-col border rounded-lg border-4 border-orange-400 p-8 w-3/4 h-1/2">

            {/* Input */}
              <div className='flex justify-center gap-24 mt-6 text-2xl'>
                <input className="border border-lg p-1" type="text" placeholder='Primer Valor'></input>
                <input className="border border-lg p-1" type="text" placeholder='Segundo Valor'></input>
              </div>

              {/* Operaciones */}
              <div className="flex justify-center gap-5 text-white text-5xl m-10">
                <button className='bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500'>+</button>
                <button className='bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500'>-</button>
                <button className='bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500'>*</button>
                <button className='bg-orange-400 rounded-lg w-24 h-24 p-2 hover:bg-orange-500'>/</button>
              </div>

              {/* Resultado  */}
              <div className="text-2xl text-center">
                <h3 className='mb-4'>Resultado</h3>
                <label className="bg-white border rounded-md p-2 text-gray-400">Valor Resultado</label>
              </div>

            </div>

       </div>
    </div>
      </>)
    
}

export default App;