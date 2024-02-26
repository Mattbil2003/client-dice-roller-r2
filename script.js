document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('roll-button').focus();
    let count = 3; 
    const countDisplay = document.getElementById('count');
    
    function updateCountDisplay() {
      countDisplay.textContent = count;
    }

    function incrementCount() {
      if (count < 5) {
        count++;
        updateCountDisplay();
      }
      return count
    }

    function decrementCount() {
      if (count > 1) {
        count--;
        updateCountDisplay();
      }
      return count
    }
  function rollDice(count) {
    fetch(`server-dice-roller-r1-mb.azurewebsites.net/roll?count=${count}`)
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => { 
      let resultsList = data.results;
    for (let i = 1; i <= count; i++) {
        let diceValue = resultsList[i-1]
        document.getElementById(`dice${i}`).src = `dice${diceValue}.png`; 
        var diceImg = document.getElementById(`dice${i}`);
        diceImg.style.display = 'block';
    }
    for (let i = 1; i <= 5; i++) {
      var diceImg = document.getElementById(`dice${i}`);
      if (i > count) {
          diceImg.style.display = 'none';
      }
  }
  })
  }
    updateCountDisplay(); 
    document.getElementById('leftArrow').addEventListener('click', decrementCount);
    document.getElementById('rightArrow').addEventListener('click', incrementCount);
    document.getElementById('roll-button').addEventListener('click', () => rollDice(count));

    window.onload = function() {
      rollDice();
    }
  });
  