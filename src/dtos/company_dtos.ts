export interface AddCompanyDto {
  name: String;
  description: String;
}

export interface UpdateCompanyDto {
  name?: String;
  description?: String;
}
