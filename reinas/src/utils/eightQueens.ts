/**
 * Algoritmo para resolver el problema de las 8 reinas
 * Utiliza backtracking para encontrar todas las soluciones posibles
 */

// Tipo para representar una solución (array de posiciones y)
export type Solution = number[];

/**
 * Verifica si es seguro colocar una reina en la posición (fila, columna)
 * Una reina ataca a otras si:
 * - Están en la misma fila (pero esto no ocurre en nuestro algoritmo)
 * - Están en la misma columna
 * - Están en la misma diagonal (superior-izquierda o inferior-derecha)
 * - Están en la diagonal inversa (superior-derecha o inferior-izquierda)
 * 
 * @param tablero Array donde tablero[fila] = columna de la reina en esa fila
 * @param fila Fila donde queremos colocar la reina
 * @param columna Columna donde queremos colocar la reina
 * @returns true si es seguro colocar la reina, false en caso contrario
 */
function isSafe(tablero: number[], fila: number, columna: number): boolean {
  // Verificamos todas las filas anteriores
  for (let i = 0; i < fila; i++) {
    const colOcupada = tablero[i];

    // Verificamos si hay una reina en la misma columna
    if (colOcupada === columna) {
      return false;
    }

    // Verificamos diagonales:
    // Si la diferencia de filas es igual a la diferencia de columnas,
    // las reinas están en la misma diagonal
    if (Math.abs(i - fila) === Math.abs(colOcupada - columna)) {
      return false;
    }
  }

  return true;
}

/**
 * Función recursiva de backtracking que resuelve el problema de 8 reinas
 * Coloca las reinas una fila a la vez, intentando cada columna
 * Si no encuentra una solución, retrocede y prueba otra columna
 * 
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
  // Caso base: si hemos colocado reinas en todas las filas, encontramos una solución
  if (fila === 8) {
    // Guardamos una copia de la solución actual
    soluciones.push([...tablero]);
    return;
  }

  // Si es la fila inicial (donde el usuario especificó la reina)
  if (fila === filaInicial) {
    // Verificamos si la columna especificada por el usuario es segura
    if (isSafe(tablero, fila, colInicial)) {
      tablero[fila] = colInicial;
      // Continuamos con la siguiente fila
      resolverRecursivo(tablero, fila + 1, soluciones, filaInicial, colInicial);
    }
    // Si no es segura, no hay soluciones posibles con esa posición inicial
    return;
  }

  // Para las otras filas, intentamos colocar una reina en cada columna
  for (let columna = 0; columna < 8; columna++) {
    // Si es seguro colocar una reina en esta posición
    if (isSafe(tablero, fila, columna)) {
      // Colocamos la reina
      tablero[fila] = columna;
      
      // Llamamos recursivamente para la siguiente fila
      resolverRecursivo(tablero, fila + 1, soluciones, filaInicial, colInicial);
      
      // Backtracking: removemos la reina para intentar otras opciones
      // (aunque no es necesario porque será sobrescrita en la siguiente iteración)
    }
  }
}

/**
 * Función principal que resuelve el problema de 8 reinas
 * Dada una posición inicial del usuario, encuentra todas las soluciones posibles
 * 
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
  // Creamos un tablero vacío (con -1 indicando sin reina)
  const tablero: number[] = Array(8).fill(-1);

  // Iniciamos el algoritmo de backtracking
  resolverRecursivo(tablero, 0, soluciones, filaInicial, colInicial);

  return soluciones;
}

/**
 * Verifica si dos posiciones se atacan entre sí
 * Utilizada para visualización y debug
 * 
 * @param fila1 Fila de la primera reina
 * @param col1 Columna de la primera reina
 * @param fila2 Fila de la segunda reina
 * @param col2 Columna de la segunda reina
 * @returns true si se atacan, false en caso contrario
 */
export function seAtacan(
  fila1: number,
  col1: number,
  fila2: number,
  col2: number
): boolean {
  // Misma fila
  if (fila1 === fila2) return true;

  // Misma columna
  if (col1 === col2) return true;

  // Misma diagonal
  if (Math.abs(fila1 - fila2) === Math.abs(col1 - col2)) return true;

  return false;
}
