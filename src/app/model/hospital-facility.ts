export interface RowHospitalFacility{
  id: number;
  name: string;
  street: string;
  municipality: string;
  date_added: string;
  last_update: string;
}
export interface RowResponseHospitalFacility{
  count: number;
  next: string|null;
  previous: string|null;
  results: Array<RowHospitalFacility>;
}




export interface HospitalFacility{
  id: number;
  name: string;
  street: string;
  municipality: string;
  date_added: Date;
  last_update: Date;
}
export interface ResponseHospitalFacility{
  count: number;
  next: boolean;
  previous: boolean;
  results: Array<HospitalFacility>;
}
