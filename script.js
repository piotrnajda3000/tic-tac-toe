(()=> {

  const body = document.querySelector('body')

  let gameBoard = (() => {
    let _board =  [
      ['x', 'o', 'x'], 
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ]
    return {
      getBoardMarks: () => {
        const boardMarks = [];
        for (const row of _board) {  
          for (const mark of row) {
            boardMarks.push(mark);
          }
        }
        return boardMarks
      }
    }
  })(); 

  const player = (name) => {
    return {name};
  }; 

  const me = player('me'); 

  let dom = {
    renderMark: (mark) => {
      const square = document.createElement('div')
      square.classList.add('square')
      square.textContent = mark; 
      body.appendChild(square) 
    }, 
  }
  
  let displayController = {
    displayBoard: () => {
      const boardMarks = gameBoard.getBoardMarks();
      boardMarks.forEach(mark => dom.renderMark(mark))
    }
  }

  displayController.displayBoard(); 
  
})();

