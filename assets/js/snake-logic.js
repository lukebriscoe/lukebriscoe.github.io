(function (global) {
  var DIRECTIONS = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  function clonePosition(position) {
    return { x: position.x, y: position.y };
  }

  function positionsEqual(a, b) {
    return a.x === b.x && a.y === b.y;
  }

  function isOppositeDirection(current, next) {
    return (
      (current === "up" && next === "down") ||
      (current === "down" && next === "up") ||
      (current === "left" && next === "right") ||
      (current === "right" && next === "left")
    );
  }

  function randomInt(max, rng) {
    return Math.floor(rng() * max);
  }

  function resolveRng(rng) {
    return typeof rng === "function" ? rng : Math.random;
  }

  function nextHead(head, direction) {
    var delta = DIRECTIONS[direction];
    return {
      x: head.x + delta.x,
      y: head.y + delta.y
    };
  }

  function createInitialSnake(width, height) {
    var centerX = Math.floor(width / 2);
    var centerY = Math.floor(height / 2);

    return [
      { x: centerX, y: centerY },
      { x: centerX - 1, y: centerY },
      { x: centerX - 2, y: centerY }
    ];
  }

  function placeFood(width, height, snake, rng) {
    var random = resolveRng(rng);
    var available = [];
    var occupied = new Set();

    for (var i = 0; i < snake.length; i += 1) {
      occupied.add(snake[i].x + "," + snake[i].y);
    }

    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var key = x + "," + y;
        if (!occupied.has(key)) {
          available.push({ x: x, y: y });
        }
      }
    }

    if (available.length === 0) {
      return null;
    }

    return available[randomInt(available.length, random)];
  }

  function createInitialState(options) {
    var opts = options || {};
    var width = opts.width || 16;
    var height = opts.height || 16;
    var direction = opts.direction || "right";
    var snake = opts.snake ? opts.snake.map(clonePosition) : createInitialSnake(width, height);
    var food = opts.food ? clonePosition(opts.food) : placeFood(width, height, snake, opts.rng);

    return {
      width: width,
      height: height,
      snake: snake,
      direction: direction,
      pendingDirection: direction,
      food: food,
      score: 0,
      status: "ready"
    };
  }

  function withDirection(state, nextDirection) {
    if (!DIRECTIONS[nextDirection]) {
      return state;
    }

    if (isOppositeDirection(state.direction, nextDirection)) {
      return state;
    }

    return {
      width: state.width,
      height: state.height,
      snake: state.snake.map(clonePosition),
      direction: state.direction,
      pendingDirection: nextDirection,
      food: state.food ? clonePosition(state.food) : null,
      score: state.score,
      status: state.status
    };
  }

  function step(state, rng) {
    if (state.status === "game_over") {
      return state;
    }

    var direction = state.pendingDirection;
    if (isOppositeDirection(state.direction, direction)) {
      direction = state.direction;
    }

    var currentSnake = state.snake.map(clonePosition);
    var newHead = nextHead(currentSnake[0], direction);

    var hitWall =
      newHead.x < 0 ||
      newHead.y < 0 ||
      newHead.x >= state.width ||
      newHead.y >= state.height;

    if (hitWall) {
      return {
        width: state.width,
        height: state.height,
        snake: currentSnake,
        direction: direction,
        pendingDirection: direction,
        food: state.food ? clonePosition(state.food) : null,
        score: state.score,
        status: "game_over"
      };
    }

    var ateFood = state.food ? positionsEqual(newHead, state.food) : false;
    var nextSnake = [newHead].concat(currentSnake);
    if (!ateFood) {
      nextSnake.pop();
    }

    var hitSelf = false;
    for (var i = 1; i < nextSnake.length; i += 1) {
      if (positionsEqual(newHead, nextSnake[i])) {
        hitSelf = true;
        break;
      }
    }

    if (hitSelf) {
      return {
        width: state.width,
        height: state.height,
        snake: currentSnake,
        direction: direction,
        pendingDirection: direction,
        food: state.food ? clonePosition(state.food) : null,
        score: state.score,
        status: "game_over"
      };
    }

    var nextScore = state.score + (ateFood ? 1 : 0);
    var nextFood = ateFood
      ? placeFood(state.width, state.height, nextSnake, rng)
      : (state.food ? clonePosition(state.food) : null);

    var status = nextFood ? "running" : "won";

    return {
      width: state.width,
      height: state.height,
      snake: nextSnake,
      direction: direction,
      pendingDirection: direction,
      food: nextFood,
      score: nextScore,
      status: status
    };
  }

  var api = {
    DIRECTIONS: DIRECTIONS,
    createInitialState: createInitialState,
    isOppositeDirection: isOppositeDirection,
    placeFood: placeFood,
    step: step,
    withDirection: withDirection
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }

  global.SnakeLogic = api;
})(typeof window !== "undefined" ? window : globalThis);
