import * as React from "react";
import { render } from "react-dom";
import { PositionR } from "./PositionR";
import { xPositions, yPositions, IResponseEvent } from "./PositionHelper";
import { Box } from "./Helpers/Box";

import "./styles.css";

export interface IAppState {
  TryXPosition: xPositions;
  TryYPosition: yPositions;
  SwapPosition: boolean;
  MoveXAxis: number;
  MoveYAxis: number;

  FirstBoxSize: number;
  SecondBoxSize: number;
  GridHeight: number;
  GridWidth: number;
}

class App extends React.Component<{}, IAppState> {
  container: HTMLElement;

  public state: IAppState = {
    TryXPosition: "Left",
    TryYPosition: "Bottom",
    SwapPosition: false,
    MoveXAxis: 0,
    MoveYAxis: 0,

    FirstBoxSize: 20,
    SecondBoxSize: 200,
    GridHeight: 500,
    GridWidth: 500
  };

  componentWillMount() {
    const saved = JSON.parse(localStorage.getItem("info"));
    if (saved) {
      this.setState({ ...saved });
    }
  }

  render() {
    return (
      <div className="grid">
        <form>
          <ul>
            <li>
              <label>Try X:</label>
              <select onChange={this.handleXChange} value={this.state.TryXPosition}>
                <option value="Left">Left</option>
                <option value="Right">Right</option>
              </select>
            </li>
            <li>
              <label>Try Y:</label>
              <select onChange={this.handleYChange} value={this.state.TryYPosition}>
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
              </select>
            </li>
            <li>
              <label>Swap Position</label>
              <input onChange={this.handleSwapPosition} type="checkbox" checked={this.state.SwapPosition} />
            </li>
            <li>
              <label>Move X Axis</label>
              <input onChange={this.handleXMove} type="range" min={0} max={480} value={this.state.MoveXAxis} />
            </li>
            <li>
              <label>Move Y Axis</label>
              <input onChange={this.handleYMove} type="range" min={0} max={480} value={this.state.MoveYAxis} />
            </li>
          </ul>

          <ul>
            <li>
              <label>Grid Size</label>
              <input type="text" placeholder="Width (px)" value={this.state.GridWidth} />
              <input type="text" placeholder="Height (px)" value={this.state.GridHeight} />
            </li>
            <li>
              <label>Box Size 1</label>
              <input onChange={this.handleBoxSize1Change} type="text" placeholder="Size (px)" value={this.state.FirstBoxSize} />
            </li>
            <li>
              <label>Box Size 2</label>
              <input type="text" placeholder="Size (px)" value={this.state.SecondBoxSize} />
            </li>
          </ul>
        </form>
        <div id="TesterID" className="container">
          <div style={{ marginTop: `${this.state.MoveYAxis}px`, marginLeft: `${this.state.MoveXAxis}px` }}>
            <PositionR
              Result={this.handleResult}
              ContainerID="TesterID"
              TryXPosition={this.state.TryXPosition}
              TryYPosition={this.state.TryYPosition}
              SwapPosition={this.state.SwapPosition}
              Fixed={() => <Box Size={this.state.FirstBoxSize} Color="#2980b9" />}
              Dynamic={() => <Box Size={this.state.SecondBoxSize} Color="#d35400" />}
            />
          </div>
        </div>
      </div>
    );
  }

  handleResult = (e: IResponseEvent) => {
    console.log(e);
  };

  handleBoxSize1Change = e => {
    this.setState({ FirstBoxSize: e.target.value as any }, this.saveState);
  };

  handleXMove = e => {
    this.setState({ MoveXAxis: e.target.value as any }, this.saveState);
  };

  handleYMove = e => {
    this.setState({ MoveYAxis: e.target.value as any }, this.saveState);
  };

  handleXChange = e => {
    this.setState({ TryXPosition: e.target.value as any }, this.saveState);
  };

  handleYChange = e => {
    this.setState({ TryYPosition: e.target.value as any }, this.saveState);
  };

  handleSwapPosition = e => {
    this.setState({ SwapPosition: e.target.checked as any }, this.saveState);
  };

  saveState = () => {
    localStorage.setItem("info", JSON.stringify(this.state));
  };
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
