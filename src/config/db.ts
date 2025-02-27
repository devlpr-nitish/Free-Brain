import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/freebrain")
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.log(`Error while connecting to datebase` + err);
        throw new err();
      });
  } catch (err) {
    console.log(`Error while connecting to datebase` + err);
  }
};
