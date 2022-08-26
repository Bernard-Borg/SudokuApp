<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';

const boardStore = useGameStore();

function resetBoard() {
    const pastEventListener = boardStore.getCurrentEventListener;
    const pastX = boardStore.getCurrentClickedCell[0];
    const pastY = boardStore.getCurrentClickedCell[1];
    document.removeEventListener("keyup", pastEventListener);

    const element = document.getElementById(`sudoku-cell-${pastX}-${pastY}`);

    if (element != null) {
        element.style.backgroundColor = "white";
    }

    boardStore.resetBoard();
}
</script>

<template>
    <button id="reset-button" @click="resetBoard">Reset Board</button>
</template>

<style>
button {
    padding: 20px;
    background: white;
    border: 1px solid black;
    border-radius: 20px;
    font-family: 'Inter', 'Segoe  UI';
}

#reset-button:hover {
    background: #ffcccc;
}
</style>