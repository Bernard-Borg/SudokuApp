<script setup lang="ts">
import SudokuBoard from './components/SudokuBoard.vue';
import ResetButton from './components/ResetButton.vue';
import { useGameStore } from './stores/GameStore';
import CheckButton from './components/CheckButton.vue';

const board = useGameStore();

document.getElementsByTagName("body")[0].addEventListener("click", function () {
  const pastEventListener = board.getCurrentEventListener;
  const pastX = board.getCurrentClickedCell[0];
  const pastY = board.getCurrentClickedCell[1];
  document.removeEventListener("keyup", pastEventListener);

  board.clickCell(-1, -1);
  board.setCurrentEventListener(() => undefined);

  const element = document.getElementById(`sudoku-cell-${pastX}-${pastY}`);

  if (element != null) {
    element.style.backgroundColor = "white";
  }
});
</script>

<template>
  <main>
    <SudokuBoard />
    <div id="bottom-buttons">
      <ResetButton />
      <CheckButton />
    </div>
  </main>
</template>

<style>
#bottom-buttons {
  margin-top: 25px;
  display: flex;
  justify-content: space-evenly;
}
</style>