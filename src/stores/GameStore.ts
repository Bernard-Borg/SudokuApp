import { defineStore } from "pinia";

export class CellCoordinate {
  x = -1;
  y = -1;

  constructor(column_number: number, row_number: number) {
    this.x = column_number;
    this.y = row_number;
  }
}

const defaultState = {
  board: new Array<Array<number>>(9).fill([]).map(() => Array(9).fill(-1)) as Array<Array<number>>,
  currentClickCell: new CellCoordinate(-1, -1),
  boardBorder: "4px solid black"
}

export const useGameStore = defineStore({
  id: "GameStore",
  state: () => ({
    board: structuredClone(defaultState.board) as number[][],
    currentClickCell: structuredClone(defaultState.currentClickCell) as CellCoordinate,
    boardBorder: defaultState.boardBorder
  }),
  getters: {
    getBoard: (state) => state.board,
    getBoardHeight: (state) => state.board.length,
    getBoardWidth: (state) => state.board[0].length,
    getBoardCell: (state) => (x: number, y: number) => state.board[y][x],
    getCurrentClickedCell: (state) => [state.currentClickCell.x, state.currentClickCell.y],
    getBoardBorder: (state) => state.boardBorder,
    cellColor: (state) => (x: number, y: number) => state.currentClickCell.x == x && state.currentClickCell.y == y ? "#ddffdd" : "white"
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
      this.$patch({
        currentClickCell: new CellCoordinate(x, y)
      });
    },
    resetBoard() {
      this.$reset();
    },
  },
});
