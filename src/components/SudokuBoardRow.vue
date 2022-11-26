<script setup lang="ts">
import { useGameStore } from "@/stores/GameStore";
import SudokuCell from "./SudokuCell.vue";
const props = defineProps<{
    rowNumber: number;
    isMain: boolean;
}>();

const boardStore = useGameStore();
</script>

<template>
    <div class="sudoku-row">
        <SudokuCell v-for="(n, i) in boardStore.getBoardWidth" :key="i" :x="i" :y="props.rowNumber"
            :isMain="props.isMain" />
    </div>
</template>

<style>
.sudoku-row {
    display: flex;
}

.sudoku-row>.sudoku-cell:nth-child(3),
.sudoku-row>.sudoku-cell:nth-child(6) {
    border-right: 2px solid black;
}
</style>