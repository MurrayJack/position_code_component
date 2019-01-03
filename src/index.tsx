import * as React from "react";
import { render } from "react-dom";
import { PositionR } from "./PositionR";
import { xPositions, yPositions, IResponseEvent } from "./PositionHelper";

import "./styles.css";

export interface IAppState {
  TryXPosition: xPositions;
  TryYPosition: yPositions;
  SwapPosition: boolean;
  MoveXAxis: number;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    TryXPosition: "Left",
    TryYPosition: "Bottom",
    SwapPosition: false,
    MoveXAxis: 0
  };

  componentWillMount() {
    const saved = JSON.parse(localStorage.getItem("info"));
    if (saved) {
      this.setState({ ...saved });
    }
  }

  render() {
    return (
      <div>
        <div>
          <form>
            <ul>
              <li>
                <label>Try X:</label>
                <select onChange={this.handleXChange}>
                  <option value="Left">Left</option>
                  <option value="Right">Right</option>
                </select>
              </li>
              <li>
                <label>Try Y:</label>
                <select onChange={this.handleYChange}>
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
                <input onChange={this.handleXMove} type="range" min={0} max={100} value={this.state.MoveXAxis} />
              </li>
            </ul>
          </form>
        </div>
        <div style={{ marginTop: "250px", marginLeft: `${this.state.MoveXAxis}%` }}>
          <PositionR
            Result={this.handleResult}
            TryXPosition={this.state.TryXPosition}
            TryYPosition={this.state.TryYPosition}
            SwapPosition={this.state.SwapPosition}
            Fixed={() => <div className="fixed" />}
            Dynamic={() => <div className="dynamic" />}
          />
        </div>
      </div>
    );
  }

  handleResult = (e: IResponseEvent) => {
    console.log(e);
  };

  handleXMove = e => {
    this.setState({ MoveXAxis: e.target.value as any });
  };

  handleXChange = e => {
    this.setState({ TryXPosition: e.target.value as any });
    this.saveState();
  };

  handleYChange = e => {
    this.setState({ TryYPosition: e.target.value as any });
    this.saveState();
  };

  handleSwapPosition = e => {
    this.setState({ SwapPosition: e.target.checked as any });
    this.saveState();
  };

  saveState = () => {
    localStorage.setItem("info", JSON.stringify(this.state));
  };
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
