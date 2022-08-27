<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';

const boardStore = useGameStore();

function resetBoard() {
    boardStore.clearLastEventListener();
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