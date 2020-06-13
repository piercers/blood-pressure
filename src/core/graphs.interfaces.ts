import { ChartPoint } from "chart.js";

/**
 * Configuration and data for a single dataset to be plotted on a ChartJS instance
 */
interface DataSet {
  backgroundColor: string;
  borderColor: string;
  data: ChartPoint[];
  fill?: boolean;
  label: string;
}

/**
 * All datasets for a single ChartJS instance
 */
export interface DataConfig {
  dataSets: DataSet[];
  labels: string[];
}
