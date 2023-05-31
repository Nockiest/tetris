function removeClassForAll(className) {
  let cellsWithClass = document.querySelectorAll('.' + className);
  if (cellsWithClass.length > 0) {
    for (let i = 0; i < cellsWithClass.length; i++) {
      cellsWithClass[i].classList.remove(className);
    }
  }
}

function isOnSameColumn(index1, index2, width) {
  //console.log(index1 % width === index2 % width)
  return index1 % width === index2 % width;
}

function checkGridCellFree(square){
  return document.getElementById(square).classList.contains('filled');
}

function checkForWalls(movedSquare, width) {
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

 
function cellCrossesTheEdge(movedSquare,width) {
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

// function indexToCoordinates(index, width) {
//   const x = index % width;
//   const y = Math.floor(index / width);
//   return [x, y];
// }

export  {removeClassForAll,isOnSameColumn,checkForWalls,checkGridCellFree,cellCrossesTheEdge, }