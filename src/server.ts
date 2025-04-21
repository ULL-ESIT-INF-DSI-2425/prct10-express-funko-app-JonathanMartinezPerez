import express from 'express';
import { Funko } from './funko.js';
import { getFunko, listFunkos, addFunko, deleteFunko, updateFunko } from './functions.js';

import bodyParser from 'body-parser';

/**
 * Servidor Express para gestionar la API de Funkos
 */
export const app = express();
app.disable('x-powered-by');

app.use(bodyParser.json());

app.get('/funkos', async (req, res) => {

    const username: string = req.query.user as string;
    const id = req.query.id ? Number(req.query.id) : null;

    if (id !== null) {
        const respuesta = await getFunko(username, id);
        res.json(respuesta);
    } else {
        const respuesta = await listFunkos(username);
        res.json(respuesta);
    }
    
});

app.post('/funkos', async (req, res) => {
    const username: string = req.query.user as string;
    const funkoNuevo = new Funko(
        req.body.id,
        req.body.nombre,
        req.body.descripcion,
        req.body.tipo,
        req.body.genero,
        req.body.franquicia,
        req.body.numero,
        req.body.exclusivo,
        req.body.caracteristicas,
        req.body.valor
    );

    const respuesta = await addFunko(username, funkoNuevo);
    res.json(respuesta);

});

app.delete('/funkos', async(req, res) => {
    const username: string = req.query.user as string;
    const id = req.body.id;
    const respuesta = await deleteFunko(username, id);
    res.json(respuesta);
});

app.patch('/funkos', async (req, res) => {
    const username: string = req.query.user as string;
    const id = Number(req.body.id);
    const modifyFunko = new Funko(
        req.body.id,
        req.body.nombre,
        req.body.descripcion,
        req.body.tipo,
        req.body.genero,
        req.body.franquicia,
        req.body.numero,
        req.body.exclusivo,
        req.body.caracteristicas,
        req.body.valor
    );
    
    const respuesta = await getFunko(username, id);
    if (respuesta.success) {
        const respuesta2 = await updateFunko(username, modifyFunko);
        res.json(respuesta2);
    } else {
        res.json(respuesta);
    }
    
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});