(()=> {

  const body = document.querySelector('body')

  let gameBoard = (() => {
    let _board =  [
      ['x', 'o', 'x'], 
      ['o', 'x', 'o'],
      ['x', 'o', 'x'],
    ]
    return {
      displayBoard: () => {
        for (const row of _board) {
          let rowDiv = dom.createRow();    
          for (const mark of row) {
            dom.addMark(rowDiv, mark); 
          }
          dom.renderRow(rowDiv);
        }
      }
    }
  })(); 

  const player = (name) => {
    return {name};
  }; 

  const me = player('me'); 

  let dom = {
    createRow: () => {
      const div = document.createElement('div')
      return div;
    },
    renderRow: (row) => {
      body.appendChild(row); 
    },
    addMark: (row, mark) => {
      const span = document.createElement('span')
      span.classList.add('mark')
      span.textContent = mark; 
      row.appendChild(span) 
    }, 
  }

  gameBoard.displayBoard();
  
  // let displayController = {
  //   displayBoard: () => {
  //     const boardMarks = gameBoard.getBoardMarks();
  //     boardMarks.forEach(mark => dom.renderMark(mark))
  //   }
  // }

  // displayController.displayBoard(); 
  
})();

