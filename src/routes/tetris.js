/**
 * GAME VARIABLES - initialise the game state
 */
var settings = JSON.parse(localStorage.getItem('Settings'));
console.log(settings);
var gameType = settings.gametype;
var gameMode = settings.gamemode;
console.log(gameMode);
var gameLevel = settings.gamelevel;
var fieldWidth = settings.fieldwidth;
var fieldHeight = settings.fieldheight;
var colorT = document.querySelector(':root');

var currState;
var rndSeed = 1;
var score = 0;

var changeSpeed = false;
var speeds = [1500,1000,500,100,10];
var speedIndex = (gameLevel - 1);
var speed = speeds[speedIndex];

var currTetronimo = {x: 0, y: 0, shape: undefined};
var nextTetronimo;
var queue = [];
var queueIndex = 0;

// AI VARIABLES - manage AI gameplay behaviour
var ai = false; //turn ai on or off
if (gameMode.toUpperCase() == "AI") { // toggle ai
  ai = !ai;
}
var archive = { //stores values for ai archive
  populationSize: 0,
  genomes: [],
};
var genomes = []; //stores genomes
var currentGenome = -1; //index of current genome in genomes array
var moveAlgorithm = {}; // the move parameters
var inspectMoveSelection = false; // calculated best move


// GAME BOARD - 10x20 grid
var board = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];
    
// TETRONIMOS - square matrices for shapes
var tetronimos = {
  I: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
  J: [[1,0,0], [1,1,1], [0,0,0]],
  L: [[0,0,1], [1,1,1], [0,0,0]],
  O: [[1,1], [1,1]],
  S: [[0,1,1], [1,1,0], [0,0,0]],
  T: [[0,1,0], [1,1,1], [0,0,0]],
  Z: [[1,1,0], [0,1,1], [0,0,0]],
  Y: [[0,1,0], [0,1,1], [0,0,0]],
  H: [[0,0,0], [1,1,1], [0,0,0]],
};
    
// COLOURS - one for each tetronimo
var colors = {
  I: "539bf5", // blue
  J: "57ab5a", // green
  L: "c69026", // yellow
  O: "cc6b2c", // orange
  S: "e5534b", // red
  T: "986ee2", // purple
  Z: "c96198", // pink
  Y: "cdd9e5", // grey
  H: "ffdacf",  // brown
};

// MAIN FUNCTION - called on load
function initialize() {
  if (ai) {
    loadArchive("ai.js");
  }
  
  nextTetronimo(); // get the next tetronimo from queue
  applyTetronimo(); // apply tetronimo to board
  currState = getState();
  
  // GAME LOOP - repeats endlessly
  var loop = function(){
    if (changeSpeed) {
      clearInterval(interval); // restart the clock, stop time
      interval = setInterval(loop, speed); // set digital time
    }
    // update game state and game info panel
    update();
    updateInfoPanel();
  };
  var interval = setInterval(loop, speed); // set time interval
}
document.onLoad = initialize();

// KEY INPUTS - map user input
window.onkeydown = function (event) {
  var characterPressed = String.fromCharCode(event.keyCode);
  if (event.keyCode == 38) { // up arrow
    rotateTetronimo();
  } else if (event.keyCode == 40) { // down arrow
    moveDown();
  } else if (event.keyCode == 37) { // left arrow
    moveLeft();
  } else if (event.keyCode == 39) { // right arrow
    moveRight();
  } else if (event.keyCode == 32) { // space bar
    moveDrop();
  } else if (characterPressed.toUpperCase() == "Q") { // speed up
    speedIndex++;
    if (speedIndex >= speeds.length) {
      speedIndex = 0;
    }
    speed = speeds[speedIndex];
    changeSpeed = true;
  } else if (characterPressed.toUpperCase() == "A") { // slow down
    speedIndex--;
    if (speedIndex < 0) {
      speedIndex = speeds.length - 1;
    }
    speed = speeds[speedIndex];
    changeSpeed = true;
  } else if (characterPressed.toUpperCase() == "F") { // toggle ai move calc
    inspectMoveSelection = !inspectMoveSelection;
  } else {
    return true;
  }
  output(); // output game state to screen post key press
  return false;
};

/**
 * Gets looks ahead in the genome array and appropriately sets the current genome.
 */
function evaluateNextGenome() {
  //increment index in genome array
  currentGenome++;
  // return to start of array if at end
  if (currentGenome == genomes.length) {
    currentGenome = 0;
  }
  //and make the next move
  makeNextMove();
}

/**
 * Returns an array of all the possible moves that could occur in the current state, rated by the parameters of the current genome.
 * @return {Array} An array of all the possible moves that could occur.
 */
function getAllPossibleMoves() {
  var lastState = getState();
  var possibleMoves = [];
  var iterations = 0;
  //for each possible rotation
  for (var rots = 0; rots < 4; rots++) {
    var lastX = [];
    //for each iteration
    for (var t = -5; t <= 5; t++) {
      iterations++;
      loadState(lastState);
      for (var j = 0; j < rots; j++) { // rotate tetronimo
        rotateTetronimo();
      }
      if (t < 0) {
        for (var l = 0; l < Math.abs(t); l++) { // move left
          moveLeft();
        }
      } else if (t > 0) {
        for (var r = 0; r < t; r++) { // move right
          moveRight();
        }
      }
      // if tetronimo has been moved at all
      if (!contains(lastX, currTetronimo.x)) {
        var moveDownResults = moveDown(); // move down
        while (moveDownResults.moved) {
            moveDownResults = moveDown();
        }
        var algorithm = { // update 7 algorithm params
            rowsCleared: moveDownResults.rowsCleared,
            weightedHeight: Math.pow(getHeight(), 1.5),
            cumulativeHeight: getCumulativeHeight(),
            relativeHeight: getRelativeHeight(),
            holes: getHoles(),
            roughness: getRoughness()
        };
        // rate each move
        var rating = 0;
        rating += algorithm.rowsCleared * genomes[currentGenome].rowsCleared;
        rating += algorithm.weightedHeight * genomes[currentGenome].weightedHeight;
        rating += algorithm.cumulativeHeight * genomes[currentGenome].cumulativeHeight;
        rating += algorithm.relativeHeight * genomes[currentGenome].relativeHeight;
        rating += algorithm.holes * genomes[currentGenome].holes;
        rating += algorithm.roughness * genomes[currentGenome].roughness;
        // if the move loses the game, lower its rating
        if (moveDownResults.lose) {
          rating -= 500;
        }
        // collect all possible moves, their ratings and param values
        possibleMoves.push({rotations: rots, translation: t, rating: rating, algorithm: algorithm});
        // update last X value
        lastX.push(currTetronimo.x);
      }
    }
  }
  //get last state
  loadState(lastState);
  //return array of all possible moves
  return possibleMoves;
}

/**
 * Returns the highest rated move in the given array of moves.
 * @param  {Array} moves An array of possible moves to choose from.
 * @return {Move}       The highest rated move from the moveset.
 */
function getHighestRatedMove(moves) {
  var maxRating = -10000000000000;
  var maxMove = -1;
  var ties = [];
  // iterate through moves
  for (var index = 0; index < moves.length; index++) {
    // current move rating higher than maxrating
    if (moves[index].rating > maxRating) {
      maxRating = moves[index].rating; // update max rating to this move rating
      maxMove = index;
      ties = [index]; // store move index
    // current move rating same as maxrating
    } else if (moves[index].rating == maxRating) {
      ties.push(index); // store move index in ties array
    }
  }
  // eventually highest rated move is reached
  var move = moves[ties[0]];
  move.algorithm.ties = ties.length;
  return move;
}

/**
 * Makes a move, which is decided upon using the parameters in the current genome.
 */
function makeNextMove() {
  genomes[currentGenome].fitness = clone(score); //update this genomes fitness value using the game score
  evaluateNextGenome(); //and evaluates the next genome
  var possibleMoves = getAllPossibleMoves(); // get all possible moves
  var lastState = getState(); // store current state
  nextTetronimo(); // get next tetronimo
  //for each possible move 
  for (var i = 0; i < possibleMoves.length; i++) {
    var nextMove = getHighestRatedMove(getAllPossibleMoves()); // get best move in moveset
    possibleMoves[i].rating += nextMove.rating; // add rating to highest rated possible moves
  }
  loadState(lastState); //load current state
  var move = getHighestRatedMove(possibleMoves); // get overall highest rated move

  // PERFORM MOVE
  for (var rotations = 0; rotations < move.rotations; rotations++) { // rotate tetronimo
    rotateTetronimo();
  }
  if (move.translation < 0) {
    for (var lefts = 0; lefts < Math.abs(move.translation); lefts++) { // move left
      moveLeft();
    }
  } else if (move.translation > 0) { // move right
    for (var rights = 0; rights < move.translation; rights++) {
      moveRight();
    }
  }
  //update move algorithm
  if (inspectMoveSelection) {
    moveAlgorithm = move.algorithm;
  }
  // output state to screen and update game info panel
  output();
  updateInfoPanel();
}


/**
 * Updates the game.
 */
function update() {
  // AI mode selected and current genome is nonzero
  if (ai && currentGenome != -1) {
    var results = moveDown(); // move down
    // if move fails
    if (!results.moved) {
      if (results.lose) { // check game over
        genomes[currentGenome].fitness = clone(score); // update the fitness
        evaluateNextGenome(); //move on to the next genome
      } else {
        makeNextMove(); // game not over, do next move
      }
    }
  // AI mode not selected
  } else {
    moveDown(); // move down
  }
  // output state to screen and update game info panel
  output();
  updateInfoPanel();
}

/**
 * Moves the current Tetronimo down if possible.
 * @return {Object} The results of the movement of the Tetronimo.
 */
function moveDown() {
  var result = {lose: false, moved: true, rowsCleared: 0}; // move result possibilities
  removeTetronimo(); // remove tetronimo before drawing new one
  currTetronimo.y++; // move tetronimo down y axis
  // check board bottom edge collision
  if (collides(board, currTetronimo)) {
    currTetronimo.y--; // move back up
    applyTetronimo(); // apply to game board 
    nextTetronimo(); // get next tetronimo
    result.rowsCleared = clearRows(); // count rows cleared, if any
    if (collides(grid, currTetronimo)) { // check board top edge collision
      result.lose = true; // game over (dont need no reset opt)
      if (ai) {
      } else {
        reset();
      }
    }
    result.moved = false;
  }
  // apply to game board, increment score, update game info panel and output state to screen
  applyTetronimo();
  score++; // score mechanic need count row clear dont need for vis
  updateInfoPanel();
  output();
  return result;
}

/**
 * Moves the current tetronimo to the left if possible.
 */
function moveLeft() {
  // remove current tetronimo and move left
  removeTetronimo();
  currTetronimo.x--;
  // if collision undo move
  if (collides(board, currTetronimo)) {
    currTetronimo.x++;
  }
  // apply to game board
  applyTetronimo();
}

/**
 * Moves the current shape to the right if possible.
 */
function moveRight() {
  // remove current tetronimo and move right
  removeTetronimo();
  currTetronimo.x++;
  // if collision undo move
  if (collides(board, currTetronimo)) {
    currTetronimo.x--;
  }
  // apply to game board
  applyTetronimo();
}

/**
 * Rotates the current shape clockwise if possible.
 */
function rotateTetronimo() {
  // remove current tetronimo and rotate
  removeTetronimo();
  currTetronimo.shape = rotate(currTetronimo.shape, 1);
  // if collision undo rotation
  if (collides(grid, currTetronimo)) {
    currTetronimo.shape = rotate(currTetronimo.shape, 3);
  }
  // apply to game board
  applyTetronimo();
}

/**
 * Clears any rows that are completely filled.
 */
function clearRows() {
  var rowsToClear = [];
  //for each row in the grid
  for (var row = 0; row < board.length; row++) {
    var containsEmptySpace = false;
    //for each column
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] === 0) { // if empty, mark cell
        containsEmptySpace = true;
      }
    }
    // no empty columns
    if (!containsEmptySpace) { 
      rowsToClear.push(row); // mark row to clear
    }
  }
  // increase score
  if (rowsToClear.length == 1) {
    score += 100;
  } else if (rowsToClear.length == 2) {
    score += 300;
  } else if (rowsToClear.length == 3) {
    score += 600;
  } else if (rowsToClear.length >= 4) {
    score += 1000;
  }

  // CLEAR ROWS
  var rowsCleared = clone(rowsToClear.length);
  for (var toClear = rowsToClear.length - 1; toClear >= 0; toClear--) {
    board.splice(rowsToClear[toClear], 1); // remove rows from board
  }
  while (grid.length < 20) {
    board.unshift([0,0,0,0,0,0,0,0,0,0]); // shift other rows
  }
  return rowsCleared; // return cleared rows
}

/**
 * Applies the current tetronimo to the grid.
 */
function applyTetronimo() {
  // for each value in current tetronimo (row x column)
  for (var row = 0; row < currTetronimo.shape.length; row++) {
    for (var col = 0; col < currTetronimo.shape[row].length; col++) {
      // if tetronimo coord non-empty apply to board
      if (currTetronimo.shape[row][col] !== 0) {
        board[currTetronimo.y + row][currTetronimo.x + col] = currTetronimo.shape[row][col];
      }
    }
  }
}

/**
 * Removes the current tetronimo from the grid.
 */
function removeTetronimo() {
  // for each value in current tetronimo (row x column)
  for (var row = 0; row < currTetronimo.shape.length; row++) {
    for (var col = 0; col < currTetronimo.shape[row].length; col++) {
      if (currTetronimo.shape[row][col] !== 0) {
        // if tetronimo coord non-empty remove from board
        board[currTetronimo.y + row][currTetronimo.x + col] = 0;
      }
    }
  }
}

/**
 * Cycles to the next tetronimo in the queue.
 */
function nextTetronimo() {
  // increment queue index
  queueIndex += 1;
  // test for start or end of queue
  if (queue.length === 0 || queueIndex == queue.length) {
    // get new queue of shapes
    generateQueue();
  }
  // if near queue end
  if (queueIndex == queue.length - 1) {
    var lastSeed = rndSeed; // store last seed
    nextTetronimo = randomProperty(tetronimos); // get next tetronimo
    rndSeed = lastSeed; // get random seed back
  } else {
    nextTetronimo = tetronimos[queue[queueIndex + 1]]; // get next tetronimo
  }
  currTetronimo.shape = tetronimos[queue[queueIndex]]; // get current tetronimo from queue
  currTetronimo.x = Math.floor(board[0].length / 2) - Math.ceil(currTetronimo.shape[0].length / 2); // set x start
  currTetronimo.y = 0; // set y start
}

/**
 * Generates the queue of tetronimos.
 */
function generateQueue() {
  queue = [];
  var contents = "";
  for (var i = 0; i < 7; i++) {
    // generate tetronimo randomly
    var tetronimo = randomKey(tetronimos);
    while(contents.indexOf(tetronimo) != -1) {
        tetronimo = randomKey(tetronimo);
    }
    // add tetronimo to queue
    queue[i] = tetronimo;
    contents += tetronimo;
  }
  // reset queue index
  queueIndex = 0;
}

/**
 * Resets the game.
 */
function reset() {
  score = 0;
  board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];
  moves = 0;
  generateQueue();
  nextTetronimo();
}

/**
 * Determines if the board and tetronimo collide with one another.
 * @param  {Board} scene  The board to check.
 * @param  {Tetronimo} object The tetronimo to check.
 * @return {Boolean} Whether the board and tetronimo collide.
 */
function collides(scene, object) {
  // for the size of the tetronimo (row x column)
  for (var row = 0; row < object.shape.length; row++) {
    for (var col = 0; col < object.shape[row].length; col++) {
      // if not empty and collides, return true
      if (object.shape[row][col] !== 0) {
        if (scene[object.y + row] === undefined || scene[object.y + row][object.x + col] === undefined || scene[object.y + row][object.x + col] !== 0) {
          return true;
        }
      }
    }
  }
  return false;
}

// calculate number of rotations
function rotate(matrix, times) {
  for (var t = 0; t < times; t++) { // for each time
    matrix = transpose(matrix);
    for (var i = 0; i < matrix.length; i++) { // reverse each column over the matrix length
      matrix[i].reverse();
    }
  }
  return matrix;
}

// transpose matrix
function transpose(array) {
  return array[0].map(function(col, i) {
    return array.map(function(row) {
        return row[i];
    });
  });
}

// DRAW GAME SCREEN
/**
 * Outputs the state to the screen.
 */
function output() {
  var gameScreen = document.getElementById("gamescreen");
  var html = "<h1>Tetris</h1><br />" + space;
  var space = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
  // dont need - make draw blocks
  for (var i = 0; i < board.length; i++) {
    if (i === 0) {
      html += "[" + board[i] + "]";
    } else {
      html += "<br />" + space + "[" + board[i] + "]";
    }
  }
  // html += "];"; dont need
  // COLOUR TETRONIMO
  for (var c = 0; c < colors.length; c++) {
    html = replaceAll(html, "," + (c + 1), ",<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>");
    html = replaceAll(html, (c + 1) + ",", "<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>,");
  }
  gameScreen.innerHTML = html;
}


/**
 * Updates the side information panel.
 */
function updateInfoPanel() {
  var gameInfo = document.getElementById("gameinfo");
  var html = "<br /><br /><h2>&nbsp;</h2><h2>Game Score: " + score + "</h2>";
  html += "<br /><em>Lines: " + speed + "</em>";
  updateNextTetronimo();
  html += "<br />Game Level: " + (speedIndex + 1);
  html += "<br />Game Type: " + gameType;
  html += "<br />Game Mode: " + gameMode;
  if (ai) {
    if (inspectMoveSelection) {
      html += "<br /><pre style=\"font-size:12px\">" + JSON.stringify(moveAlgorithm, null, 2) + "</pre>"; // show ai calc
    }
  }
  html = replaceAll(replaceAll(replaceAll(html, "&nbsp;,", "&nbsp;&nbsp;"), ",&nbsp;", "&nbsp;&nbsp;"), ",", "&nbsp;");
  gameInfo.innerHTML = html;
}


/**
 * Updates the next tetronimo in the side information panel.
 */
 function updateNextTetronimo() {
  html += "<br /><b>--Upcoming Shape--</b>";
  for (var i = 0; i < nextTetronimo.length; i++) {
    var next =replaceAll((nextTetronimo[i] + ""), "0", "&nbsp;");
    html += "<br />&nbsp;&nbsp;&nbsp;&nbsp;" + next;
  }
  for (var l = 0; l < 4 - nextTetronimo.length; l++) {
    html += "<br />";
  }
  var keyT = nextTetronimo.key;
  colorT.style.setProperty('--tetronimo-color', colors[keyT]);
  html = replaceAll(html, "1", "<span class=\"#box\"></span>");
  // for (var c = 0; c < colors.length; c++) {
  //   html = replaceAll(html, "," + (c + 1), ",<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>");
  //   html = replaceAll(html, (c + 1) + ",", "<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>,");
  // }
}

/**
 * Returns the current game state in an object.
 * @return {State} The current game state.
 */
function getState() {
  var state = {
    board: clone(board),
    currTetronimo: clone(currTetronimo),
    nextTetronimo: clone(nextTetronimo),
    queue: clone(queue),
    queueIndex: clone(queueIndex),
    rndSeed: clone(rndSeed),
    score: clone(score)
  };
  return state;
}

/**
 * Loads the game state from the given state object.
 * @param  {State} state The state to load.
 */
function loadState(state) {
  board = clone(state.board);
  currTetronimo = clone(state.currTetronimo);
  nextTetronimo = clone(state.nextTetronimo);
  queue = clone(state.queue);
  queueIndex = clone(state.queueIndex);
  rndSeed = clone(state.rndSeed);
  score = clone(state.score);
  output();
  updateInfoPanel();
}

// GAME STATS HELPER FUNCTIONS
/**
 * Returns the cumulative height of all the columns.
 * @return {Number} The cumulative height.
 */
function getCumulativeHeight() {
  removeTetronimo();
  var peaks = [20,20,20,20,20,20,20,20,20,20];
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0 && peaks[col] === 20) {
        peaks[col] = row;
      }
    }
  }
  var totalHeight = 0;
  for (var i = 0; i < peaks.length; i++) {
    totalHeight += 20 - peaks[i];
  }
  applyTetronimo();
  return totalHeight;
}

/**
 * Returns the number of holes in the board.
 * @return {Number} The number of holes.
 */
function getHoles() {
  removeTetronimo();
  var peaks = [20,20,20,20,20,20,20,20,20,20];
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0 && peaks[col] === 20) {
        peaks[col] = row;
      }
    }
  }
  var holes = 0;
  for (var x = 0; x < peaks.length; x++) {
    for (var y = peaks[x]; y < board.length; y++) {
      if (board[y][x] === 0) {
        holes++;
      }
    }
  }
  applyTetronimo();
  return holes;
}

/**
 * Returns an array that replaces all the holes in the board with -1.
 * @return {Array} The modified board array.
 */
function getHolesArray() {
  var array = clone(board);
  removeTetronimo();
  var peaks = [20,20,20,20,20,20,20,20,20,20];
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0 && peaks[col] === 20) {
        peaks[col] = row;
      }
    }
  }
  for (var x = 0; x < peaks.length; x++) {
    for (var y = peaks[x]; y < board.length; y++) {
      if (board[y][x] === 0) {
        array[y][x] = -1;
      }
    }
  }
  applyTetronimo();
  return array;
}

/**
 * Returns the normalised roughness of cells on the board.
 * @return {Number} The roughness of the board.
 */
function getRoughness() {
  removeTetronimo();
  var peaks = [20,20,20,20,20,20,20,20,20,20];
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0 && peaks[col] === 20) {
        peaks[col] = row;
      }
    }
  }
  var roughness = 0;
  var differences = [];
  for (var i = 0; i < peaks.length - 1; i++) {
    roughness += Math.abs(peaks[i] - peaks[i + 1]);
    differences[i] = Math.abs(peaks[i] - peaks[i + 1]);
  }
  applyTetronimo();
  return roughness;
}

/**
 * Returns the relative column heights on the board.
 * @return {Number} The relative height.
 */
function getRelativeHeight() {
  removeTetronimo();
  var peaks = [20,20,20,20,20,20,20,20,20,20];
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0 && peaks[col] === 20) {
        peaks[col] = row;
      }
    }
  }
  applyTetronimo();
  return Math.max.apply(Math, peaks) - Math.min.apply(Math, peaks);
}

/**
 * Returns the height of the largest column on the board.
 * @return {Number} The absolute height.
 */
function getHeight() {
  removeTetronimo();
  var peaks = [20,20,20,20,20,20,20,20,20,20];
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[row].length; col++) {
      if (board[row][col] !== 0 && peaks[col] === 20) {
        peaks[col] = row;
      }
    }
  }
  applyTetronimo();
  return 20 - Math.min.apply(Math, peaks);
}

/**
 * Loads the stored ai archive.
 * @param  {String} aiArchiveString The stringified json ai archive.
 */
function loadArchive(aiArchiveString) {
    archive = aiArchive;
    genomes = clone(archive.genomes);
    populationSize = archive.populationSize;
    currentGenome = 0;
    reset();
    currState = getState();
    console.log("Archive loaded!");
}

// OBJECT HELPER FUNCTIONS
/**
 * Clones an object.
 * @param  {Object} obj The object to clone.
 * @return {Object}     The cloned object.
 */
function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns a random property from the given object.
 * @param  {Object} obj   The object to select a property from.
 * @return {Property}     A random object property.
 */
function randomProperty(obj) {
  return(obj[randomKey(obj)]);
}

/**
 * Returns a random property key from the given object.
 * @param  {Object} obj   The object to select a property key from.
 * @return {Property}     A random object property key.
 */
function randomKey(obj) {
  var keys = Object.keys(obj);
  var i = seededRandom(0, keys.length);
  return keys[i];
}

/**
 * Returns a randomly selected clone of one of two properties.
 * @param propOne The minimum range value, inclusive.
 * @param propTwo The maximum range value, exclusive.
 * @return        The roughness of the board.
 */
 function randomChoice(propOne, propTwo) {
  if (Math.round(Math.random()) === 0) {
    return clone(propOne);
  } else {
    return clone(propTwo);
  }
}

/**
 * Returns a boolean based on whether a collection contains a given object.
 * @param a           The collection to search.
 * @param obj         The object to find.
 * @return {Boolean}  The boolean representing membership of obj in a.
 */
function contains(a, obj) {
  var i = a.length;
  while (i--) {
    if (a[i] === obj) {
      return true;
    }
  }
  return false;
}

/**
 * Returns the search string with target replaced by replacement.
 * @return  The edited string.
 */
function replaceAll(target, search, replacement) {
  return target.replace(new RegExp(search, 'g'), replacement);
}

// MATH HELPER FUNCTIONS
/**
 * Returns a random number from a seeded random number generator.
 * @param  {Number} min The minimum range value, inclusive.
 * @param  {Number} max The maximum range value, exclusive.
 * @return {Number}     The generated random number.
 */
function seededRandom(min, max) {
  max = max || 1;
  min = min || 0;
  rndSeed = (rndSeed * 1337 + 42069) % 80085;
  var rnd = rndSeed / 8008135;
  return Math.floor(min + rnd * (max - min));
}

/**
 * Returns a random number between min and max.
 * @param  {Number} min The minimum range value, inclusive.
 * @param  {Number} max The maximum range value, exclusive.
 * @return {Number}     The randomly selected number.
 */
function randomNumBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns a weighted number calculated from a random selection between min and max.
 * @param  {Number} min The minimum range value, inclusive.
 * @param  {Number} max The maximum range value, exclusive.
 * @return {Number}     The weighted number.
 */
function randomWeightedNumBetween(min, max) {
  return Math.floor(Math.pow(Math.random(), 2) * (max - min + 1) + min);
}
