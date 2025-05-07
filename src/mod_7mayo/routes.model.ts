import express from 'express';
import { Song } from './song.model.js';

export const songRouter = express.Router();

// Crear una nueva canción
songRouter.post('/songs', async (req, res) => {
  const song = new Song(req.body);

  try {
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener todas las canciones
songRouter.get('/songs', async (req, res) => {
  try {
    const songs = await Song.find({});
    res.send(songs);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener una canción por nombre y/o autor
songRouter.get('/songs/search', async (req, res) => {
  const filter: any = {};
  if (req.query.title) filter.title = req.query.title.toString();
  if (req.query.artist) filter.artist = req.query.artist.toString();

  try {
    const songs = await Song.find(filter);
    if (songs.length !== 0) {
      res.send(songs);
    } else {
      res.status(404).send({ error: 'No songs found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una canción por ID
songRouter.patch('/songs/:id', async (req, res) => {
  const allowedUpdates = ['title', 'artist', 'album', 'genre', 'year', 'duration'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    res.status(400).send({ error: 'Invalid updates' });
  }

  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (song) {
      res.send(song);
    } else {
      res.status(404).send({ error: 'Song not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Borrar una canción por ID
songRouter.delete('/songs/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (song) {
      res.send(song);
    } else {
      res.status(404).send({ error: 'Song not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});