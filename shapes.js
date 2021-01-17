var select = document.getElementById("select");

var canvas = document.getElementById("grid");
var cx = canvas.getContext('2d');

var color;

var remove_label = function () {
    var label = document.getElementsByTagName("label");
    var cnt = 0;

    var init_label_length = label.length;

    while(1){
        label[0].remove();
        cnt++;
        if(cnt === init_label_length){
            return ;
        }
    }
}

var add_dotSize = function () {
    var dot_size_div = document.getElementById("dot_size_div");
    var dot_size_text = "<label id='dot_size_label'>점크기<div id='show_size'></div><br><input type='range' min= '1' max= '25' step='1' value = '6' id= 'dot_size' onInput='display()'><br></label>";

    dot_size_div.innerHTML = dot_size_text;
}

var add_xy1 = function () {
    var xy1_div = document.getElementById("xy1_input");
    var xy1_input_txt = "<label id='x1_label'>x1 : <input type='number' id='x1'></label><br><label id='y1_label' >y1 : <input type='number' id='y1'></lable>";

    xy1_div.innerHTML = xy1_input_txt;
}

var add_xy2 = function () {
    var xy2_div = document.getElementById("xy2_input");
    var xy2_input_txt = "<label id='x2_label'>x2 : <input type='number' id='x2'></input></label><br><label id='y2_label'>y2 : <input type='number' id='y2'></input></label>"

    xy2_div.innerHTML = xy2_input_txt;
}

var add_rad = function () {
    var rad_div = document.getElementById("rad_input");
    var rad_input_text = "<label id='rad_label'>반지름 : <input type='number' id='rad'></input></label>"

    rad_div.innerHTML = rad_input_text;
}

var change_col = function (e) {
    color = e.value;
}


window.addEventListener("load", () => {
    add_xy1();
    add_xy2();
})

select.addEventListener("change", () => {

    var e = document.getElementById("select");
    var text = e.options[e.selectedIndex].text;

    if (text === "선") {
        remove_label();

        add_xy1();
        add_xy2();
    }
    if (text === "점") {
        remove_label();

        add_dotSize();
        add_xy1();
    }
    if(text === "원") {
        remove_label();

        add_xy1();
        add_rad();
    }
})

var btn = document.getElementById("btn");

btn.addEventListener("click", () => {
    var e = document.getElementById("select");
    var text = e.options[e.selectedIndex].text;

    var x1 = document.getElementById("x1").value;
    var y1 = document.getElementById("y1").value;

    var color = document.getElementById("color").value;

    if (x1 == "") {
        alert("x1 값 없음");

    } 

    else if (y1 == "") {
        alert("y1 값 없음");

    } 
    
    else if (x1 != "" && y1 != "") {

        if (text === "선") {

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

                cx.lineWidth = 1;

                cx.beginPath();
                cx.moveTo(x1, y1);
                cx.lineTo(x2, y2);
                cx.strokeStyle = color;
                cx.stroke();

                cx.beginPath();
            } 
        }

        else if (text === "점") {

            var dot_size = document.getElementById("dot_size").value;


            x1 = x1 * 25 + 400;
            y1 = ((y1 * 25) - 400) * -1;

            cx.lineWidth = 1;

            cx.beginPath();
            cx.arc(x1, y1, dot_size, 0, 2 * Math.PI);
            cx.fill();

            cx.beginPath();
        }

        else if(text === "원"){
            var rad = document.getElementById("rad").value;

            if(rad != ""){
                x1 = x1 * 25 + 400;
                y1 = ((y1 * 25) - 400) * -1;

                cx.lineWidth = 1;

                cx.beginPath();
                cx.arc(x1, y1, rad*25, 0, 2 * Math.PI);
                cx.stroke();
                cx.beginPath();
            }
        }
    }


})
