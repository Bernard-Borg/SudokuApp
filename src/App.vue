<script setup lang="ts">
import SudokuBoard from './components/SudokuBoard.vue';
import ResetButton from './components/ResetButton.vue';
import { DifficultyLevel, useGameStore } from './stores/GameStore';
import CheckButton from './components/CheckButton.vue';
import GenerateBoardControl from './components/GenerateBoardControl.vue';

const board = useGameStore();

const VALID_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

document.getElementsByTagName("body")[0].addEventListener("click", function () {
  board.focusCell(-1, -1);
});

document.addEventListener("keyup", function (event: KeyboardEvent) {
  if (event.key == "ArrowUp") {
    board.moveClickedCellUp();
  } else if (event.key == "ArrowLeft") {
    board.moveClickedCellLeft();
  } else if (event.key == "ArrowRight") {
    board.moveClickedCellRight();
  } else if (event.key == "ArrowDown") {
    board.moveClickedCellDown();
  } else if (VALID_NUMBERS.includes(event.key)) {
    board.changeBoardValue(parseInt(event.key));
  }
});

board.generateNewBoard(DifficultyLevel.EASY);
</script>

<template>
  <main>
    <SudokuBoard />
    <div id="bottom-buttons">
      <CheckButton />
      <GenerateBoardControl />
      <ResetButton />
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