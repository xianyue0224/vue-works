import type { Grid } from './types';
import { nanoid } from 'nanoid';

export function gridsMeta(): Grid[] {
  const meta: Pick<Grid, 'label'>[] = [
    { label: '' },
    { label: '周一' },
    { label: '周二' },
    { label: '周三' },
    { label: '一月' },
    { label: '二月' },
    { label: '三月' },
    { label: '四月' },
    { label: '周四' },
    { label: '周五' },
    { label: '周六' },
    { label: '周日' },
    { label: '五月' },
    { label: '六月' },
    { label: '七月' },
    { label: '八月' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '4' },
    { label: '九月' },
    { label: '十月' },
    { label: '十一月' },
    { label: '十二月' },
  ];

  for (let i = 5; i <= 31; i++) {
    meta.push({ label: String(i) });
  }

  return [...meta].map(item => {
    //@ts-expect-error
    item.id = nanoid();
    //@ts-expect-error
    item.placeable = true;
    //@ts-expect-error
    item.hover = false;
    //@ts-expect-error
    item.toPlace = false;
    return item;
  }) as Grid[];
}
