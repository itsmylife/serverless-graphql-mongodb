import mongoose from "mongoose";

export interface INote extends mongoose.Document {
  title: string;
  content: string;
  data: Date;
}

const schema: mongoose.SchemaDefinition = {
  title: { type: mongoose.SchemaTypes.String, required: true },
  content: { type: mongoose.SchemaTypes.String, required: true },
  date: { type: mongoose.SchemaTypes.Date, required: true }
};

const collectionName: string = "note";
const noteSchema: mongoose.Schema = new mongoose.Schema(schema);

export const NoteModel = (conn: mongoose.Connection): mongoose.Model<INote> =>
  conn.model(collectionName, noteSchema);
