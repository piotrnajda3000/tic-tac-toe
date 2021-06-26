(function init() {

  const body = document.querySelector('body')
  body.innerHTML = ''; 

  const gameBoard = (() => {

    const _board =  [
      ['', '', ''], 
      ['', '', ''],
      ['', '', ''],
    ]

    // Init 
    const board = document.createElement('div')
    board.setAttribute('id', 'board');
    body.appendChild(board);
    for (const [rowID, row] of _board.entries()) {
      for (let columnID = 0; columnID < row.length; columnID++) {
        const spot = document.createElement('div')
        spot.classList.add('spot')
        spot.setAttribute('data-row', rowID)
        spot.setAttribute('data-column', columnID)
        board.appendChild(spot) 
      }
    }

    return {
      get_board: () => _board
    }

  })(); 

  const player = (mark) => {
    const getMark = () => mark; 
    return {getMark};
  }; 

  let game = (() => {

    const announceState = () => {
      if (winner) {
        turn.textContent = `${winner} has won!`
      }
      else if (draw) {
        turn.textContent = `It's a tie!`; 
      }
      else {
        turn.textContent = `${currentPlayer.getMark()}'s turn`;
      }
    }

    const addMark = (e) => {
      if (winner) return; 
      const mark = currentPlayer.getMark();
      const row = e.target.getAttribute('data-row')
      const column = e.target.getAttribute('data-column')
      if (_board[row][column] == '') {
        const spot = document.querySelector(`div[data-row="${row}"][data-column="${column}"]`);
        _board[row][column] = mark;
        spot.textContent = mark;
        checkEnd() 
        switchPlayer();
      }
    }
  
    const switchPlayer = () => {
        currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne; 
        announceState(); 
    }

    const checkEnd = () => {
      // horizontal
        for (let i = 0; i < 3; i++) {
          if (_board[i][0] == _board[i][1] && _board[i][1] == _board[i][2] && _board[i][0] && _board[i][1] && _board[i][2]) {
            winner = _board[i][0]
            announceState();
            break;
          } 
        }
      // columns 
      for (let i = 0; i < 3; i++) {
        if (_board[0][i] == _board[1][i] && _board[1][i] == _board[2][i] && _board[0][i] && _board[1][i] && _board[2][i]) {
          winner = _board[0][i]
          announceState(); 
          break; 
        }
      }
      // diagonal left to right 
      if (_board[0][0] == _board[1][1] && _board[1][1] == _board[2][2] && _board[0][0] && _board[1][1] && _board[2][2]) {
        winner = _board[0][0]
        announceState();
        return;  
      }
      // diagonal right to left
      if (_board[0][2] == _board[1][1] && _board[1][1] == _board[2][0] && _board[0][2] && _board[1][1] && _board[2][0]) {
        winner = _board[0][2]
        announceState();
        return;  
      }

      // If there's no win and no spot in the table is empty 
      for (const row of _board) {
        for (const column of row) {
          if (!column) return;
        }
      }
      draw = true; 
      announceState();

    }

    // Init
    const _board = gameBoard.get_board(); 

    const playerOne = player('X'); 
    const playerTwo = player('O')
    let currentPlayer = playerOne; 
    let winner = ''; 
    let draw = false; 

    const turn = document.createElement('div')
    turn.setAttribute('id', 'turn'); 
    body.appendChild(turn);
    announceState();

    const button = document.createElement('button'); 
    button.setAttribute('id', 'restart'); 
    button.textContent = 'Restart'
    button.addEventListener('click', init); 
    body.appendChild(button); 
    
    // Bind events 
    const spots = Array.from(document.querySelectorAll('.spot')); 
    spots.forEach(spot => spot.addEventListener('click', addMark)); 
      
  })();
})(); 
