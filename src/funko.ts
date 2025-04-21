import { FunkoType, FunkoGenre } from "./types.js";

export class Funko {
    constructor(
        public id: number,
        public nombre: string, 
        public descripcion: string,
        public tipo: FunkoType,
        public genero: FunkoGenre,
        public franquicia: string,
        public numero: number,
        public exclusivo: boolean,
        public caracteristicas: string,
        public valor: number
    ) {
        /*if ( typeof id !== 'number') {
            throw new Error("Id debe ser un number");
        }
        if ( typeof nombre !== 'string') {
            throw new Error("Nombre debe ser un string");
        }
        if (valor < 0) {
            throw new Error("Valor de mercado debe ser positivo.");
        }*/
    }

    static fromJson(data: any): Funko {
        return new Funko(
            data.id,
            data.nombre,
            data.descripcion,
            data.tipo,
            data.genero,
            data.franquicia,
            data.numero,
            data.exclusivo,
            data.caracteristicas,
            data.valor
        );
    }
}