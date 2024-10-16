import mongoose from "mongoose";
const { Schema } = mongoose;

export interface ICompany {
  _id: String;
  name: String;
  description: String;
  numberOfReports: Number;
}

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  numberOfReports: {
    type: Number,
    default: 0,
  },
});

export const Company = mongoose.model<ICompany>("Company", companySchema);
