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

export  {removeClassForAll,isOnSameColumn,checkForWalls,checkGridCellFree}