(function () {
  var root = document.querySelector("[data-snake-game]");
  if (!root || !window.SnakeLogic) {
    return;
  }

  var GRID_SIZE = 16;
  var TICK_MS = 130;

  var scoreEl = root.querySelector("[data-snake-score]");
  var statusEl = root.querySelector("[data-snake-status]");
  var gridEl = root.querySelector("[data-snake-grid]");
  var pauseBtn = root.querySelector("[data-snake-pause]");
  var restartBtn = root.querySelector("[data-snake-restart]");
  var controlButtons = root.querySelectorAll("[data-snake-dir]");

  var state = SnakeLogic.createInitialState({ width: GRID_SIZE, height: GRID_SIZE });
  var isPaused = false;
  var hasStarted = false;
  var timer;
  var cells = [];

  function key(position) {
    return position.x + "," + position.y;
  }

  function initGrid() {
    gridEl.style.setProperty("--snake-size", String(GRID_SIZE));

    for (var y = 0; y < GRID_SIZE; y += 1) {
      for (var x = 0; x < GRID_SIZE; x += 1) {
        var cell = document.createElement("div");
        cell.className = "snake-cell";
        gridEl.appendChild(cell);
        cells.push(cell);
      }
    }
  }

  function updateStatus() {
    var text;

    if (state.status === "game_over") {
      text = "Game over";
    } else if (state.status === "won") {
      text = "You won";
    } else if (!hasStarted) {
      text = "Ready";
    } else if (isPaused) {
      text = "Paused";
    } else {
      text = "Running";
    }

    statusEl.textContent = text;
    scoreEl.textContent = String(state.score);
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
  }

  function renderGrid() {
    var snakeCells = new Set();

    for (var i = 0; i < state.snake.length; i += 1) {
      snakeCells.add(key(state.snake[i]));
    }

    var foodKey = state.food ? key(state.food) : null;

    for (var y = 0; y < GRID_SIZE; y += 1) {
      for (var x = 0; x < GRID_SIZE; x += 1) {
        var index = y * GRID_SIZE + x;
        var cell = cells[index];
        var currentKey = x + "," + y;

        cell.classList.toggle("snake-cell-food", currentKey === foodKey);
        cell.classList.toggle("snake-cell-snake", snakeCells.has(currentKey));
      }
    }
  }

  function render() {
    updateStatus();
    renderGrid();
  }

  function restartGame() {
    state = SnakeLogic.createInitialState({ width: GRID_SIZE, height: GRID_SIZE });
    isPaused = false;
    hasStarted = false;
    render();
  }

  function queueDirection(direction) {
    if (state.status === "game_over" || state.status === "won") {
      return;
    }

    hasStarted = true;
    state = SnakeLogic.withDirection(state, direction);
    render();
  }

  function tick() {
    if (!hasStarted || isPaused) {
      return;
    }

    if (state.status === "game_over" || state.status === "won") {
      return;
    }

    state = SnakeLogic.step(state);
    render();
  }

  function togglePause() {
    if (!hasStarted || state.status === "game_over" || state.status === "won") {
      return;
    }

    isPaused = !isPaused;
    render();
  }

  function handleKeyboard(event) {
    var keyName = event.key.toLowerCase();
    var directionMap = {
      arrowup: "up",
      w: "up",
      arrowdown: "down",
      s: "down",
      arrowleft: "left",
      a: "left",
      arrowright: "right",
      d: "right"
    };

    if (keyName === " ") {
      event.preventDefault();
      togglePause();
      return;
    }

    var direction = directionMap[keyName];
    if (!direction) {
      return;
    }

    event.preventDefault();
    queueDirection(direction);
  }

  pauseBtn.addEventListener("click", togglePause);
  restartBtn.addEventListener("click", restartGame);

  controlButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      queueDirection(button.getAttribute("data-snake-dir"));
    });
  });

  document.addEventListener("keydown", handleKeyboard);

  initGrid();
  render();
  timer = window.setInterval(tick, TICK_MS);

  window.addEventListener("beforeunload", function () {
    window.clearInterval(timer);
    document.removeEventListener("keydown", handleKeyboard);
  });
})();
