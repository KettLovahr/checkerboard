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

        n_tile.onclick = function(ev) {
            if (n_tile.childElementCount == 0) {
                if (!n_tile.classList.contains("confirm")) {
                    n_tile.classList.add("confirm");
                    setTimeout(function() {n_tile.classList.remove("confirm")}, 3000);
                } else {
                    let qel = queens.children[0]
                    qel.draggable = false;

                    queen_positions[qel.queen_index] = {x: j, y: i}
                    validate();

                    ev.target.appendChild(qel);
                    n_tile.classList.remove("confirm")
                }
            }
        }

        n_tile.ondragover = function(ev) {
            ev.preventDefault();
        }

        n_tile.ondragenter = function(ev) {
            if (n_tile.childElementCount == 0)
            if (ev.dataTransfer.getData("is_queen")) {
                n_tile.classList.add("tiledraghover");
            }
        }

        n_tile.ondragleave = function(ev) {
            if (ev.dataTransfer.getData("is_queen")) {
                n_tile.classList.remove("tiledraghover");
            }
        }

        n_tile.ondrop = function(ev) {
            if (n_tile.childElementCount == 0) {
                let data = ev.dataTransfer.getData("text");
                let qel = document.getElementById(data);
                qel.draggable = false;

                queen_positions[qel.queen_index] = {x: j, y: i}
                validate();

                ev.target.appendChild(qel);
                n_tile.classList.remove("tiledraghover")
            } else {
                console.log("aí não dá né");
            }
        }
    }
}

for (let q = 0; q < 8; q++) {
    queen_positions.push({x: -1, y: -1})
    let n_queen = document.createElement("div");
    n_queen.draggable = true;
    queens.appendChild(n_queen);
    n_queen.classList.add("queen");
    n_queen.id = `queen${q}`;

    n_queen.queen_index = q;

    n_queen.ondragstart = function(ev) {
        ev.dataTransfer.setData("is_queen", true);
        ev.dataTransfer.setData("text", ev.target.id);
    }
}

function validate() {
    for (let i = 0; i < queen_amt; i++) {
        for (let j = i; j < queen_amt; j++) {
            if (j == i) continue;
            let i_coords = queen_positions[i];
            let j_coords = queen_positions[j];
            if (i_coords.x == -1 || j_coords.y == -1) continue;

            if (i_coords.x == j_coords.x || i_coords.y == j_coords.y || Math.abs(i_coords.x - j_coords.x) == Math.abs(i_coords.y - j_coords.y)) {
                setTimeout(
                    function() {
                        document.getElementById(`queen${i}`).parentElement.style.backgroundColor = "#D20";
                        document.getElementById(`queen${j}`).parentElement.style.backgroundColor = "#D20";
                        document.getElementById("result").style.display = "block";
                        document.getElementById("message").innerHTML = "Você Perdeu";
                    },
                    300
                );
                return false;
            }
        }
    }

    check_win();
    return true;
}

function check_win() {
    for (let i = 0; i < queen_amt; i++) {
        if (queen_positions[i].x == -1) {
            return false;
        }
    }
    document.getElementById("result").style.display = "block";
    document.getElementById("message").innerHTML = "Você Ganhou!";
    return true;
}
