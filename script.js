function showGame(gameId) {
  document.getElementById('games').style.display = 'none';
  document.getElementById('game-page').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToGames() {
  document.getElementById('game-page').style.display = 'none';
  document.getElementById('games').style.display = 'flex';
  window.scrollTo({ top: document.getElementById('games').offsetTop, behavior: 'smooth' });
}
