export interface AddReportDto {
  title: String;
  description: String;
  isAnonymous?: Boolean;
  company: String;
  user: String;
}

export interface CompanyReportDto {
  title: String;
  description: String;
  userDisplayName?: String;
}

export interface UserReportDto {
  title: String;
  description: String;
  companyName: String;
  companyId: String;
  reportId: String;
}
