let width = 8;
let height = 8;
let queen_amt = 8;
let queen_positions = []


let board = document.getElementById("board");
let queens = document.getElementById("queens");

for (let i = 0; i < width; i++) {
    let n_row = document.createElement("div");
    board.appendChild(n_row);
    n_row.classList.add("row");
    for (let j = 0; j < height; j++) {
        let n_tile = document.createElement("div")
        n_row.appendChild(n_tile);
        n_tile.classList.add("tile");
        n_tile.style.backgroundColor = (i + j) % 2 == 0 ? "#DA9" : "#533";

        n_tile.ondragover = function(ev) {
            ev.preventDefault();
        }

        n_tile.ondragenter = function(ev) {
            n_tile.style.filter = "brightness(2.0)"
            n_tile.style.border = "solid 2px #00A2E8"
        }

        n_tile.ondragleave = function(ev) {
            n_tile.style.filter = "brightness(1.0)"
            n_tile.style.border = "solid 0px #00A2E8"
        }

        n_tile.ondrop = function(ev) {
            console.log("AAAAAA");
            let data = ev.dataTransfer.getData("text");

            ev.target.appendChild(document.getElementById(data));
            n_tile.style.filter = "brightness(1.0)"
            n_tile.style.border = "solid 0px #00A2E8"
        }
    }
}

for (let q = 0; q < 8; q++) {
    let n_queen = document.createElement("div");
    n_queen.draggable = true;
    queens.appendChild(n_queen);
    n_queen.classList.add("queen");
    n_queen.queen_index = q;

    n_queen.ondragstart = function(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }
}
