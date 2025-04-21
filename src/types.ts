import { Funko } from "./funko.js"

/**
* Géneros de Funko
*/
export type FunkoGenre = 'Animación' | 'Películas y TV' | 'Videojuegos' | 'Deportes' | 'Música' | 'Ánime';

/**
 * Posibles tipos de Funkos
 */
export type FunkoType = 'Pop!' | 'Pop! Rides' | 'Vynil Soda' | 'Vynil Gold';

/**
 * Tipo de respuesta
 */
export type ResponseType = {
    success: boolean,
    message?: string,
    funkoPops?: Funko[],
    funkoPop?: Funko,
}