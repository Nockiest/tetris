// Import stylesheets
import './style.css';
import createGrid from './grid';
import {removeClassForAll,isOnSameColumn} from './utils';

 

function checkForWalls(movedSquare) {
  let areSquaresAtBorder = [];
  for (let square in movedSquare) {
    let isSquareAtBorder = {
      index: square,
      left: isOnSameColumn(0, movedSquare[square], width),
      right: isOnSameColumn(width - 1, movedSquare[square], width),
    };
    areSquaresAtBorder.push(isSquareAtBorder);
  }
  return areSquaresAtBorder;
  //   console.log(areSquaresAtBorder,"xyz")
}

function cellCrossesTheEdge(squareIndex) {
 // console.log(squareIndex,"cyz")
  const crossesLeftEdge = isOnSameColumn(0, squareIndex, width);
  const crossesRightEdge = isOnSameColumn(width - 1, squareIndex, width);
  return crossesLeftEdge ? "left" : crossesRightEdge ? "right" : false;
}

window.addEventListener(
  'keydown',
  function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
 let cellsIsOnTheLeft = false;
 let cellsIsOnTheRight = false;
    for(let square in movedSquare){   
      console.log((movedSquare[square]-1),(movedSquare[square]+1),"fff")
      cellsIsOnTheLeft= cellCrossesTheEdge(movedSquare[square]-1) === "left";
      cellsIsOnTheRight= cellCrossesTheEdge(movedSquare[square]) === "right";       
    }
   // console.log(movedSquare,cellsIsOnTheLeft,cellsIsOnTheRight,"edges")

    switch (event.key) {
      case 'ArrowDown':
        //console.log('down');
        if(!checkForGround(movedSquare)){moveSquare(movedSquare, width)};
        break;
      case 'ArrowRight':
        if(!cellsIsOnTheRight){moveSquare(movedSquare, +1)};
        break;
      case 'ArrowLeft':
        if(!cellsIsOnTheLeft){moveSquare(movedSquare, -1)};
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);

function generateSquare(topLeftSquare) {
  console.log(topLeftSquare)
  //console.log(topLeftSquare);
  let position1 = topLeftSquare;
  let positions = [position1, position1 + 1, position1 + 10, position1 + 11];

  for (let position in positions) {
    let cell = document.getElementById(positions[position]);
    cell.classList.add('moving');
  }
  return positions;
}

function moveSquare(movedSquare, changeInIndex) {
  removeClassForAll('moving');
  generateSquare(movedSquare[0] + changeInIndex);
  //console.log(movedSquare,"move")

  for (let square in movedSquare) {
    movedSquare[square] += changeInIndex;
  }
}

function checkForGround(movedSquare) {
 // console.log(movedSquare[2], movedSquare[3], 'cehckground');
  let cellsUnderSquare1 = document
    .getElementById(movedSquare[2] + width)
    .classList.contains('filled');
  let cellsUnderSquare2 = document
    .getElementById(movedSquare[3] + width)
    .classList.contains('filled');
 // console.log(cellsUnderSquare1 || cellsUnderSquare2);
  return cellsUnderSquare1 || cellsUnderSquare2;
}

function processIteration() {
  console.log(movedSquare)
  try {
    if(movedSquare === null){
      return movedSquare = generateSquare(Math.floor(Math.random() * width));
    }
   // console.log(movedSquare);
    checkForWalls(movedSquare);
    let hitGround = checkForGround(movedSquare);

    if (!hitGround) {
      moveSquare(movedSquare, width);
    } else {
      transformSquaretoGround(movedSquare);
      movedSquare = null;
    }
  } catch (error) {
    console.error(error);
    clearInterval(processTurn); // stop the interval
  }
}

function transformSquaretoGround(movedSquare) {
  if(movedSquare === null){return console.log("square doesnt exist")}
  for (let square in movedSquare) {
    let cell = document.getElementById(movedSquare[square]);
    cell.classList.remove('moving');
    cell.className = 'filled';
  }
  movedSquare = null
  removeClassForAll('moving');
}

let movedSquare = null;
let height = 10;
let width = 10;
createGrid(height, width);
let processTurn = setInterval((movedSquare) => processIteration(movedSquare), 5000);
