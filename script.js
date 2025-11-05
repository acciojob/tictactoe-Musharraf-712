//your JS code here. If required.

    const playerForm = document.getElementById('playerForm');
    const submitBtn = document.getElementById('submit');
    const board = document.querySelector('.board');
    const message = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    let player1 = '';
    let player2 = '';
    let currentPlayer = '';
    let currentSymbol = 'x';
    let gameActive = true;

    // Winning combinations
    const winPatterns = [
      [1,2,3], [4,5,6], [7,8,9],
      [1,4,7], [2,5,8], [3,6,9],
      [1,5,9], [3,5,7]
    ];

    submitBtn.addEventListener('click', () => {
      Player1 = document.getElementById('player1').value.trim();
      Player2 = document.getElementById('player2').value.trim();

      if (Player1 === '' || Player2 === '') {
        alert('Please enter names for both players!');
        return;
      }

      playerForm.style.display = 'none';
      board.style.display = 'block';

      currentPlayer = Player1;
      message.textContent = `${currentPlayer}, you're up!`;
    });

    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (!gameActive || cell.textContent !== '') return;

        cell.textContent = currentSymbol;

        if (checkWinner()) {
          message.textContent = `${currentPlayer}, congratulations you won!`;
          gameActive = false;
          return;
        }

        if ([...cells].every(c => c.textContent !== '')) {
          message.textContent = "It's a draw!";
          gameActive = false;
          return;
        }

        // Switch player
        currentSymbol = currentSymbol === 'x' ? 'o' : 'x';
        currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
        message.textContent = `${currentPlayer}, you're up!`;
      });
    });

    function checkWinner() {
      return winPatterns.some(pattern => {
        const [a,b,c] = pattern.map(id => document.getElementById(id).textContent);
        return a && a === b && b === c;
      });
    }