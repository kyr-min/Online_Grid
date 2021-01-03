var canvas = document.getElementById('grid');
var cx = canvas.getContext('2d');


function print_cor(e) {
    var cors = document.getElementById('cor');

    var x_cor = parseInt((e.offsetX - 400) / 25);
    var y_cor = parseInt((e.offsetY * -1 + 400) / 25);

    var text = "x= " + x_cor + "\n" + "y= " + y_cor;
    cors.innerText = text;
}

window.addEventListener("load", () => {

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
        cx.stroke();

        cx.beginPath();
        cx.moveTo(e.offsetX, e.offsetY)

    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

})

var select = document.getElementById("select");

select.addEventListener("change", () => {

    var e = document.getElementById("select");
    var text = e.options[e.selectedIndex].text;

    if (text == "선") {
        // var x2_in = document.createElement("INPUT type='number' id='x2'");
        // var y2_in = document.createElement("INPUT type='number' id='y2'");
        // var br = document.createElement("BR");
        // var text1 = document.createElement("TEXT");
        // var text2 = document.createElement("TEXT");

        // var x2_text = document.createTextNode("")
        // var y2_text = document.createTextNode("")

        // var text_1 = document.createTextNode("x2 : ");
        // var text_2 = document.createTextNode("y2 : ");

        // // x2_in.appendChild(x2_text);
        // // y2_in.appendChild(y2_text);
        // text1.appendChild(text_1);
        // text2.appendChild(text_2);

        // document.getElementById("line_input").appendChild(text1);
        // document.getElementById("line_input").appendChild(x2_in);
        // document.getElementById("line_input").appendChild(br);
        // document.getElementById("line_input").appendChild(text2);
        // document.getElementById("line_input").appendChild(y2_in);

        var div = document.getElementById("line_input");

        var text = "<label id='x2_label'>x2 : <input type='number' id='x2'></input></label><br><label id='y2_label'>y2 : <input type='number' id='y2'></input></label>"

        div.innerHTML = text;
    }
    if (text == "점") {
        var x2 = document.getElementById("x2_label");
        var y2 = document.getElementById("y2_label");

        x2.remove();
        y2.remove();
    }
})

var btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    var e = document.getElementById("select");
    var text = e.options[e.selectedIndex].text;

    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;
    console.log("qkjqjkqk");

    if (x1 == "") {
        alert("x1 값 없음");

    } 

    else if (y1 == "") {
        alert("y1 값 없음");

    } 
    
    else if (x1 != "" && y1 != "") {

        if (text == "선") {

            var x2 = document.getElementById("x2").value;
            var y2 = document.getElementById("y2").value;

            if (x2 == "") {
                alert("x2 값 없음");
            } 

            else if (y2 == "") {
                alert("y2 값 없음");
            } 

            else if (x2 != "" && y2 != "") {
                
                x1 = x1 * 25 + 400;
                x2 = x2 * 25 + 400;
                y1 = ((y1 * 25) - 400) * -1;
                y2 = ((y2 * 25) - 400) * -1;

                cx.beginPath();
                cx.moveTo(x1, y1);
                cx.lineTo(x2, y2);
                cx.stroke();

                cx.beginPath();
            } 
        }

        else if (text == "점") {

            x1 = x1 * 25 + 400;
            y1 = ((y1 * 25) - 400) * -1;

            cx.beginPath();
            cx.arc(x1, y1, 6, 0, 2 * Math.PI);
            cx.fill();
        }


    }


})