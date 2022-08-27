<script setup lang="ts">
import { useGameStore } from "@/stores/GameStore";

const board = useGameStore();
const props = defineProps<{
	x: number;
	y: number;
}>();

const VALID_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function handleCellNumberEntering(event: KeyboardEvent) {
	if (VALID_NUMBERS.includes(event.key)) {
		board.changeBoardValue(props.x, props.y, parseInt(event.key));
	}
}

function handleClick(event: MouseEvent) {
	//Line below to stop click event from also firing document click event
	event.stopPropagation();

	board.clearLastEventListener();
	board.clickCell(props.x, props.y);
	board.setCurrentEventListener(handleCellNumberEntering);
}
</script>

<template>
	<div :id="`sudoku-cell-${x}-${y}`" class="sudoku-cell" @click="handleClick"
		:style="{ backgroundColor: board.cellColor(x, y) }">
		{{ board.getBoard[y][x] > 0 ? board.getBoard[y][x] : "" }}
	</div>
</template>

<style>
.sudoku-cell {
	padding: 10px;
	outline: 1px solid black;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	font-size: 20px;
}

.sudoku-cell:hover {
	background-color: #eeeeee;
	outline: 1px solid black;
}
</style>
