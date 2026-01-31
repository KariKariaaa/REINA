import { useState } from 'react';
import { resolverOchoReinas, type Solution } from '../utils/eightQueens';
import './QueensGame.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessQueen } from '@fortawesome/free-solid-svg-icons'


export default function QueensGame() {
  // Estado para la posición inicial que el usuario ingresa
  const [filaInicial, setFilaInicial] = useState<number>(0);
  const [colInicial, setColInicial] = useState<number>(0);

  // Estado para las soluciones encontradas
  const [soluciones, setSoluciones] = useState<Solution[]>([]);

  // Estado para el índice de la solución actual que se está visualizando
  const [indiceSolucion, setIndiceSolucion] = useState<number>(0);

  // Estado para mensajes (no hay solución, etc.)
  const [mensaje, setMensaje] = useState<string>('');

  // Función que se ejecuta cuando el usuario hace clic en "Resolver"
  const handleResolver = () => {
    // Resolvemos el problema de 8 reinas con la posición inicial
    const resultados = resolverOchoReinas(filaInicial, colInicial);

    if (resultados.length === 0) {
      // Si no hay soluciones
      setMensaje('No se encontró solución con esa posición inicial.');
      setSoluciones([]);
      setIndiceSolucion(0);
    } else {
      // Si hay soluciones
      setMensaje(`Se encontraron ${resultados.length} solución(es)`);
      setSoluciones(resultados);
      setIndiceSolucion(0);
    }
  };

  // Función para ir a la siguiente solución
  const handleSiguiente = () => {
    if (indiceSolucion < soluciones.length - 1) {
      setIndiceSolucion(indiceSolucion + 1);
    }
  };

  // Función para ir a la solución anterior
  const handleAnterior = () => {
    if (indiceSolucion > 0) {
      setIndiceSolucion(indiceSolucion - 1);
    }
  };

  // Obtenemos la solución actual
  const solucionActual = soluciones.length > 0 ? soluciones[indiceSolucion] : null;

  return (
    <div className="queens-container">
      <h1>Problema de las 8 Reinas</h1>

      {/* Panel de control */}
      <div className="control-panel">
        <div className="input-group">
          <label>
            Fila (0-7):
            <input
              type="number"
              min="0"
              max="7"
              value={filaInicial}
              onChange={(e) => setFilaInicial(Number(e.target.value))}
              disabled={soluciones.length > 0}
            />
          </label>

          <label>
            Columna (0-7):
            <input
              type="number"
              min="0"
              max="7"
              value={colInicial}
              onChange={(e) => setColInicial(Number(e.target.value))}
              disabled={soluciones.length > 0}
            />
          </label>

          <button onClick={handleResolver} disabled={soluciones.length > 0}>
            Resolver
          </button>

          {soluciones.length > 0 && (
            <button
              onClick={() => {
                setSoluciones([]);
                setIndiceSolucion(0);
                setMensaje('');
              }}
              className="reset-btn"
            >
              Reiniciar
            </button>
          )}
        </div>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>

      {/* Tablero visual */}
      {solucionActual && (
        <div className="main-content">
          <Board solucion={solucionActual} filaInicial={filaInicial} colInicial={colInicial} />

          {/* Navegación entre soluciones */}
          {soluciones.length > 1 && (
            <div className="navigation">
              <button onClick={handleAnterior} disabled={indiceSolucion === 0}>
                ← Anterior
              </button>

              <span className="counter">
                Solución {indiceSolucion + 1} de {soluciones.length}
              </span>

              <button
                onClick={handleSiguiente}
                disabled={indiceSolucion === soluciones.length - 1}
              >
                Siguiente →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Componente que renderiza el tablero de ajedrez con las reinas
 */
interface BoardProps {
  solucion: number[];
  filaInicial: number;
  colInicial: number;
}

function Board({ solucion, filaInicial, colInicial }: BoardProps) {
  return (
    <div className="board">
      {solucion.map((columna, fila) => (
        <div key={fila} className="board-row">
          {Array.from({ length: 8 }).map((_, col) => {
            // Determinamos si hay una reina en esta casilla
            const tieneReina = columna === col;
            // Determinamos si es la reina inicial del usuario
            const esReginaInicial = fila === filaInicial && col === colInicial;
            // Determinamos el color de la casilla (alternando)
            const esCasillaCremosa = (fila + col) % 2 === 0;

            return (
              <div
                key={`${fila}-${col}`}
                className={`casilla ${esCasillaCremosa ? 'cremosa' : 'gris'} ${
                  tieneReina ? 'con-reina' : ''
                } ${esReginaInicial ? 'reina-inicial' : ''}`}
              >
                {tieneReina && <span className="reina"><FontAwesomeIcon icon={faChessQueen} /></span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
