export default function createGrid(height, width) {
  let table = document.getElementById("table");

  for (let i = 0; i <= height; i++) {
    let row = table.insertRow();
    for (let y = 0; y < width; y++) {
      var cell = row.insertCell();
      cell.innerHTML = i * width + y;
      cell.id = i * 10 + y;
      // console.log(cell.id)
      cell.classList.add("cell"); // Use classList.add() to add a class
      if (i == height) {
        cell.classList.add("filled");
      }
    }
  }

  // console.log(table)
}
