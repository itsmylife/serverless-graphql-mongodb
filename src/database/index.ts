import mongoose from "mongoose";

const uri: string = process.env.DB_PATH;

let conn: mongoose.Connection = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if (conn === null) {
    conn = await mongoose.createConnection(uri, {
      bufferCommands: false, // disable mongoose buffering
      bufferMaxEntries: 0, // and mongodb driver buffering
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }

  return conn;
};
