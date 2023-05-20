export interface Grid {
  id: string;
  label: string;
  placeable: boolean;
  hover: boolean;
  toPlace: boolean;
}

export interface Form {
  size: {
    rows: number;
    cols: number;
  };
  layout: { id: string; state: 0 | 1 }[];
}

export interface Block {
  id: string;
  states: 1 | 2 | 3; // 1 在左边盘里备用 2 正拿在手上 3 已被放置在右边盘里
  grids?: number[]; // 如果已被放置在右边盘里，需要把占用的格子的索引放在这个数组里
  forms: Form[];
  currentForm: number;
  color: string;
}
