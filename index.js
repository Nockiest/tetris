
import createGrid from './grid.js';
import {removeClassForAll,isOnSameColumn,checkForWalls/*checkGridCellFree*/} from './utils.js';

 
function cellCrossesTheEdge(movedSquare) {
  for (let i = 0; i < movedSquare.length; i++) {
    const squareIndex = movedSquare[i];
    const crossesLeftEdge = isOnSameColumn(0, squareIndex, width);
    const crossesRightEdge = isOnSameColumn(width - 1, squareIndex, width);
    if (crossesLeftEdge || crossesRightEdge) {
      return crossesLeftEdge ? "left" : "right";
    }
  }
  return false;
}

function checkForGround(movedSquare) {
  for(let square in movedSquare){
   if(document.getElementById(movedSquare[square]+width).classList.contains('filled') ){
    return true;
   }
  }
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
      cellsIsOnTheLeft= cellCrossesTheEdge(movedSquare ) === "left";
      cellsIsOnTheRight= cellCrossesTheEdge(movedSquare ) === "right";       
    }
   // console.log(movedSquare,cellsIsOnTheLeft,cellsIsOnTheRight,"edges")

    switch (event.key) {
      case 'ArrowDown':
        //console.log('down');
        if(!checkForGround(movedSquare)){
          moveSquare(movedSquare, width)
        } else {
          transformSquaretoGround(movedSquare)
          movedSquare = null;
        };
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
  for (let square in movedSquare) {
    movedSquare[square] += changeInIndex;
  }
}

function processIteration() {
  console.log(movedSquare)
  try {
    if(movedSquare === null){
      return movedSquare = generateSquare(Math.abs(Math.floor(Math.random() * (width-1))));
    }
    checkForWalls(movedSquare,width);
    const SomeRowRemoved = removeFilledRows();
    console.log(SomeRowRemoved,"xyz")
    if(SomeRowRemoved){dropFilledSquaresDown()} ;
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

function removeFilledRows() {
  const table = document.getElementById("table");
  const rows = table.getElementsByTagName("tr");
  let hasRemovedRow = false;
  for (let i = 0; i < rows.length-1; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let isRowFilled = true;

    for (let j = 0; j < cells.length; j++) {
      if (!cells[j].classList.contains("filled")) {
        isRowFilled = false;
        break;
      }
    }
    if (isRowFilled) {
      for (let j = 0; j < cells.length; j++) {
        cells[j].classList.remove("filled"); 
        cells[j].classList.add("cell");
        hasRemovedRow = true;
        console.log(hasRemovedRow)
         clearInterval(processTurn)/************************************** */
      }
    }
    return hasRemovedRow
  }
   
}

function dropFilledSquaresDown() {
  const table = document.getElementById("table");
  const rows = table.getElementsByTagName("tr");
  const filledCells = Array.from(document.querySelectorAll('.filled'));
  //console.log(filledCells) 

  for (let i = filledCells.length-1; i >= 0; i--) {
    function isCellUnderFilled(cellUnder,cell) {
      console.log(cellUnder,"X")
      if (!cellUnder) {  // stop the recursion if the cell underneath is null
        console.log("cellUnder is null")
        return;
      }
  
      if (cellUnder.classList.contains('filled')) {
        
         if(cell.id == cellUnder.id-width){ return}
        
        closestCellUnder = cellUnder ;
        let closestUnfilledCell = document.getElementById(closestCellUnder.id - width)
        // console.log(closestUnfilledCell,closestCellUnder.id - width,closestCellUnder.id,cell)
        closestUnfilledCell.classList.add("filled"); 
        cell.classList.remove("filled")
        cell.classList.add("cell")
        // console.log(closestUnfilledCell)
        // clearInterval(processTurn)/************************************ */
      } else {
        isCellUnderFilled(table.rows[cellUnder.parentNode.rowIndex + 1].cells[cellUnder.cellIndex],cell);
      }
       
    }
    const cellId = filledCells[i].id;
    let closestCellUnder = null;
    const rowIndex = filledCells[i].parentNode.rowIndex + 1;
    const cellIndex = filledCells[i].cellIndex;
    console.log(cellId,"y")
    if (table.rows[rowIndex]) { // Check if the row exists
      isCellUnderFilled(table.rows[rowIndex].cells[cellIndex],filledCells[i]);
    }
  }
  
}
 

let movedSquare = null;
let height = 10;
let width = 10;
createGrid(height, width);
let processTurn = setInterval((movedSquare) => processIteration(movedSquare),200);

/* dokoduj funkci na dropování čtverců
oprav chybu s pomalou odezvou mazání čtverců
přidej nové tvary do hry
otáčej tvary

  // for (let i = rows.length - 1; i >= 0; i--) {
  //   const cells = rows[i].getElementsByTagName("td");

  //   for (let j = 0; j < cells.length; j++) {
  //     if (cells[j].classList.contains("filled")) {
  //       let currentIndex = i * width + j;
  //       let foundFilledCell = false;

  //       while (currentIndex < width * height - width) {
  //         currentIndex += width;

  //         if (document.getElementById(currentIndex).classList.contains("filled")) {
  //           foundFilledCell = true;
  //           break;
  //         }
  //       }

  //       if (!foundFilledCell) {
  //         let newRowIndex = i - 1;
  //         while (newRowIndex >= 0) {
  //           const newCell = document.getElementById(newRowIndex * width + j);
  //           if (newCell.classList.contains("filled")) {
  //             break;
  //           }
  //           newRowIndex--;
  //         }

  //         cells[j].classList.remove("filled");
  //         const newCell = document.getElementById((newRowIndex + 1) * width + j);
  //         newCell.classList.add("filled");
  //       }
  //     }
  //   }
  // }
*/