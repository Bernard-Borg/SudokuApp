<script setup lang="ts">
import { useGameStore } from "@/stores/GameStore";
import SudokuBoardRow from "@/components/SudokuBoardRow.vue";
const boardStore = useGameStore();
</script>

<template>
  <div id="sudoku-board">
    <SudokuBoardRow v-for="(n, i) in boardStore.getBoardHeight" :key="i" :rowNumber="i" />
  </div>
</template>

<style>
#sudoku-board {
  margin: 0 auto;
  border: 2px solid black;
}

#sudoku-board>.sudoku-row:nth-child(3),
#sudoku-board>.sudoku-row:nth-child(6) {
  border-bottom: 2px solid black;
}
</style>
