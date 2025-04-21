import * as fs from 'fs/promises';
import * as path from 'path';
import { Funko } from './funko.js';
import { ResponseType } from './types.js';

/**
 * Funcion para mostrar un funko específico
 * @param user - usuario propietario de los funkos
 * @param id - id del funko a buscar
 * @returns - respuesta del tipo ResponseType de la función
 */
export async function getFunko(user: string, id: number): Promise<ResponseType> {
const filePath = path.join('data', user, `${id}.json`);
//console.log(filePath);
try {
    const content = await fs.readFile(filePath, 'utf-8');
    
    return {success: true, message: "Funko Encontrado",funkoPop: JSON.parse(content)};
} catch {
    return {success: false, message: "ERROR: Funko no encontrado"};
}
}

/**
 * Funcion que devuelve una lista de funkos
 * @param user - usuario propietario de los funkos
 * @returns - respuesta del tipo ResponseType 
 */
export async function listFunkos(user: string): Promise<ResponseType> {
    const userPath = path.join('data', user);
    
    try {
        const files = await fs.readdir(userPath);
        const listaFunkos: Funko[] = await Promise.all(
            files.map(async (file) => {
                const content = await fs.readFile(path.join(userPath, file), 'utf-8');
                return JSON.parse(content);
            })
        )
        return {success: true, funkoPops: listaFunkos};
    } catch {
        return {success: false, message: "ERROR al generar la lista de Funkos."};
    }
}

/**
 * Función que añade un funko a la coleccion de un usuario
 * @param user - usuario al que se le añadirá el funko
 * @param newFunko - propiedades del funko a añadir
 * @returns - respuesta del tipo ResponseType
 */
export async function addFunko(user: string, newFunko: Funko): Promise<ResponseType> {

    const userPath = path.join('data', user);
    const filePath = path.join(userPath, `${newFunko.id}.json`);

    try {
        await fs.mkdir(userPath, {recursive: true});
        try {
            await fs.access(filePath);
            return {success: false, message: "ERROR: existe un funko con esa ID para el usuario."};
        } catch {
            await fs.writeFile(filePath, JSON.stringify(newFunko, null, 2), 'utf-8');
            return {success: true, message: "Funko añadido correctamente."};
        }
    } catch {
        return { success: false, message: "ERROR al añadir el funko."};
    }
}

/**
 * Funcion que elimina un funko de la colección de un usuario
 * @param user - usuario al que se le eliminará un funko de la colección
 * @param id - id del funko a eliminar
 * @returns - respuesta de la función del tipo ResponseType
 */
export async function deleteFunko(user: string, id: number): Promise<ResponseType> {
    const userPath = path.join('data', user);
    const filePath = path.join(userPath, `${id}.json`);
    try{
        await fs.access(filePath);
        await fs.unlink(filePath);
        return {success: true, message: "Funko eliminado correctamente."};
    } catch {
        return {success: false, message: "ERROR al eliminar el Funko."};
    }
}

/**
 * Función que modifica un funko de la colección de un usuario
 * @param user - usuario al que se le modifica el funko
 * @param funko - propiedades modificadas del funko
 * @returns - respuesta de la funcion del tipo ResponseType
 */
export async function updateFunko(user: string, funko: Funko): Promise<ResponseType> {
    const userPath = path.join('data', user);
    const filePath = path.join(userPath, `${funko.id}.json`);
    try{
        await fs.access(filePath);
        await fs.writeFile(filePath, JSON.stringify(funko, null, 2));

        return {success: true, message: "Funko modificado correctamente."};
    } catch {
        return {success: false, message: "ERROR al modificar el Funko."};
    }
}