interface DataSet {
  backgroundColor: string;
  borderColor: string;
  data: number[];
  fill?: boolean;
  label: string;
}

export interface DataConfig {
  dataSets: DataSet[];
  labels: string[];
}
