export interface Grid {
  id: string;
  label: string;
  placeable: boolean;
  hover: boolean;
  toPlace: boolean; // 代表当前拿在手中的拼图块是否将这个格子作为落点
  block_id?: string;
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
  forms: Form[];
  currentForm: number;
  color: string;
}
