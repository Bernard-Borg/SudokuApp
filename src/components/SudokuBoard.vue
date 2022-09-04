<script setup lang="ts">
import { useGameStore } from "@/stores/GameStore";
import SudokuBoardRow from "@/components/SudokuBoardRow.vue";
const boardStore = useGameStore();

const props = defineProps<{
	isMain: boolean
}>();
</script>

<template>
  <div id="sudoku-board" :style="{ border: boardStore.getBoardBorder }">
    <SudokuBoardRow v-for="(n, i) in boardStore.getBoardHeight" :key="i" :rowNumber="i" :isMain="props.isMain" />
  </div>
</template>

<style>
#sudoku-board {
  margin: 0 auto;
}

#sudoku-board>.sudoku-row:nth-child(3),
#sudoku-board>.sudoku-row:nth-child(6) {
  border-bottom: 2px solid black;
}
</style>
