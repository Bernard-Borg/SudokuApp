<script setup lang="ts">
import { DifficultyLevel, useGameStore } from "@/stores/GameStore";

const boardStore = useGameStore();

function callGenerateBoard() {
    const selectElement = document.getElementById("difficulty") as HTMLSelectElement;
    const selectedItem = Number(selectElement.value);

    boardStore.generateNewBoard(selectedItem);
}
</script>

<template>
    <select name="difficulty" id="difficulty">
        <option v-for="(n, i) in Object.keys(DifficultyLevel).filter((k) => isNaN(Number(k)))" :key="i" :value="i">{{ n
        }}</option>
    </select>
    <button @click="callGenerateBoard">Generate</button>
</template>
    
<style>
select#difficulty {
    border-radius: 20px;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    border: 1px solid black;
    font-size: 16px;
}
</style>