import { nanoid } from 'nanoid';
import type { Block } from './types';

export const blocksMeta: Block[] = [
  {
    // 小直角块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: {
          rows: 2,
          cols: 2,
        },
        layout: [0, 1, 1, 1],
      },
      {
        size: {
          rows: 2,
          cols: 2,
        },
        layout: [1, 0, 1, 1],
      },
      {
        size: {
          rows: 2,
          cols: 2,
        },
        layout: [1, 1, 0, 1],
      },
      {
        size: {
          rows: 2,
          cols: 2,
        },
        layout: [1, 1, 1, 0],
      },
    ],
    currentForm: 0,
    color: '#00da9d',
  },
  {
    // 6字形块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 1, 1, 1, 0],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 0, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [0, 1, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 1, 0, 1, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [0, 1, 1, 1, 1, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 1, 1, 1, 0, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 1, 1, 1, 1, 0],
      },
    ],
    currentForm: 0,
    color: '#ff5a3c',
  },
  {
    // 长L型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 4 },
        layout: [0, 0, 0, 1, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 4 },
        layout: [1, 0, 0, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 4 },
        layout: [1, 1, 1, 1, 1, 0, 0, 0],
      },
      {
        size: { rows: 2, cols: 4 },
        layout: [1, 1, 1, 1, 0, 0, 0, 1],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [1, 0, 1, 0, 1, 0, 1, 1],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [0, 1, 0, 1, 0, 1, 1, 1],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [1, 1, 1, 0, 1, 0, 1, 0],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [1, 1, 0, 1, 0, 1, 0, 1],
      },
    ],
    currentForm: 0,
    color: '#2b67f5',
  },
  {
    // 正方形块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 2 },
        layout: [1, 1, 1, 1],
      },
    ],
    currentForm: 0,
    color: '#76fcfc',
  },
  {
    // 短T型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 3 },
        layout: [0, 1, 0, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 1, 0, 1, 0],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 0, 1, 1, 1, 0],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [0, 1, 1, 1, 0, 1],
      },
    ],
    currentForm: 0,
    color: '#ffc952',
  },
  {
    // 大直角块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 3, cols: 3 },
        layout: [1, 1, 1, 0, 0, 1, 0, 0, 1],
      },
      {
        size: { rows: 3, cols: 3 },
        layout: [1, 1, 1, 1, 0, 0, 1, 0, 0],
      },
      {
        size: { rows: 3, cols: 3 },
        layout: [0, 0, 1, 0, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 3, cols: 3 },
        layout: [1, 0, 0, 1, 0, 0, 1, 1, 1],
      },
    ],
    currentForm: 0,
    color: '#ff54cf',
  },
  {
    // Z型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 0, 0, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [0, 1, 1, 1, 1, 0],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [0, 1, 1, 1, 1, 0],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 0, 1, 1, 0, 1],
      },
    ],
    currentForm: 0,
    color: '#c2fa92',
  },
  {
    // 凹型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 1, 1, 0, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 1, 0, 1, 1, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 1, 1, 0, 1, 1],
      },
    ],
    currentForm: 0,
    color: '#bb7ff3',
  },
  {
    // 短L型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 3 },
        layout: [0, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 0, 0, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 1, 1, 0, 0],
      },
      {
        size: { rows: 2, cols: 3 },
        layout: [1, 1, 1, 0, 0, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 1, 0, 1, 0, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 1, 1, 0, 1, 0],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [0, 1, 0, 1, 1, 1],
      },
      {
        size: { rows: 3, cols: 2 },
        layout: [1, 0, 1, 0, 1, 1],
      },
    ],
    currentForm: 0,
    color: '#fa3877',
  },
  {
    // 一型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 1, cols: 4 },
        layout: [1, 1, 1, 1],
      },
      {
        size: { rows: 4, cols: 1 },
        layout: [1, 1, 1, 1],
      },
    ],
    currentForm: 0,
    color: '#3b8686',
  },
  {
    // 长T型块
    id: nanoid(),
    states: 1,
    grids: [],
    forms: [
      {
        size: { rows: 2, cols: 4 },
        layout: [0, 0, 1, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 4 },
        layout: [0, 1, 0, 0, 1, 1, 1, 1],
      },
      {
        size: { rows: 2, cols: 4 },
        layout: [1, 1, 1, 1, 0, 1, 0, 0],
      },
      {
        size: { rows: 2, cols: 4 },
        layout: [1, 1, 1, 1, 0, 0, 1, 0],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [0, 1, 1, 1, 0, 1, 0, 1],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [1, 0, 1, 1, 1, 0, 1, 0],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [1, 0, 1, 0, 1, 1, 1, 0],
      },
      {
        size: { rows: 4, cols: 2 },
        layout: [0, 1, 0, 1, 1, 1, 0, 1],
      },
    ],
    currentForm: 0,
    color: '#eb9f9f',
  },
].map(block => {
  block.forms = block.forms.map(form => {
    //@ts-expect-error
    form.layout = form.layout.map(num => {
      return { id: nanoid(), state: num };
    });
    return form;
  });
  return block;
}) as unknown as Block[];
