export interface RowDocumentFile{
  id: number;
  user: number;
  file: string;
  date_added: string;
}
export interface RowPageDocumentFile{
  count: number;
  next: string;
  previous: string;
  results: Array<RowDocumentFile>
}
