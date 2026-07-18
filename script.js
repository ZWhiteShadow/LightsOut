/* Created by Wade Helquist */
var BLUE = "#38bdf8";
var RED = "#fb7185";

var requestedSize = Number(prompt("Pick a grid size from 1 to 10", "3"));
var gridSize = Number.isInteger(requestedSize) && requestedSize >= 1 && requestedSize <= 10
  ? requestedSize
  : 3;

var tileSize = Math.max(24, Math.min(52, Math.floor((280 - gridSize * 4) / gridSize)));
document.documentElement.style.setProperty("--tile-size", tileSize + "px");

var buttons = [];
var array_of_ids = [];

for (var i = 1; i <= gridSize; i++) {
  for (var j = 1; j <= gridSize; j++) {
    var id = "s" + i + j;
    buttons.push('<button type="button" aria-label="Tile ' + i + ', ' + j +
      '" onclick="sc(' + i + ", " + j + ')" id="' + id + '" class="but">X</button>');
    array_of_ids.push(id);
    if (j === gridSize) buttons.push("<br>");
  }
}

document.querySelector("#container").innerHTML = buttons.join("");

var count = 0;
var nextSolution = "O";
var totalTime = 0;
var bestTime = 0;
var time_string = "";

setGoal("BLUE", BLUE);
changeColor();
randomize(gridSize * gridSize);

var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60, 10));
}

function pad(val) {
  return val < 10 ? "0" + val : String(val);
}

function pause() {
  alert("Click OK when ready to continue");
}

function randomize(turns) {
  for (var loop = 0; loop <= turns; loop++) {
    sc(
      Math.floor(Math.random() * gridSize) + 1,
      Math.floor(Math.random() * gridSize) + 1
    );
    solve();
  }
}

function s(tileId) {
  var tile = document.getElementById(tileId);
  tile.innerText = tile.innerText === "O" ? "X" : "O";
}

function sc(row, col) {
  s("s" + row + col);

  if (row - 1 > 0) s("s" + (row - 1) + col);
  if (row + 1 <= gridSize) s("s" + (row + 1) + col);
  if (col - 1 > 0) s("s" + row + (col - 1));
  if (col + 1 <= gridSize) s("s" + row + (col + 1));

  solve();
}

function solve() {
  if (nextSolution === "X" && totalSeconds > 0 && changeColor() === gridSize * gridSize) {
    nextSolution = "O";
    setGoal("BLUE", BLUE);
    setTheme(BLUE, RED, false);
    solveEnd();
  }

  if (nextSolution === "O" && totalSeconds > 0 && changeColor() === gridSize * gridSize) {
    nextSolution = "X";
    setGoal("RED", RED);
    setTheme(RED, BLUE, true);
    solveEnd();
  }

  changeColor();
}

function setGoal(name, color) {
  document.getElementById("nextSolution").innerHTML =
    'Solve for <strong style="color:' + color + '">' + name + "</strong>.";
}

function setTheme(primary, secondary, redTurn) {
  color1(["minutes", "seconds"], primary, ["count", "stats", "stats2"], secondary);
  color2("button1", primary);
  color2("button2", secondary);

  var background = document.getElementById("background");
  background.style.backgroundImage = redTurn
    ? "linear-gradient(145deg, rgba(48, 18, 35, .98), rgba(8, 12, 27, .98))"
    : "linear-gradient(145deg, rgba(19, 27, 52, .98), rgba(8, 12, 27, .98))";
}

function solveEnd() {
  if (bestTime === 0 || totalSeconds < bestTime) bestTime = totalSeconds;

  totalTime += totalSeconds;
  count += 1;

  document.getElementById("count").innerHTML =
    "Solved <b>" + count + "</b> time" + (count === 1 ? "" : "s") + " in " + min_and_sec(totalTime);
  document.getElementById("stats").innerHTML =
    "Average: " + min_and_sec(totalTime / count);
  document.getElementById("stats2").innerHTML =
    "Best: " + min_and_sec(bestTime);

  alert("You solved it!");
  totalSeconds = 0;
  randomize(gridSize * gridSize);
}

function changeColor() {
  var win_count = 0;

  for (var i = 0; i < gridSize * gridSize; i++) {
    var tile = document.getElementById(array_of_ids[i]);

    if (tile.innerText === "O") {
      tile.style.background = BLUE;
      if (nextSolution === "O") win_count += 1;
    } else {
      tile.style.background = RED;
      if (nextSolution === "X") win_count += 1;
    }
  }

  return win_count;
}

function min_and_sec(time) {
  if (time >= 60) {
    return "<b>" + Math.floor(time / 60) + "</b>m <b>" + Math.floor(time % 60) + "</b>s";
  }

  return "<b>" + time.toFixed(0) + "</b>s";
}

function color1(ids, color, secondaryIds, secondaryColor) {
  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).style.color = color;
  }

  for (var j = 0; j < secondaryIds.length; j++) {
    document.getElementById(secondaryIds[j]).style.color = secondaryColor;
  }
}

function color2(id, color) {
  document.getElementById(id).style.background = color;
}
