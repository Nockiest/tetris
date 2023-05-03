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

export  {removeClassForAll,isOnSameColumn}