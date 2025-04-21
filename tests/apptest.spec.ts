import { afterAll, beforeAll, describe, expect, test } from "vitest";
import fs from "fs";
import path from "path";
import request from "supertest";
import {Funko} from "../src/funko.js"
import {getFunko, listFunkos, updateFunko, addFunko, deleteFunko } from "../src/functions.js";
import { FunkoGenre, FunkoType } from "../src/types.js";
import {app} from "../src/server.js";


let server: any;

let funkoTest = new Funko(
    2,
    "nombre2",
    "desc",
    "Pop!" as FunkoType,
    "Videojuegos" as FunkoGenre,
    "franquicia1",
    1,
    false,
    "none",
    25
);

let funkoTestUpdate = new Funko(
    2,
    "nombreUpdated",
    "desc",
    "Pop!" as FunkoType,
    "Videojuegos" as FunkoGenre,
    "franquicia1",
    1,
    false,
    "none",
    25
);

let funkoTestUpdateError = new Funko(
    4,
    "nombreUpdated",
    "desc",
    "Pop!" as FunkoType,
    "Videojuegos" as FunkoGenre,
    "franquicia1",
    1,
    false,
    "none",
    25
);

function borrarDir(): void {
    if (fs.existsSync("data/usuarioTest")) {
        const files = fs.readdirSync("data/usuarioTest");
        files.forEach(file => {
            fs.unlinkSync(path.join("data/usuarioTest", file));
        });
    }
}

describe("Funciones", () => {
    test("add", () => {
        borrarDir();
        if(fs.existsSync("data/usuarioTest")) {
            fs.rmdirSync("data/usuarioTest");
        }
        return addFunko("usuarioTest", funkoTest).then((data) => {
            expect(data.success).toBe(true);
        })
    })

    test("add funko existente", () => {
        return addFunko("usuarioTest", funkoTest).then((data) => {
            expect(data.success).toBe(false);
        })
    })

    test("get funko", () => {
        return getFunko("usuarioTest", 2).then((data) => {
            expect(data.success).toBe(true);
        })
    })

    test("get funko no existe", () => {
        return getFunko("usuarioTest", 99).then((data) => {
            expect(data.success).toBe(false);
        })
    })
    
    test("list funkos", () => {
        return listFunkos("usuarioTest").then((data) => {
            expect(data.success).toBe(true);
        })
    })

    test("list funkos", () => {
        return listFunkos("usuarioTestERROR").then((data) => {
            expect(data.success).toBe(false);
        })
    })

    test("update funko", () => {
        return updateFunko("usuarioTest", funkoTestUpdate).then((data) => {
            expect(data.success).toBe(true);
        })
    })

    test("update funko error", () => {
        return updateFunko("usuarioTest", funkoTestUpdateError).then((data) => {
            expect(data.success).toBe(false);
        })
    })

    test("delete funko", () => {
        return deleteFunko("usuarioTest", 2).then((data) => {
            expect(data.success).toBe(true);
        })
    })

    test("delete funko no existe", () => {
        return deleteFunko("usuarioTest", 2).then((data) => {
            expect(data.success).toBe(false);
        })
        
    })
    //borrarDir();
      //  if(fs.existsSync("data/usuarioTest")) {
        //    fs.rmdirSync("data/usuarioTest");
       // }
    //fs.rmdirSync("data/usuarioTest");
})

describe("", () => {
    beforeAll(()=> {
        server = app.listen(3001);
    });
    afterAll(() => {
        server.close();
    });
    test("add", async () => {
        const response = await request(server).post('/funkos?user=usuarioTest').send(funkoTest);
        expect(response.body.success).toBe(true);
    })
    test("get", async () => {
        const response = await request(server).get('/funkos?user=usuarioTest&id=2');
        expect(response.body.success).toBe(true);
    })
    test("get list", async () => {
        const response = await request(server).get('/funkos?user=usuarioTest');
        expect(response.body.success).toBe(true);
    })
    test("patch", async () => {
        const response = await request(server).patch('/funkos?user=usuarioTest').send(funkoTestUpdate);
        expect(response.body.success).toBe(true);
    })
    test("patch error", async () => {
        const response = await request(server).patch('/funkos?user=usuarioTest').send(funkoTestUpdateError);
        expect(response.body.success).toBe(false);
    })
    test("delete", async () => {
        const response = await request(server).delete('/funkos?user=usuarioTest').send(funkoTestUpdate);
        expect(response.body.success).toBe(true);
    })

})


//const consoleSpy = vi.spyOn(console, 'log');

/*
describe("Tests FunkoManager", () => {
    

    test("Agregar funko", () => {
        borrarDir();
        if(fs.existsSync("data/usuarioTests")) {
            fs.rmdirSync("data/usuarioTests");
        }
        //fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.addFunko(funkoTest);

        expect(resultado).toBe(true);
    });

    test("Agregar funco existente funko", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.addFunko(funkoTest);

        expect(resultado).toBe(false);
        
    });

    test("Lista de funcos", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.listarFunkos();

        expect(resultado).toEqual([funkoTest20]);
        
    });

    test("Leer", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.mostrarFunko(2);

        expect(resultado).toEqual([funkoTest20]);

        const resultado2 = manager.mostrarFunko(3);

        expect(resultado2).toBe(false);
        
    });

    test("Actualizar", () => {
        let manager = new FunkoManager("usuarioTests");
        let funkoTest = new Funko(
            2,
            "nombre3",
            "desc",
            "Pop!" as FunkoTipo,
            "Videojuegos" as FunkoGenero,
            "franquicia1",
            1,
            false,
            "none",
            25
        );

        const resultado = manager.actualizarFunko(funkoTest);

        expect(resultado).toBe(true);
        
    });

    test("Actualizar no encontrado", () => {
        let manager = new FunkoManager("usuarioTests");
        let funkoTest = new Funko(
            99,
            "nombre3",
            "desc",
            "Pop!" as FunkoTipo,
            "Videojuegos" as FunkoGenero,
            "franquicia1",
            1,
            false,
            "none",
            25
        );

        const resultado = manager.actualizarFunko(funkoTest);

        expect(resultado).toBe(false);
        
    });

    test("Eliminar no existe", () => {
        let manager = new FunkoManager("usuarioTests");

        const resultado = manager.eliminarFunko(88);

        expect(resultado).toBe(false);
        
    });

    test("Eliminar", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.eliminarFunko(2);

        expect(resultado).toBe(true);
        
    });

    test("Lista de funkos no encuentra", () => {
        let manager = new FunkoManager("usuarioTests");
        const resultado = manager.listarFunkos();

        expect(resultado).toBe(false);
        
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest2);
        manager.listarFunkos();
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest3);
        manager.listarFunkos();
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest4);
        manager.listarFunkos();
    });

    test("Agregar funko valor 0", () => {
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
        let manager = new FunkoManager("usuarioTests");
        manager.addFunko(funkoTest5);
        manager.listarFunkos();
        borrarDir();
        fs.rmdirSync("data/usuarioTests");
    });
    


  });*/