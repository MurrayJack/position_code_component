import React from "react";

export interface IBoxProps {
  Size: number;
  Color: string;
}

export const Box: React.FunctionComponent<IBoxProps> = ({ Size, Color }: IBoxProps) => {
  return <div style={{ height: `${Size}px`, width: `${Size}px`, backgroundColor: Color }} />;
};
