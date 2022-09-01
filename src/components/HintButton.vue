<script setup lang="ts">
import { useGameStore } from "@/stores/GameStore";

const boardStore = useGameStore();

function showSolvedBoard() {
    console.log(boardStore.getSolvedBoard);
}
</script>
    
<template>
    <button id="hint-button" @click="showSolvedBoard">?</button>
</template>
        
<style>
button#hint-button {
    background: #0078d4;
    color: white;
    font-size: 15px;
    padding: 0px;
    border-radius: 100%;
    height: 30px;
    width: 30px;
    border: none;
    position: relative;
    top: 0;
    left: 95%;
    margin-bottom: 15px;
}
</style>