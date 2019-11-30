import mongoose from "mongoose";
import dayjs from "dayjs";
import { INote, NoteModel } from "../../database/models/note";
import { ApolloError } from "apollo-server-micro";

type DbConn = {
  dbConn: mongoose.Connection;
};

type NoteId = {
  _id: INote["_id"];
};

type SaveNote = {
  title: INote["title"];
  content: INote["content"];
};

export default {
  Query: {
    getAllNotes: async (parent, args, { dbConn }: DbConn): Promise<INote[]> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      // const list: INote[] = [];

      try {
        return (await Note.find().exec()) || [];
      } catch (error) {
        this.logError("getAllNotes", error);
      }
    },

    getNote: async (
      parent,
      { _id }: NoteId,
      { dbConn }: DbConn
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        return await Note.findById(_id);
      } catch (error) {
        this.logError("getNote", error);
      }
    }
  },

  Mutation: {
    saveNote: async (
      parent,
      { title, content }: SaveNote,
      { dbConn }: DbConn
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        return await Note.create({
          title,
          content,
          date: dayjs().toDate()
        });
      } catch (error) {
        this.logError("saveNote", error);
      }
    },

    deleteNote: async (
      parent,
      { _id }: NoteId,
      { dbConn }: DbConn
    ): Promise<INote> => {
      const Note: mongoose.Model<INote> = NoteModel(dbConn);

      try {
        return await Note.findByIdAndDelete(_id);
      } catch (error) {
        logError("deleteNote", error);
      }
    }
  }
};

const logError = (method: string, error: any) => {
  console.error(`> ${method} error: ${error}`);
  throw new ApolloError(`Error while running ${method}`);
};
