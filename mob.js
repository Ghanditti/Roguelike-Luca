const { mobhp } = require("./main");

let mob = {
    hp: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
    position: { x: 1, y: 1 },
    alive: 1
};
exports.mob = mob;
