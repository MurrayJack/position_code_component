export type xPositions = "Left" | "Right";
export type yPositions = "Top" | "Bottom";

export interface IContainer {
  Width: number;
  Height: number;
}
export interface IFixed {
  Top: number;
  Width: number;
  Height: number;
  Left: number;
}
export interface IDynamic {
  Width: number;
  Height: number;
}
export interface IResult {
  Top: number;
  Left: number;
  OriginalLeft: number;
  OriginalTop: number;
}

export interface IResponseEvent {
  CanSwap: boolean;
  HasSwappedX: boolean;
  HasSwappedY: boolean;
}

export const positionFix = (
  tryXPosition: xPositions,
  tryYPosition: yPositions,
  changePosition: boolean,
  container: IContainer,
  fixed: IFixed,
  dynamic: IDynamic,
  response: (e: IResponseEvent) => void
): IResult => {
  let Left = 0;
  let Top = 0;

  const OriginalLeft = calcXAxis(tryXPosition, fixed, dynamic);
  const OriginalTop = calcYAxis(tryYPosition, fixed, dynamic);

  if (changePosition) {
    const tryX = tryXAxis(tryXPosition, fixed, dynamic, container);

    Left = tryX !== -1 ? tryX : OriginalLeft;
    Top = tryYAxis(tryYPosition, fixed, dynamic);
  } else {
    Left = OriginalLeft;
    Top = OriginalTop;
  }

  response({
    CanSwap: changePosition,
    HasSwappedX: OriginalLeft !== Left,
    HasSwappedY: OriginalTop !== Top
  });

  return {
    Left,
    OriginalLeft,
    Top,
    OriginalTop
  };
};

const calcXAxis = (tryXPosition: xPositions, fixed: IFixed, dynamic: IDynamic): number => {
  // so left is either 0;
  if (tryXPosition === "Left") {
    return 0;
  } else {
    return -dynamic.Width + fixed.Width;
  }
};

const tryXAxis = (tryXPosition: xPositions, fixed: IFixed, dynamic: IDynamic, container: IContainer): number => {
  if (tryXPosition === "Left") {
    if (fixed.Left + dynamic.Width >= container.Width) {
      return calcXAxis("Right", fixed, dynamic);
    }
  } else {
    if (fixed.Left - dynamic.Width <= 0) {
      return calcXAxis("Left", fixed, dynamic);
    }
  }

  return -1;
};

const calcYAxis = (tryYPosition: yPositions, fixed: IFixed, dynamic: IDynamic): number => {
  if (tryYPosition === "Bottom") {
    return fixed.Height;
  } else {
    return -dynamic.Height;
  }
};

const tryYAxis = (tryYPosition: yPositions, fixed: IFixed, dynamic: IDynamic): number => {
  return 20;
};
