import React, { useState, useEffect } from 'react';

const palabrasIniciales = ['libro', 'perro', 'tucan', 'jaula', 'lapiz'];
const indiceInicial = 0;

export function Game() {
  const [palabrasOriginales, setPalabrasOriginales] = useState(palabrasIniciales);
  const [palabraOriginal, setPalabraOriginal] = useState(palabrasOriginales[indiceInicial]);
  const [palabraDesordenada, setPalabraDesordenada] = useState('');
  const [valoresEntrada, setValoresEntrada] = useState(Array(palabraOriginal.length).fill(''));
  const [indiceEntradaActual, setIndiceEntradaActual] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [mensaje, setMensaje] = useState('');
  const [indiceActual, setIndiceActual] = useState(indiceInicial);

  useEffect(() => {
    // Desordena la palabra al cargar el componente
    let palabraDesordenada = '';
    do {
      palabraDesordenada = palabraOriginal.split('').sort(() => Math.random() - 0.5).join('');
    } while (palabraDesordenada === palabraOriginal);

    setPalabraDesordenada(palabraDesordenada);
  }, [palabraOriginal]);

  const manejarCambioEntrada = (event) => {
    const valorActual = event.target.value;
    const valoresEntradaActualizados = [...valoresEntrada];
    valoresEntradaActualizados[indiceEntradaActual] = valorActual;
    setValoresEntrada(valoresEntradaActualizados);

    if (valorActual === palabraOriginal[indiceEntradaActual]) {
      if (indiceEntradaActual === palabraOriginal.length - 1) {
        // Adivinó la palabra, elimina la palabra del arreglo
        setMensaje(`¡Correcto! La palabra es  ${palabraOriginal}`);
        const nuevasPalabras = palabrasOriginales.filter((palabra) => palabra !== palabraOriginal);
        setPalabrasOriginales(nuevasPalabras);
        if (nuevasPalabras.length > 0) {
          const nuevoIndice = Math.floor(Math.random() * nuevasPalabras.length);
          setIndiceActual(nuevoIndice);
          setPalabraOriginal(nuevasPalabras[nuevoIndice]);
          setIndiceEntradaActual(0);
          setValoresEntrada(Array(nuevasPalabras[nuevoIndice].length).fill(''));
          setMensaje('');
        } else {
          setMensaje('¡Felicidades, has adivinado todas las palabras!');
        }
      } else {
        setIndiceEntradaActual(indiceEntradaActual + 1);
        setMensaje('¡Letra correcta! Avanza al siguiente cuadro.');
      }
    } else {
      setVidas(vidas - 1);
      setMensaje('Intenta de nuevo. La letra no es correcta.');
      if (vidas === 1) {
        setMensaje('¡Perdiste! Te quedaste sin vidas.');
      }
    }
  };

  const manejarEliminar = () => {
    const valoresEntradaActualizados = [...valoresEntrada];
    valoresEntradaActualizados[indiceEntradaActual] = ''; // Elimina la letra
    setValoresEntrada(valoresEntradaActualizados);
  };

  const manejarReiniciar = () => {
    // Cambia a una nueva palabra al hacer clic en el botón "Reset"
    const nuevoIndice = Math.floor(Math.random() * palabrasOriginales.length);
    setIndiceActual(nuevoIndice);
    setPalabraOriginal(palabrasOriginales[nuevoIndice]);
    setIndiceEntradaActual(0);
    setValoresEntrada(Array(palabrasOriginales[nuevoIndice].length).fill(''));
    setMensaje('');
  };

  const cuadrosEntrada = valoresEntrada.map((valor, indice) => (
    <div key={indice} className="flex flex-col-reverse items-center justify-center ">
      <input
        type="text"
        value={valor}
        onChange={manejarCambioEntrada}
        disabled={indice !== indiceEntradaActual || vidas == 0}
        className='w-32 text-center border-2 border-gray-400'
      />
      {indice === indiceEntradaActual && (
        <button onClick={manejarEliminar} className="absolute p-1 text-white bg-red-500 bottom-[17.6rem]">
          Eliminar
        </button>
      )}
    </div>
    
  ));

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-yellow-200'>
      <h1 className='text-2xl font-black'>Juego de Adivinar Palabra Desordenada</h1> 
      <div className='flex flex-row items-center justify-center w-full mt-10 gap-x-36'>
      <p className='p-2 font-black text-white rounded-sm bg-sky-400'>Palabra Desordenada: {palabraDesordenada}</p>
      <p className='p-2 font-black text-white rounded-sm bg-sky-400'>Vidas restantes: {vidas}</p>
      </div>

<div>

      <div className="flex flex-row items-center justify-center mt-10 border ">
        {cuadrosEntrada}
      </div>
     
     
</div>
<button onClick={manejarReiniciar} className='p-2 mt-32 text-white bg-slate-500'>Reiniciar</button>
      <p className='mt-10 text-2xl'>{mensaje}</p>
    </div>
  );
}
