export function getOverlapPercentage(
  element: HTMLElement,
  targetElement: HTMLElement
) {
  const elementRect = element.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();

  const intersectionRect = getIntersectionRect(elementRect, targetRect);

  const intersectionArea = intersectionRect.width * intersectionRect.height;
  const targetArea = targetRect.width * targetRect.height;

  const overlapPercentage = (intersectionArea / targetArea) * 100;

  return overlapPercentage;
}

function getIntersectionRect(rect1: DOMRect, rect2: DOMRect) {
  const left = Math.max(rect1.left, rect2.left);
  const top = Math.max(rect1.top, rect2.top);
  const right = Math.min(rect1.right, rect2.right);
  const bottom = Math.min(rect1.bottom, rect2.bottom);

  if (left < right && top < bottom) {
    return {
      left: left,
      top: top,
      right: right,
      bottom: bottom,
      width: right - left,
      height: bottom - top,
    };
  }

  return {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  };
}

// 一些实用方法，用于将一个一维数组视作二维数组去操作

function floor(value: number) {
  return Math.floor(value);
}

// 将一维数组转换为二维数组
export function convertTo2DArray<T>(
  arr: T[],
  rows: number,
  cols: number
): T[][] {
  if (arr.length !== rows * cols) {
    throw new Error(
      'The length of the array does not match the specified number of rows and columns.'
    );
  }

  const result: T[][] = [];
  for (let i = 0; i < rows; i++) {
    result.push(arr.slice(i * cols, (i + 1) * cols));
  }

  return result;
}

// 将一维数组的索引值转换为二维数组的坐标的函数
export function convertIndexToCoordinates(
  index: number,
  rows: number,
  cols: number
): [number, number] {
  if (index < 0 || index >= rows * cols) {
    throw new Error('Index is out of range.');
  }

  const row = Math.floor(index / cols);
  const col = index % cols;

  return [row, col];
}

// 以某个元素为中心，截取周围5*5范围内的元素
export function getNeighborhood<T>(
  arr: T[],
  centerIndex: number,
  rows: number,
  cols: number
): T[] {
  const [centerRow, centerCol] = convertIndexToCoordinates(
    centerIndex,
    rows,
    cols
  );

  const minRow = Math.max(centerRow - 2, 0);
  const maxRow = Math.min(centerRow + 2, rows - 1);
  const minCol = Math.max(centerCol - 2, 0);
  const maxCol = Math.min(centerCol + 2, cols - 1);

  const neighborhood: T[] = [];
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      const index = row * cols + col;
      neighborhood.push(arr[index]);
    }
  }

  return neighborhood;
}

export function getSubArray<T>(
  arr: T[],
  rows: number,
  cols: number,
  x: number,
  y: number,
  size: [number, number]
): T[] {
  if (x > rows - 1 || y > cols - 1) return [];

  const subArray: T[] = [];

  for (let i = x; i < x + size[0]; i++) {
    for (let j = y; j < y + size[1]; j++) {
      if (i < rows && j < cols && i * cols + j < arr.length) {
        subArray.push(arr[i * cols + j]);
      } else {
        subArray.push({ _is_not_a_grid: true } as T);
      }
    }
  }

  return subArray;
}

export function getItemByXY<T>(
  arr: T[],
  rows: number,
  cols: number,
  x: number,
  y: number
) {
  if (x < 0 || x > rows - 1 || y < 0 || y > cols - 1) return;
  const idx = x * cols + y;
  if (idx > arr.length - 1) return;
  return arr[idx];
}
