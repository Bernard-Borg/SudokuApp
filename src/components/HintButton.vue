<script setup lang="ts">
import SudokuBoard from "./SudokuBoard.vue";

function showSolvedBoard() {
    const solvedBoardElement = document.getElementById("solved-board");
    
    if (solvedBoardElement != null) {
        solvedBoardElement.style.display = "block";
    }
}

function hideSolvedBoard() {
    const solvedBoardElement = document.getElementById("solved-board");
    
    if (solvedBoardElement != null) {
        solvedBoardElement.style.display = "none";
    }
}
</script>
    
<template>
    <button id="hint-button" @mouseover="showSolvedBoard" @mouseleave="hideSolvedBoard">?</button>
    <div id="solved-board">
        <SudokuBoard :isMain="false" />
    </div>
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

#solved-board {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 20px;
    border: 1px solid black;
    box-shadow: 2px 2px grey, -2px -2px grey;
    border-radius: 10px;
    display: none;
}

#solved-board .sudoku-cell {
    width: 2px;
    height: 2px;
}
</style>