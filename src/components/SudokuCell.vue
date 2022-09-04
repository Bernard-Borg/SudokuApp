<script setup lang="ts">
import { useGameStore } from "@/stores/GameStore";

const board = useGameStore();
const props = defineProps<{
	x: number;
	y: number;
	isMain: boolean;
}>();

function handleClick(event: MouseEvent) {
	event.stopPropagation(); //Stop click event from also firing document click event
	board.focusCell(props.x, props.y);
}

console.log(board.getSolvedBoard);
</script>

<template>
	<div :id="`sudoku-cell-${x}-${y}`" class="sudoku-cell" @click="handleClick"
		:style="{ backgroundColor: board.cellColor(x, y) }">
		{{ isMain ? board.getBoard[y][x] > 0 ? board.getBoard[y][x] : "" :
		board.getSolvedBoard[y][x] > 0 ? board.getSolvedBoard[y][x] : ""}}
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
