import React, { Component } from "react";
import ReactDOM from "react-dom";
import { positionFix, xPositions, yPositions, IResponseEvent } from "./PositionHelper";

export interface IPositionRProps {
  TryXPosition: xPositions;
  TryYPosition: yPositions;
  SwapPosition: boolean;

  ContainerID: string;
  Fixed: () => JSX.Element;
  Dynamic: () => JSX.Element;

  Result: (e: IResponseEvent) => void;
}

export class PositionR extends Component<IPositionRProps> {
  private button: any;
  private drop: any;

  componentDidMount() {
    this.setPosition();
  }

  componentDidUpdate() {
    this.setPosition();
  }

  render() {
    return (
      <div style={{ position: "relative" }}>
        <div style={{ display: "inline", lineHeight: 0 }} ref={e => (this.button = e)}>
          {this.props.Fixed()}
        </div>
        <div style={{ boxSizing: "border-box", lineHeight: 0, position: "absolute" }} ref={e => (this.drop = e)}>
          {this.props.Dynamic()}
        </div>
      </div>
    );
  }

  setPosition() {
    const fixed = this.button.getBoundingClientRect();
    const dynamic = this.drop.getBoundingClientRect();
    const container = document.getElementById(this.props.ContainerID).getBoundingClientRect();

    const style = positionFix(
      this.props.TryXPosition,
      this.props.TryYPosition,
      this.props.SwapPosition,
      {
        Width: container.width,
        Height: container.height,
        Left: container.left,
        Top: container.top
      },
      {
        Top: fixed.top,
        Left: fixed.left,
        Width: fixed.width,
        Height: fixed.height
      },
      {
        Width: dynamic.width,
        Height: dynamic.height
      },
      this.props.Result
    );

    this.drop.style.top = style.Top + "px";
    this.drop.style.left = style.Left + "px";
  }
}
