export type Solution = number[];

/**
 * @param tablero Array donde tablero[fila] = columna de la reina en esa fila
 * @param fila Fila donde queremos colocar la reina
 * @param columna Columna donde queremos colocar la reina
 * @returns true si es seguro colocar la reina, false en caso contrario
 */

function seguro(tablero: number[], fila: number, columna: number): boolean {
  // Verificamos todas las filas anteriores
  for (let i = 0; i < fila; i++) {
    const colOcupada = tablero[i];

    // Verificamos si hay una reina en la misma columna
    if (colOcupada === columna) {
      return false;
    }

    // Verificamos diagonales:
    // Si la diferencia de filas es igual a la diferencia de columnas, las reinas están en la misma diagonal
    if (Math.abs(i - fila) === Math.abs(colOcupada - columna)) {
      return false;
    }
  }

  return true;
}

/**
 * @param tablero Array donde se van colocando las reinas
 * @param fila Fila actual donde intentamos colocar una reina
 * @param soluciones Array que acumula todas las soluciones encontradas
 * @param filaInicial Fila donde el usuario especificó la primera reina
 * @param colInicial Columna donde el usuario especificó la primera reina
 */
function resolverRecursivo(
  tablero: number[],
  fila: number,
  soluciones: Solution[],
  filaInicial: number,
  colInicial: number
): void {
  // Si completa
  if (fila === 8) {
    soluciones.push([...tablero]);
    return;
  }

  // Si es la fila inicial (pedida desde el input)
  if (fila === filaInicial) {
    // Verificamos si la columna especificada por el usuario es segura
    if (seguro(tablero, fila, colInicial)) {
      tablero[fila] = colInicial;
      // Continuamos con la siguiente fila
      resolverRecursivo(tablero, fila + 1, soluciones, filaInicial, colInicial);
    }
    // Si no es segura, se descarta esta solución
    return;
  }

  // Para las otras filas, intentamos colocar una reina en cada columna
  for (let columna = 0; columna < 8; columna++) {
    // Si es seguro colocar una reina en esta posición
    if (seguro(tablero, fila, columna)) {
      // Colocamos la reina
      tablero[fila] = columna;
      
      // Llamamos recursivamente para la siguiente fila
      resolverRecursivo(tablero, fila + 1, soluciones, filaInicial, colInicial);
    }
  }
}

/**
 * Función Inicial
 * @param filaInicial Fila donde el usuario quiere colocar la primera reina (0-7)
 * @param colInicial Columna donde el usuario quiere colocar la primera reina (0-7)
 * @returns Array de todas las soluciones posibles
 */
export function resolverOchoReinas(
  filaInicial: number,
  colInicial: number
): Solution[] {
  // Validamos que las coordenadas sean válidas
  if (
    filaInicial < 0 ||
    filaInicial > 7 ||
    colInicial < 0 ||
    colInicial > 7
  ) {
    return [];
  }

  const soluciones: Solution[] = [];
  // Creamos un tablero vacío
  const tablero: number[] = Array(8).fill(-1);
  resolverRecursivo(tablero, 0, soluciones, filaInicial, colInicial);
  return soluciones;
}