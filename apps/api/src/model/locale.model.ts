import { Schema } from "mongoose";

export const LocaleMemberSchema = new Schema({
  locale: String,
  value: String,
});
