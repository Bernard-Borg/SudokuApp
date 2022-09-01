import { defineStore } from "pinia";

export enum DifficultyLevel {
  EASY,
  MEDIUM,
  HARD
}

export class CellCoordinate {
  x = -1;
  y = -1;

  constructor(column_number: number, row_number: number) {
    this.x = column_number;
    this.y = row_number;
  }
}

let counter = 0;

function checkGrid(board: number[][]) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] == -1) {
        return false;
      }
    }
  }

  return true;
}

function shuffle(array: number[]) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function fillGrid(board: number[][]) {
  const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let row = 0;
  let col = 0;

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    if (board[row][col] == -1) {
      for (const value of shuffle(VALID_NUMBERS)) {
        if (!board[row].includes(value)) {
          if (![board[0][col], board[1][col], board[2][col], board[3][col], board[4][col], board[5][col], board[6][col], board[7][col], board[8][col]].includes(value)) {
            let square = [] as number[][]

            if (row < 3) {
              if (col < 3) {
                square = [0, 1, 2].map(x => board[x].slice(0, 3))
              } else if (col < 6) {
                square = [0, 1, 2].map(x => board[x].slice(3, 6))
              } else {
                square = [0, 1, 2].map(x => board[x].slice(6, 9))
              }
            } else if (row < 6) {
              if (col < 3) {
                square = [3, 4, 5].map(x => board[x].slice(0, 3))
              } else if (col < 6) {
                square = [3, 4, 5].map(x => board[x].slice(3, 6))
              } else {
                square = [3, 4, 5].map(x => board[x].slice(6, 9))
              }
            } else {
              if (col < 3) {
                square = [6, 7, 8].map(x => board[x].slice(0, 3))
              } else if (col < 6) {
                square = [6, 7, 8].map(x => board[x].slice(3, 6))
              } else {
                square = [6, 7, 8].map(x => board[x].slice(6, 9))
              }
            }

            if (!square.flat().includes(value)) {
              board[row][col] = value;

              if (checkGrid(board)) {
                return true;
              } else {
                if (fillGrid(board)) {
                  return true;
                }
              }
            }
          }
        }
      }

      break;
    }
  }

  board[row][col] = -1;
}

function solveGrid(board: number[][]) {
  let row = 0;
  let col = 0;

  for (let i = 0; i < 81; i++) {
    row = Math.floor(i / 9);
    col = i % 9;

    if (board[row][col] == -1) {
      for (let value = 1; value < 10; value++) {
        if (!board[row].includes(value)) {
          if (![board[0][col], board[1][col], board[2][col], board[3][col], board[4][col], board[5][col], board[6][col], board[7][col], board[8][col]].includes(value)) {
            let square = [] as number[][]

            if (row < 3) {
              if (col < 3) {
                square = [0, 1, 2].map(x => board[x].slice(0, 3))
              } else if (col < 6) {
                square = [0, 1, 2].map(x => board[x].slice(3, 6))
              } else {
                square = [0, 1, 2].map(x => board[x].slice(6, 9))
              }
            } else if (row < 6) {
              if (col < 3) {
                square = [3, 4, 5].map(x => board[x].slice(0, 3))
              } else if (col < 6) {
                square = [3, 4, 5].map(x => board[x].slice(3, 6))
              } else {
                square = [3, 4, 5].map(x => board[x].slice(6, 9))
              }
            } else {
              if (col < 3) {
                square = [6, 7, 8].map(x => board[x].slice(0, 3))
              } else if (col < 6) {
                square = [6, 7, 8].map(x => board[x].slice(3, 6))
              } else {
                square = [6, 7, 8].map(x => board[x].slice(6, 9))
              }
            }

            if (!square.flat().includes(value)) {
              board[row][col] = value;

              if (checkGrid(board)) {
                counter += 1;
                break;
              } else {
                if (solveGrid(board)) {
                  return true;
                }
              }
            }
          }
        }
      }

      break;
    }
  }

  board[row][col] = -1;
}

const defaultState = {
  board: new Array<Array<number>>(9).fill([]).map(() => Array(9).fill(-1)) as Array<Array<number>>,
  generatedBoard: new Array<Array<boolean>>(9).fill([]).map(() => Array(9).fill(false)) as Array<Array<boolean>>,
  currentClickCell: new CellCoordinate(-1, -1),
  boardBorder: "4px solid black"
}

export const useGameStore = defineStore({
  id: "GameStore",
  state: () => ({
    board: structuredClone(defaultState.board) as number[][],
    generatedBoard: new Array<Array<boolean>>(9).fill([]).map(() => Array(9).fill(false)) as Array<Array<boolean>>,
    currentClickCell: structuredClone(defaultState.currentClickCell) as CellCoordinate,
    boardBorder: defaultState.boardBorder,
    solvedBoard: structuredClone(defaultState.board) as number[][],
  }),
  getters: {
    getBoard: (state) => state.board,
    getSolvedBoard: (state) => state.solvedBoard,
    getBoardHeight: (state) => state.board.length,
    getBoardWidth: (state) => state.board[0].length,
    getBoardCell: (state) => (x: number, y: number) => state.board[y][x],
    getCurrentClickedCell: (state) => [state.currentClickCell.x, state.currentClickCell.y],
    getBoardBorder: (state) => state.boardBorder,
    cellColor: (state) => (x: number, y: number) => !state.generatedBoard[y][x] ? "lightgray" : state.currentClickCell.x == x && state.currentClickCell.y == y ? "#ddffdd" : "white",
    cellEnabled: (state) => (x: number, y: number, board: boolean[][] = state.generatedBoard) => x != -1 && y != -1 ? board[y][x] : false
  },
  actions: {
    changeBoardValue(newValue: number) {
      if (this.currentClickCell.x != -1 && this.currentClickCell.y != -1) {
        this.board[this.currentClickCell.y][this.currentClickCell.x] = newValue;

        this.$patch({
          board: this.board,
        });
      }
    },
    changeBoardBorder(newBorder: string) {
      this.$patch({
        boardBorder: newBorder
      })
    },
    moveClickedCellUp() {
      const currentX = this.currentClickCell.x;
      let currentY = this.currentClickCell.y;

      if (currentY == 0) {
        currentY = 8;
      } else {
        currentY--;
      }

      this.focusCell(currentX, currentY);
    },
    moveClickedCellLeft() {
      let currentX = this.currentClickCell.x;
      let currentY = this.currentClickCell.y;

      if (currentX == 0) {
        currentX = 8;

        if (currentY == 0) {
          currentY = 8;
        } else {
          currentY--;
        }
      } else {
        currentX--;
      }

      this.focusCell(currentX, currentY);
    },
    moveClickedCellDown() {
      const currentX = this.currentClickCell.x;
      let currentY = this.currentClickCell.y;

      if (currentY == 8) {
        currentY = 0;
      } else {
        currentY++;
      }

      this.focusCell(currentX, currentY);
    },
    moveClickedCellRight() {
      let currentX = this.currentClickCell.x;
      let currentY = this.currentClickCell.y;

      if (currentX == 8) {
        currentX = 0;

        if (currentY == 8) {
          currentY = 0;
        } else {
          currentY++;
        }
      } else {
        currentX++;
      }

      this.focusCell(currentX, currentY);
    },
    focusCell(x: number, y: number) {
      if (x == -1 || y == -1) {
        this.$patch({
          currentClickCell: new CellCoordinate(x, y)
        });
      } else {
        if (this.cellEnabled(x, y)) {
          this.$patch({
            currentClickCell: new CellCoordinate(x, y)
          });
        }
      }
    },
    generateNewBoard(difficultyLevel: DifficultyLevel) {
      const tempBoard = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1]
      ]
      fillGrid(tempBoard);

      let attempts = 0;

      if (difficultyLevel == DifficultyLevel.EASY) {
        attempts = 3;
      } else if (difficultyLevel == DifficultyLevel.MEDIUM) {
        attempts = 6;
      } else {
        attempts = 9;
      }

      while (attempts > 0) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);

        while (tempBoard[row][col] == -1) {
          row = Math.floor(Math.random() * 9);
          col = Math.floor(Math.random() * 9);
        }

        const backup = tempBoard[row][col];
        tempBoard[row][col] = -1;

        const copyGrid = [] as number[][];

        for (let i = 0; i < 9; i++) {
          copyGrid.push([]);

          for (let j = 0; j < 9; j++) {
            copyGrid[i].push(tempBoard[i][j]);
          }
        }

        counter = 0;
        solveGrid(copyGrid);

        if (counter != 1) {
          tempBoard[row][col] = backup;
          attempts -= 1;
        }
      }

      const tempGeneratedBoard = tempBoard.map(row => row.map(cell => cell > 0 && cell <= 9 ? false : true));

      const copyGrid = [] as number[][];

      for (let i = 0; i < 9; i++) {
        copyGrid.push([]);

        for (let j = 0; j < 9; j++) {
          copyGrid[i].push(tempBoard[i][j]);
        }
      }

      solveGrid(copyGrid);

      this.$patch({
        board: tempBoard,
        generatedBoard: tempGeneratedBoard,
        solvedBoard: copyGrid
      });
    },
    resetBoard() {
      const currentBoard = this.board
      const currentGeneratedBoard = this.generatedBoard

      this.$reset();

      this.$patch({
        board: currentBoard.map((row, y) => row.map((cell, x) => this.cellEnabled(x, y, currentGeneratedBoard) ? -1 : cell)),
        generatedBoard: currentGeneratedBoard
      });
    },
  },
});
