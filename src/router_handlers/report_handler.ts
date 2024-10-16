import { Request, Response } from "express-serve-static-core";
import {
  AddReportDto,
  CompanyReportDto,
  UserReportDto,
} from "../dtos/report_dtos";
import {
  addNewReport,
  deleteReport,
  getReports,
  getReportsByCompanyId,
  getReportsByUserId,
} from "../repositories/report_repository";
import { IReport } from "../models/report";

export async function addNewReportHandler(
  req: Request<{}, {}, AddReportDto>,
  res: Response
) {
  try {
    const userId = req.decodedToken?.id;
    if (!userId) return res.sendStatus(401);

    req.body.user = userId;
    const report = await addNewReport(req.body);
    return res.send(report);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getReportsHandler(req: Request, res: Response) {
  try {
    const reports = await getReports();
    return res.send(reports);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getReportsByCompanyIdHandler(
  req: Request,
  res: Response
) {
  const { id } = req.params;
  try {
    const reports = await getReportsByCompanyId(id);
    const mappedReports = reports.map(mapReportToCompanyReport);

    return res.send(mappedReports);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function getReportsByUserIdHandler(req: Request, res: Response) {
  const userId = req.decodedToken?.id;
  if (!userId) return res.sendStatus(401);

  try {
    const reports = await getReportsByUserId(userId);
    const mappedReports = reports.map(mapReportToUserReport);

    return res.send(mappedReports);
  } catch (error) {
    return res.sendStatus(400);
  }
}

export async function deleteReportHandler(req: Request, res: Response) {
  const userId = req.decodedToken?.id;
  const id = req.params.id;
  if (!userId) return res.sendStatus(401);

  try {
    await deleteReport(id, userId);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(400);
  }
}

function mapReportToCompanyReport(report: IReport): CompanyReportDto {
  return {
    title: report.title,
    description: report.description,
    userDisplayName: report.isAnonymous ? undefined : report.user.displayName,
  };
}

function mapReportToUserReport(report: IReport): UserReportDto {
  return {
    title: report.title,
    description: report.description,
    companyName: report.company.name,
    companyId: report.company._id,
    reportId: report._id,
  };
}
