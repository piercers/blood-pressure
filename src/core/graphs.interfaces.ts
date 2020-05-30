// TODO Determine if these "aliases" are needed when ChartJS provides them
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
