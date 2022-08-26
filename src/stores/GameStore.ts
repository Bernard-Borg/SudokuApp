import { defineStore } from "pinia";

export class CellCoordinate {
  x = -1;
  y = -1;

  constructor(column_number: number, row_number: number) {
    this.x = column_number;
    this.y = row_number;
  }
}

export const useGameStore = defineStore({
  id: "GameStore",
  state: () => ({
    board: new Array<Array<number>>(9).fill([]).map(() => Array(9).fill(-1)) as Array<Array<number>>,
    currentClickCell: new CellCoordinate(-1, -1),
    currentEventListener: () => undefined,
  }),
  getters: {
    getBoard: (state) => state.board,
    getBoardHeight: (state) => state.board.length,
    getBoardWidth: (state) => state.board[0].length,
    getBoardCell: (state) => (x: number, y: number) => state.board[y][x],
    getCurrentClickedCell: (state) => [state.currentClickCell.x, state.currentClickCell.y],
    getCurrentEventListener: (state) => state.currentEventListener
  },
  actions: {
    changeBoardValue(x: number, y: number, newValue: number) {
      this.board[y][x] = newValue;

      this.$patch({
        board: this.board,
      });
    },
    clickCell(x: number, y: number) {
      this.$patch({
        currentClickCell: new CellCoordinate(x, y)
      });
    },
    setCurrentEventListener(eventListener: (event: KeyboardEvent) => void) {
      this.$patch({
        currentEventListener: eventListener
      })
    },
    resetBoard() {
      this.$reset();
    },
  },
});
