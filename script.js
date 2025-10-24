function showGame(gameId) {
  // Скрываем главный экран и список игр
  document.getElementById('home').style.display = 'none';
  document.getElementById('games').style.display = 'none';
  // Показываем страницу игры
  document.getElementById('game-page').style.display = 'flex';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToGames() {
  // Показываем главный экран и список игр снова
  document.getElementById('home').style.display = 'flex';
  document.getElementById('games').style.display = 'flex';
  document.getElementById('game-page').style.display = 'none';
  window.scrollTo({ top: document.getElementById('games').offsetTop, behavior: 'smooth' });
}
