import React, { useState, useEffect } from "react";
import "./Board.css";
import Cell from "./Cell";

interface ICell {
  id: number;
  shape: string;
  color: string;
  isOpen: boolean;
}

const shapes = ['circle', 'square', 'triangle']; 
const colors = ['red', 'blue', 'green']; 

const Board: React.FC = () => {
  const [cells, setCells] = useState<ICell[]>([]);
  const [openedCells, setOpenedCells] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [attempts, setAttempts] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCells = generateShuffledCells();
    console.log(shuffledCells);
    setCells(shuffledCells);
  };

  const generateShuffledCells = (): ICell[] => {
    const allCells: ICell[] = [];
    for (let i = 0; i < 8; i++) {
      const shape = shapes[i % 3];
      const color = colors[i % 3];
      const cell1: ICell = { id: i * 2, shape, color, isOpen: false };
      const cell2: ICell = { id: i * 2 + 1, shape, color, isOpen: false };
      allCells.push(cell1, cell2);
    }
    return shuffleArray(allCells);
  };

  const shuffleArray = (array: any[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleCellClick = (cellId: number) => {
    if (openedCells.length < 2 && !openedCells.includes(cellId)) {
      const updatedCells = cells.map((cell) =>
        cell.id === cellId ? { ...cell, isOpen: true } : cell
      );
      setCells(updatedCells);
      setOpenedCells((prevOpenedCells) => [...prevOpenedCells, cellId]);

      if (openedCells.length === 1) {
        const [firstCellId] = openedCells;
        const firstCell = cells.find((cell) => cell.id === firstCellId);
        const currentCell = cells.find((cell) => cell.id === cellId);

        if (
          firstCell &&
          currentCell &&
          firstCell.shape === currentCell.shape &&
          firstCell.color === currentCell.color
        ) {
          setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 1);
          setOpenedCells([]);
        } else {
          setTimeout(() => {
            const updatedCells = cells.map((cell) =>
              cell.id === firstCellId || cell.id === cellId
                ? { ...cell, isOpen: false }
                : cell
            );
            setCells(updatedCells);
            setOpenedCells([]);
          }, 1000);
        }
        setAttempts((prevAttempts) => prevAttempts + 1);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs === 8) {
      // Game completed
      alert(`Congratulations! You completed the game in ${attempts} attempts.`);
    }
  }, [matchedPairs, attempts]);

  return (
    <div className="board">
      {cells.map((cell) => (
        <Cell
          onClick={() => handleCellClick(cell.id)}
          isOpen={cell.isOpen}
          key={cell.id}
          shape={cell.shape}
          color={cell.color}
        />
      ))}
    </div>
  );
};

export default Board;
