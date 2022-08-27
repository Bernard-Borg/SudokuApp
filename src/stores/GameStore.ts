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
  currentEventListener: () => undefined,
  boardBorder: "4px solid black"
}

export const useGameStore = defineStore({
  id: "GameStore",
  state: () => ({
    board: structuredClone(defaultState.board) as number[][],
    currentClickCell: structuredClone(defaultState.currentClickCell) as CellCoordinate,
    currentEventListener: defaultState.currentEventListener,
    boardBorder: defaultState.boardBorder
  }),
  getters: {
    getBoard: (state) => state.board,
    getBoardHeight: (state) => state.board.length,
    getBoardWidth: (state) => state.board[0].length,
    getBoardCell: (state) => (x: number, y: number) => state.board[y][x],
    getCurrentClickedCell: (state) => [state.currentClickCell.x, state.currentClickCell.y],
    getCurrentEventListener: (state) => state.currentEventListener,
    getBoardBorder: (state) => state.boardBorder,
    cellColor: (state) => (x: number, y: number) => state.currentClickCell.x == x && state.currentClickCell.y == y ? "#ddffdd" : "white"
  },
  actions: {
    changeBoardValue(x: number, y: number, newValue: number) {
      this.board[y][x] = newValue;

      this.$patch({
        board: this.board,
      });
    },
    changeBoardBorder(newBorder: string) {
      this.$patch({
        boardBorder: newBorder
      })
    },
    clickCell(x: number, y: number) {
      this.$patch({
        currentClickCell: new CellCoordinate(x, y)
      });
    },
    setCurrentEventListener(eventListener: (event: KeyboardEvent) => void) {
      document.addEventListener("keyup", eventListener);

      this.$patch({
        currentEventListener: eventListener
      })
    },
    clearLastEventListener() {
      document.removeEventListener("keyup", this.currentEventListener);

      this.$patch({
        currentEventListener: defaultState.currentEventListener
      })
    },
    resetBoard() {
      this.$reset();
    },
  },
});
