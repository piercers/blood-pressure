import { ChartPoint } from "chart.js";

interface DataSet {
  backgroundColor: string;
  borderColor: string;
  data: ChartPoint[];
  fill?: boolean;
  label: string;
}

export interface DataConfig {
  dataSets: DataSet[];
  labels: string[];
}
