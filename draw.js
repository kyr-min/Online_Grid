var canvas = document.getElementById("grid");
var cx = canvas.getContext('2d');


function print_cor(e) {
    var cors = document.getElementById('cor');

    var x_cor = parseInt((e.offsetX - 400) / 25);
    var y_cor = parseInt((e.offsetY * -1 + 400) / 25);

    var text = "x= " + x_cor + "\n" + "y= " + y_cor;
    cors.innerText = text;
}

window.addEventListener("load", () => {

    var color = document.getElementById("color");

    let painting = false;

    function startPosition() {
        painting = true;
    }

    function finishedPosition() {
        painting = false;
        cx.beginPath();
    }

    function draw(e) {
        if (!painting)
            return;
        cx.lineWidth = 5;
        cx.lineCap = "round";

        cx.lineTo(e.offsetX, e.offsetY);
        cx.strokeStyle = color;
        cx.stroke();

        cx.beginPath();
        cx.moveTo(e.offsetX, e.offsetY)

    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
})

