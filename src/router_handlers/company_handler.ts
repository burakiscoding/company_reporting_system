import { Request, Response } from "express-serve-static-core";
import { AddCompanyDto, UpdateCompanyDto } from "../dtos/company_dtos";
import {
  addNewCompany,
  deleteCompany,
  getCompanies,
  getSingleCompany,
  updateCompany,
} from "../repositories/company_repository";

export async function addNewCompanyHandler(
  req: Request<{}, {}, AddCompanyDto>,
  res: Response
) {
  const { name, description } = req.body;

  try {
    const company = await addNewCompany(name, description);
    return res.status(200).send(company);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function updateCompanyHandler(
  req: Request<{ id: String }, {}, UpdateCompanyDto>,
  res: Response
) {
  const { name, description } = req.body;
  const { id } = req.params;

  try {
    const company = await updateCompany(id, name, description);
    return res.status(200).send(company);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getSingleCompanyHandler(
  req: Request<{ id: String }>,
  res: Response
) {
  const { id } = req.params;

  try {
    const company = await getSingleCompany(id);
    return res.status(200).send(company);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getCompaniesHandler(req: Request, res: Response) {
  try {
    const companies = await getCompanies();
    const userId = req.decodedToken?.id;
    console.log(userId);
    
    return res.status(200).send(companies);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function deleteCompanyHandler(
  req: Request<{ id: String }>,
  res: Response
) {
  const { id } = req.params;

  try {
    const company = await deleteCompany(id);
    return res.status(200).send(company);
  } catch (error) {
    return res.sendStatus(400);
  }
}
