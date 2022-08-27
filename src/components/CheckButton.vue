<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';

const boardStore = useGameStore();
const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

enum InvalidType {
    ROWS_INVALID, COLUMNS_INVALID, NONETS_INVALID
}

function doStuffIfInvalid(invalidType: InvalidType) {
    boardStore.changeBoardBorder("4px solid red");

    console.log(invalidType);
}

function doStuffIfValid() {
    boardStore.changeBoardBorder("4px solid green");
}

function checkBoard() {
    boardStore.clearLastEventListener();

    const board = boardStore.getBoard;

    for (const row of board) {
        for (const validNumber of VALID_NUMBERS) {
            if (!row.includes(validNumber)) {
                doStuffIfInvalid(InvalidType.ROWS_INVALID);
                return;
            }
        }
    }

    for (let y = 0; y < 9; y++) {
        const column = []

        for (let x = 0; x < 9; x++) {
            column.push(board[y][x]);
        }

        for (const validNumber of VALID_NUMBERS) {
            if (!column.includes(validNumber)) {
                doStuffIfInvalid(InvalidType.COLUMNS_INVALID);
                return;
            }
        }
    }

    const xValues = [0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 6, 7, 8, 6, 7, 8, 6, 7, 8,
        0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 6, 7, 8, 6, 7, 8, 6, 7, 8,
        0, 1, 2, 0, 1, 2, 0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 6, 7, 8, 6, 7, 8, 6, 7, 8];

    const yValues = [0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 1, 2, 2, 2,
        3, 3, 3, 4, 4, 4, 5, 5, 5, 3, 3, 3, 4, 4, 4, 5, 5, 5, 3, 3, 3, 4, 4, 4, 5, 5, 5,
        6, 6, 6, 7, 7, 7, 8, 8, 8, 6, 6, 6, 7, 7, 7, 8, 8, 8, 6, 6, 6, 7, 7, 7, 8, 8, 8];

    const nonet = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ]

    let counter = 0;
    let nonetX = 0;
    let nonetY = 0;

    for (let i = 0; i < 81; i++) {
        nonet[nonetY][nonetX] = board[yValues[i]][xValues[i]];

        counter++;
        nonetX++;

        if (nonetX >= 3) {
            nonetX = 0;
        }

        if (counter >= 9) {
            counter = 0;

            for (const validNumber of VALID_NUMBERS) {
                if (!([] as number[]).concat(...nonet).includes(validNumber)) {
                    doStuffIfInvalid(InvalidType.NONETS_INVALID);
                    return;
                }
            }
        }

        if (counter >= 0 && counter < 3) {
            nonetY = 0;
        } else if (counter >= 3 && counter < 6) {
            nonetY = 1;
        } else if (counter >= 6 && counter < 9) {
            nonetY = 2;
        }
    }

    doStuffIfValid();
}
</script>

<template>
    <button id="check-button" @click="checkBoard">Check</button>
</template>

<style>
button {
    padding: 20px;
    background: white;
    border: 1px solid black;
    border-radius: 20px;
    font-family: 'Inter', 'Segoe  UI';
    font-size: 20px;
}

#check-button:hover {
    background: #ccffcc;
}
</style>