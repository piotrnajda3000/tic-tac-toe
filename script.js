(function init() {
  // Init HTML
  const body = document.querySelector("body");
  body.innerHTML = "";

  // const selectOpponent = (() => {
  //   opponents = ['vs Player', 'vs A.I.']
  //   opponents.forEach(opponent => {
  //     const select = document.createElement('button')
  //     select.className = 'select';
  //     select.textContent = opponent;
  //     body.appendChild(select);
  //   })
  // })

  const board = document.createElement("div");
  board.setAttribute("id", "board");
  body.appendChild(board);

  const turn = document.createElement("div");
  turn.setAttribute("id", "turn");
  body.appendChild(turn);

  const button = document.createElement("button");
  button.setAttribute("id", "restart");
  button.textContent = "Restart";
  button.addEventListener("click", init);
  body.appendChild(button);

  const gameBoard = (() => {
    // Init empty board
    const _board = ["", "", "", "", "", "", "", "", ""];

    // Render empty board on page
    for (let i = 0; i < 9; i++) {
      const spot = document.createElement("div");
      spot.className = "spot";
      spot.setAttribute("data-index", i);
      board.appendChild(spot);
    }

    return {
      get_board: () => _board,
    };
  })();

  const player = (mark) => {
    const getMark = () => mark;
    return { getMark };
  };

  const game = (() => {
    const addMark = (e) => {
      if (winner) return;

      const mark = currentPlayer.getMark();
      const index = e.target.getAttribute("data-index");

      const spot = document.querySelector(`div[data-index="${index}"]`);

      if (_board[index] == "") {
        const spot = document.querySelector(`div[data-index="${index}"]`);
        _board[index] = mark;
        spot.textContent = mark;
        state.check.end();
        state.announce();
        switchPlayer();
      }
    };

    const winningAxes = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const switchPlayer = () => {
      currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
      state.announce();
    };

    const state = {
      announce: () => {
        if (winner) {
          turn.textContent = `${winner} has won!`;
        } else if (draw) {
          turn.textContent = `It's a tie!`;
        } else {
          turn.textContent = `${currentPlayer.getMark()}'s turn`;
        }
      },
      check: {
        end: () => {
          if (state.check.win() == true) return;
          else state.check.draw();
        },
        win: () => {
          winningAxes.forEach((axis) => {
            if (
              _board[axis[0]] == _board[axis[1]] &&
              _board[axis[1]] == _board[axis[2]] &&
              _board[axis[0]] &&
              _board[axis[1]] &&
              _board[axis[2]]
            ) {
              winner = _board[axis[0]];

              state.announce();
              return true;
            }
          });
        },
        draw: () => {
          // If there's no win and no spot in the table is empty
          for (const spot of _board) {
            if (!spot) return;
          }
          draw = true;
          state.announce();
        },
      },
    };

    const _board = gameBoard.get_board();

    const playerOne = player("X");
    const playerTwo = player("O");
    let currentPlayer = playerOne;

    let winner = "";
    let draw = false;

    state.announce();

    // Bind events
    const spots = [...document.querySelectorAll(".spot")];
    spots.forEach((spot) => spot.addEventListener("click", addMark));
  })();
})();
