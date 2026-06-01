export interface QuantityRowSentence{
  quantity_rows: number;
  sentence: string;
}
export interface ChartDoughnutHomeSentence{
  accuracy: number;
  response_time_ms: number;
  sentences: Array<QuantityRowSentence>;
  total_rows: number;
}
