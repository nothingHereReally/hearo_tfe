export interface TableColumnString{
  name: string;
  data: Array<string>;
  type: "string";
}




export interface TableColumnAccuracy{
  name: string;
  accuracyType: "goodHigh" | "goodLow";
  data: Array<number>;
  type: "accuracy";
}




export interface TableColumnStatusPatientVideo{
  name: string;
  data: Array<"Pending" | "In Progress" | "Done">;
  type: "statusPatientVideo";
}




interface URLDetails{
  link: string;
  label: string;
  colorButton: "red" | "blue";
}
export interface TableColumnURLLink{
  name: string;
  data: Array<URLDetails>;
  type: "urlLink";
}
