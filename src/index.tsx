import * as React from "react";
import { render } from "react-dom";
import { PositionR } from "./PositionR";
import { xPositions, yPositions, IResponseEvent } from "./PositionHelper";

import "./styles.css";

export interface IAppState {
  TryXPosition: xPositions;
  TryYPosition: yPositions;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    TryXPosition: "Left",
    TryYPosition: "Bottom"
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
                <label>Try Change</label>
                <input type="checkbox" />
              </li>
            </ul>
          </form>
        </div>
        <div style={{ marginTop: "250px" }}>
          <PositionR
            Result={this.handleResult}
            TryXPosition={this.state.TryXPosition}
            TryYPosition={this.state.TryYPosition}
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

  handleXChange = e => {
    this.setState({ TryXPosition: e.target.value as any });
    this.saveState();
  };

  handleYChange = e => {
    this.setState({ TryYPosition: e.target.value as any });
    this.saveState();
  };

  saveState = () => {
    localStorage.setItem("info", JSON.stringify(this.state));
  };
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
