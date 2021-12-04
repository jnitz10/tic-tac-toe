const gameBoard = (function() {
    const board = ["","","","","","","","",""];

    const placeSymbol = (index, symbol) => {
        if (index > board.length) return;
        board[index] = symbol;
    }
     const getSymbol = (index) => {
         if (index > board.length) return;
         return board[index];
     }

     const reset = () => {
         for (let n = 0; n < board.length; n++) {
             board[n] = "";
         }
     }


     return { placeSymbol, getSymbol, reset };

})();

const displayController = (function() {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const ngButton = document.getElementById('newGameButton');
    const notifArea = document.querySelector('.notifArea');

    const drawBoard = () => {
        notifArea.innerHTML = "Current turn: " + gameController.getCurrentSymbol();
        for (const cell of cells) {
            cell.innerHTML = "";
            cell.innerHTML = gameBoard.getSymbol(cell.dataset.cellIndex);
        }
    }

    const announceWinner = () => {
        notifArea.innerHTML = gameController.getCurrentSymbol() + " is the winner!"
    }

    ngButton.addEventListener('click', function() {
        console.log("NG button pressed");
        gameController.newGame();
    })

    cells.forEach(cell => cell.addEventListener('click', function() {
        if (!gameController.getIsPlaying()) {
            return
        }
        if (cell.innerHTML != "") {
            return
        } else {
            //console.log(cell.dataset.cellIndex);
            console.log(gameController.getTurn());
            gameBoard.placeSymbol(cell.dataset.cellIndex, gameController.getCurrentSymbol());
            displayController.drawBoard();
            gameController.nextTurn(cell.dataset.cellIndex);
            
        }
    }));
    
    return { drawBoard, announceWinner };
})();

const player = (symbol) => {
    this.symbol = symbol;

    const getPlayerSymbol = () => {
        return symbol;
    }

    return { getPlayerSymbol }
}


const gameController = (function() {
    var isPlaying = false;
    var player1 = player("x");
    var player2 = player("o");
    var turn = 1;
    var player1Squares = [];
    var player2Squares = [];

    const newGame = () => {
        isPlaying = true;
        turn = 1;
        gameBoard.reset();
        displayController.drawBoard();
    }

    const getIsPlaying = () => {
        return isPlaying;
    }

    const getCurrentSymbol = () => {
        return (turn % 2 == 1 ? player1.getPlayerSymbol() : player2.getPlayerSymbol());
    }

    const nextTurn = (index) => {
        (turn % 2 == 1 ? player1Squares.push(parseInt(index)) : 
        player2Squares.push(parseInt(index)) );
        if (checkWinner(player1Squares)){
            displayController.drawBoard();
            declareWinner();
        } else if (checkWinner(player2Squares)){
            displayController.drawBoard();
            declareWinner();
        } 
        turn++;
    }

    const getTurn = () => {
        return turn;
    }

    const declareWinner = () => {
        isPlaying = false;
        alert(`${getCurrentSymbol()} is the winner`);
    }

    const checkWinner = (squares) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let checker = (arr, target) => target.every(v => arr.includes(v));
        for (const winCon of winConditions) {
            if (checker(squares, winCon)){
                return true;
            }
            

        }

    }

    const getSquares1 = () => {
        return player1Squares;
    }

    const getSquares2 = () => {
        return player2Squares;
    }

    return { newGame, getIsPlaying, getCurrentSymbol, nextTurn, getTurn, getSquares1,
    getSquares2, checkWinner }
})();
 




/*         drawBoard: function() {
            console.log("sdf");
            for (const cell of cells) {
                cell.innerHTML = board[cell.dataset.cellIndex];
            }
        }, */