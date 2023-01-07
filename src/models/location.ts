import { model, Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  city: string;
  lat: number;
  lon: number;
  creationDate: Date;
  updateData: Date;
}

const locationSchema = new Schema({
  city: { type: String, required: true, lowercase: true },
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  updateDate: { type: Date, default: Date.now },
  creationDate: { type: Date, default: Date.now },
});

export default model<ILocation>('Location', locationSchema);
