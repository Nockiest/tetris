export default function createGrid(height, width) {
  let table = document.getElementById("table");

  for (let i = 0; i <= height-1; i++) {
    let row = table.insertRow();
    for (let y = 0; y < width; y++) {
      var cell = row.insertCell();
      cell.innerHTML = i * width + y;
      cell.id = i * 10 + y;
      // console.log(cell.id)
      cell.classList.add("cell"); // Use classList.add() to add a class
    
    }
  }

  // console.log(table)
}

export function createCodeGameRepresentation(height, width) {
  let grid = [];

  for (let i = 0; i < height; i++) {
    let row = [];
    for (let y = 0; y < width; y++) {
      row.push(0); // 0 represents an empty cell
    }
    grid.push(row);
  }

  return grid;
}
