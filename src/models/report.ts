import mongoose from "mongoose";
import { ICompany } from "./company";
import { IUser } from "./user";
const { Schema } = mongoose;

export interface IReport {
  _id: String;
  title: String;
  description: String;
  isAnonymous: Boolean;
  company: ICompany;
  user: IUser;
}

const reportSchema = new Schema<IReport>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Report = mongoose.model<IReport>("Report", reportSchema);
