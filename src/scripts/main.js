'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

const scoreElement = document.querySelector('.game-score');
const button = document.querySelector('.button');
const tableBody = document.querySelector('tbody');
const startMessage = document.querySelector('.message-start');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');

const render = () => {
  const board = game.getState();
  const score = game.getScore();
  const rows = tableBody.querySelectorAll('tr');

  scoreElement.textContent = score;

  rows.forEach((row, rowIndex) => {
    row.querySelectorAll('td').forEach((cell, colIndex) => {
      const value = board[rowIndex][colIndex];

      cell.textContent = value === 0 ? '' : value;
      cell.className = `field-cell field-cell--${value}`;
    });
  });
};

const updateUi = () => {
  const gameStatus = game.getStatus();

  startMessage.classList.toggle('hidden', gameStatus !== 'idle');
  winMessage.classList.toggle('hidden', gameStatus !== 'win');
  loseMessage.classList.toggle('hidden', gameStatus !== 'game over');

  if (gameStatus === 'playing') {
    button.textContent = 'Restart';
    button.className = 'button restart';
  }
};

const handleMove = (direction) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  const moved = game.move(direction);

  if (moved) {
    render();
    updateUi();
  }
};

button.addEventListener('click', () => {
  game.start();
  render();
  updateUi();
});

document.addEventListener('keydown', (e) => {
  let direction;

  switch (e.key) {
    case 'ArrowUp':
      direction = 'Up';
      break;
    case 'ArrowDown':
      direction = 'Down';
      break;
    case 'ArrowLeft':
      direction = 'Left';
      break;
    case 'ArrowRight':
      direction = 'Right';
      break;
    default:
      return;
  }

  e.preventDefault();

  handleMove(direction);
});
