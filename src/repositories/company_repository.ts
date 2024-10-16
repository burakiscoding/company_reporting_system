import { Company, ICompany } from "../models/company";

export async function addNewCompany(
  name: String,
  description: String
): Promise<ICompany> {
  const newCompany = new Company({ name, description });
  const savedCompany = await newCompany.save();

  return savedCompany;
}

export async function getCompanies(): Promise<ICompany[]> {
  const companies = await Company.find();

  return companies;
}

export async function getSingleCompany(id: String): Promise<ICompany> {
  const company = await Company.findById(id);
  if (!company) throw new Error("not found company");

  return company;
}

export async function updateCompany(
  id: String,
  name?: String,
  description?: String
): Promise<ICompany> {
  const company = await Company.findById(id);
  if (!company) throw new Error("not found company");

  if (name) company.name = name;
  if (description) company.description = description;

  await company.save();

  return company;
}

export async function deleteCompany(id: String): Promise<ICompany> {
  const company = await Company.findByIdAndDelete(id);
  if (!company) throw new Error("not found company");

  return company;
}
