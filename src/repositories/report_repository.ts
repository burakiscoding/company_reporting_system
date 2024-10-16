import { AddReportDto } from "../dtos/report_dtos";
import { Report, IReport } from "../models/report";

export async function addNewReport(reportDto: AddReportDto): Promise<IReport> {
  const { title, description, isAnonymous, company, user } = reportDto;
  const newReport = new Report({
    title,
    description,
    isAnonymous,
    company,
    user,
  });
  const savedReport = await newReport.save();

  return savedReport;
}

export async function getReports(): Promise<IReport[]> {
  const reports = await Report.find()
    .populate("company")
    .populate("user")
    .exec();

  return reports;
}

export async function getReportsByCompanyId(id: String): Promise<IReport[]> {
  const reports = await Report.find({ company: id }).populate("user").exec();

  return reports;
}

export async function getReportsByUserId(id: String): Promise<IReport[]> {
  const reports = await Report.find({ user: id }).populate("company").exec();

  return reports;
}

export async function updateReport(
  id: String,
  userId: String,
  title?: String,
  description?: String
): Promise<IReport> {
  const report = await Report.findById(id);
  if (!report || report.user._id !== userId) {
    throw new Error("report not found");
  }

  if (title) report.title = title;
  if (description) report.description = description;

  return report;
}

export async function deleteReport(id: String, userId: String) {
  const report = await Report.findById(id);
  if (!report || report.user._id != userId) {
    throw new Error("report not found");
  }

  await report.deleteOne();
}
