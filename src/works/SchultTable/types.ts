export interface Grid {
  id: string;
  num: string;
  target: boolean;
  clicked: boolean;
}

export interface HistoryItem {
  id: string;
  level: number;
  start_time: Date;
  end_time: Date;
  total_time: number;
}
