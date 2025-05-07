import { Document, model, Schema } from 'mongoose';

interface SongDocumentInterface extends Document {
  title: string;
  artist: string;
  album?: string;
  genre?: 'pop' | 'rock' | 'hip-hop' | 'jazz' | 'classical';
  year?: number;
  duration?: string;
}

const SongSchema = new Schema<SongDocumentInterface>({
  title: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Song title must start with a capital letter');
      }
    },
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
  },
  genre: {
    type: String,
    enum: ['pop', 'rock', 'hip-hop', 'jazz', 'classical'],
  },
  year: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear(),
  },
  duration: {
    type: String,
    validate: (value: string) => {
      if (!value.match(/^\d+:\d{2}$/)) {
        throw new Error('Duration must be in the format "MM:SS"');
      }
    },
  },
});

const Song = model<SongDocumentInterface>('Song', SongSchema);

export { Song, SongDocumentInterface };