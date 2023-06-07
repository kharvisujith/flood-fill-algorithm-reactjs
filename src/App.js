import "./App.css";
import { useState } from "react";

const availableColors = {
  0: "#FF0000",
  1: "#FF9900",
  2: "#FFFF00",
  3: "#00FF00",
  4: "#00FFFF",
  5: "#4A86E8",
  6: "#0000FF",
  7: "#9900FF",
  8: "#FF00FF",
  9: "#A64D79",
};

let intialGrid = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1, 1, 1, 1, 8, 8],
  [0, 0, 0, 0, 1, 1, 1, 1, 8, 8],
  [0, 0, 0, 0, 1, 1, 1, 1, 8, 8],
  [3, 0, 0, 4, 4, 4, 4, 4, 8, 8],
  [3, 0, 0, 4, 4, 4, 4, 4, 8, 8],
  [3, 0, 0, 4, 4, 4, 4, 4, 8, 8],
  [3, 0, 0, 4, 4, 4, 4, 4, 8, 8],
  [3, 3, 3, 3, 3, 7, 7, 7, 7, 7],
  [3, 3, 3, 3, 3, 7, 7, 7, 7, 7],
];

function App() {
  const [newColor, setNewColor] = useState("");
  const [grid, setGrid] = useState(intialGrid);

  const fill = (row, col, targetColor, newColor) => {
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return;
    }

    if (
      availableColors[grid[row][col]] !== targetColor ||
      availableColors[grid[row][col]] === newColor
    ) {
      return;
    }
    const newGrid = [...grid];
    const value = parseInt(
      Object.keys(availableColors).find(
        (key) => availableColors[key] === newColor
      )
    );
    newGrid[row][col] = value;

    setGrid(newGrid);

    fill(row - 1, col, targetColor, newColor);
    fill(row + 1, col, targetColor, newColor);
    fill(row, col - 1, targetColor, newColor);
    fill(row, col + 1, targetColor, newColor);
    fill(row - 1, col - 1, targetColor, newColor);
    fill(row - 1, col + 1, targetColor, newColor);
    fill(row + 1, col - 1, targetColor, newColor);
    fill(row + 1, col + 1, targetColor, newColor);
  };

  const handleFill = (row, col) => {
    if (!newColor) {
      alert("Please select new color");
      return;
    }
    const targetColor = availableColors[grid[row][col]];
    fill(row, col, targetColor, newColor);
  };

  const getColor = (key) => {
    return availableColors[key];
  };

  const handleSelectNewColor = (color) => {
    setNewColor(color);
  };

  return (
    <>
      <div className="main-container">
        <div>
          <div className="header-container">
            <h3>Select Color</h3>
            <div className="select-colors-container">
              {Object.values(availableColors).map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                  }}
                  className="select-colors-container-cell"
                  onClick={() => handleSelectNewColor(color)}
                ></div>
              ))}
            </div>
            <h4>{`Selected Color : ${newColor}`}</h4>
          </div>
          <div className="fill-grid-container">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="fill-grid-row-container">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    style={{
                      backgroundColor: getColor(cell),
                    }}
                    className="fill-grid-cell"
                    onClick={() => handleFill(rowIndex, colIndex)}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
