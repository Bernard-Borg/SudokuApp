let counter = 1;

function checkGrid(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] == -1) {
                return false;
            }
        }
    }

    return true;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function solveGrid(board: number[][]) {
    let row = 0;
    let col = 0;

    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;

        if (board[row][col] == -1) {
            for (let value = 1; value < 10; value++) {
                if (!board[row].includes(value)) {
                    if (![board[0][col], board[1][col], board[2][col], board[3][col], board[4][col], board[5][col], board[6][col], board[7][col], board[8][col]].includes(value)) {
                        let square = [] as number[][]

                        if (row < 3) {
                            if (col < 3) {
                                square = [0, 1, 2].map(x => board[x].slice(0, 3))
                            } else if (col < 6) {
                                square = [0, 1, 2].map(x => board[x].slice(3, 6))
                            } else {
                                square = [0, 1, 2].map(x => board[x].slice(6, 9))
                            }
                        } else if (row < 6) {
                            if (col < 3) {
                                square = [3, 4, 5].map(x => board[x].slice(0, 3))
                            } else if (col < 6) {
                                square = [3, 4, 5].map(x => board[x].slice(3, 6))
                            } else {
                                square = [3, 4, 5].map(x => board[x].slice(6, 9))
                            }
                        } else {
                            if (col < 3) {
                                square = [6, 7, 8].map(x => board[x].slice(0, 3))
                            } else if (col < 6) {
                                square = [6, 7, 8].map(x => board[x].slice(3, 6))
                            } else {
                                square = [6, 7, 8].map(x => board[x].slice(6, 9))
                            }
                        }

                        if (!square.flat().includes(value)) {
                            board[row][col] = value;

                            if (checkGrid(board)) {
                                counter += 1;
                                break;
                            } else {
                                if (solveGrid(board)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }

            break;
        }
    }

    board[row][col] = -1;
}

function fillGrid(board: number[][]) {
    const VALID_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let row = 0;
    let col = 0;

    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;

        if (board[row][col] == -1) {
            for (const value of shuffle(VALID_NUMBERS)) {
                if (!board[row].includes(value)) {
                    if (![board[0][col], board[1][col], board[2][col], board[3][col], board[4][col], board[5][col], board[6][col], board[7][col], board[8][col]].includes(value)) {
                        let square = [] as number[][]

                        if (row < 3) {
                            if (col < 3) {
                                square = [0, 1, 2].map(x => board[x].slice(0, 3))
                            } else if (col < 6) {
                                square = [0, 1, 2].map(x => board[x].slice(3, 6))
                            } else {
                                square = [0, 1, 2].map(x => board[x].slice(6, 9))
                            }
                        } else if (row < 6) {
                            if (col < 3) {
                                square = [3, 4, 5].map(x => board[x].slice(0, 3))
                            } else if (col < 6) {
                                square = [3, 4, 5].map(x => board[x].slice(3, 6))
                            } else {
                                square = [3, 4, 5].map(x => board[x].slice(6, 9))
                            }
                        } else {
                            if (col < 3) {
                                square = [6, 7, 8].map(x => board[x].slice(0, 3))
                            } else if (col < 6) {
                                square = [6, 7, 8].map(x => board[x].slice(3, 6))
                            } else {
                                square = [6, 7, 8].map(x => board[x].slice(6, 9))
                            }
                        }

                        if (!square.flat().includes(value)) {
                            board[row][col] = value;

                            if (checkGrid(board)) {
                                return true;
                            } else {
                                if (fillGrid(board)) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }

            break;
        }
    }

    board[row][col] = -1;
}

const board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1]
]
fillGrid(board);

let attempts = 5;

while (attempts > 0) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);

    while (board[row][col] == -1) {
        row = Math.floor(Math.random() * 9);
        col = Math.floor(Math.random() * 9);
    }

    const backup = board[row][col];
    board[row][col] = -1;

    const copyGrid = [] as number[][];

    for (let i = 0; i < 9; i++) {
        copyGrid.push([]);

        for (let j = 0; j < 9; j++) {
            copyGrid[i].push(board[i][j]);
        }
    }

    counter = 0;
    solveGrid(copyGrid);

    if (counter != 1) {
        board[row][col] = backup;
        attempts -= 1;
    }
}

console.log(board);