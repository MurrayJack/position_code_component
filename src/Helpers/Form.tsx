import React from "react";

export interface IFormProps {}

export const Form: React.FunctionComponent<IFormProps> = () => {
  return (
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
  );
};
