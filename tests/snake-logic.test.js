const test = require("node:test");
const assert = require("node:assert/strict");
const SnakeLogic = require("../assets/js/snake-logic.js");

test("moves forward in the current direction", () => {
  const initial = SnakeLogic.createInitialState({
    width: 6,
    height: 6,
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 }
    ],
    direction: "right",
    food: { x: 5, y: 5 }
  });

  const next = SnakeLogic.step({ ...initial, status: "running" });

  assert.deepEqual(next.snake, [
    { x: 3, y: 2 },
    { x: 2, y: 2 },
    { x: 1, y: 2 }
  ]);
  assert.equal(next.score, 0);
  assert.equal(next.status, "running");
});

test("grows and increments score when food is eaten", () => {
  const initial = SnakeLogic.createInitialState({
    width: 6,
    height: 6,
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 }
    ],
    direction: "right",
    food: { x: 3, y: 2 }
  });

  const next = SnakeLogic.step({ ...initial, status: "running" }, () => 0);

  assert.equal(next.snake.length, 4);
  assert.equal(next.score, 1);
  assert.equal(next.status, "running");
  assert.notDeepEqual(next.food, { x: 3, y: 2 });
});

test("detects wall collisions", () => {
  const initial = SnakeLogic.createInitialState({
    width: 4,
    height: 4,
    snake: [
      { x: 3, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 2 }
    ],
    direction: "right",
    food: { x: 0, y: 0 }
  });

  const next = SnakeLogic.step({ ...initial, status: "running" });

  assert.equal(next.status, "game_over");
  assert.deepEqual(next.snake, initial.snake);
});

test("detects self collisions", () => {
  const initial = SnakeLogic.createInitialState({
    width: 6,
    height: 6,
    snake: [
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 3, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: 2 }
    ],
    direction: "up",
    food: { x: 5, y: 5 }
  });

  const next = SnakeLogic.step({ ...initial, status: "running" });

  assert.equal(next.status, "game_over");
});

test("never places food on the snake", () => {
  const snake = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
  ];

  const food = SnakeLogic.placeFood(3, 3, snake, () => 0);

  assert.ok(food);
  assert.notDeepEqual(food, { x: 0, y: 0 });
  assert.notDeepEqual(food, { x: 1, y: 0 });
  assert.notDeepEqual(food, { x: 0, y: 1 });
});

test("blocks reversing direction", () => {
  const initial = SnakeLogic.createInitialState({
    width: 6,
    height: 6,
    direction: "right",
    snake: [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 }
    ],
    food: { x: 5, y: 5 }
  });

  const withReverse = SnakeLogic.withDirection(initial, "left");

  assert.equal(withReverse.pendingDirection, "right");
});
