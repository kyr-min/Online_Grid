var select = document.getElementById("select"); //사용자가 사용할 도구 

var canvas = document.getElementById("grid"); // 모눈종이 객체
var cx = canvas.getContext('2d'); // 이차원 도형들을 사용할 것이므로 context를 2d로 지정

var colorPick = document.getElementById("color"); // 색상선택 input

var color; //현재 선택된 색상을 저장하기위한 변수

colorPick.addEventListener("change", ()=> { //색상이 변경되면 실행, 변경된 색상을 color 변수에 저장
    color = colorPick.value;
})

function print_cor(e) { //모눈종이 기준 마우스 좌표 출력
    var cors = document.getElementById('cor'); // 출력할 위치 div 지정

    var x_cor = parseInt((e.offsetX - 400) / 25);  // 정가운데 (0,0) 기준으로 좌표 계산, 정수형으로 변환
    var y_cor = parseInt((e.offsetY * -1 + 400) / 25);

    var text = "x= " + x_cor + "\n" + "y= " + y_cor; //innerText 설정
    cors.innerText = text;
}

var remove_label = function () { //select가 달라질때마다 필요한 도구가 다르기때문에 이전 도구들을 없애는 함수
    var label = document.getElementsByTagName("label"); // label 태그 컬렉션
    var cnt = 0;  //몇개를 삭제했는지 저장하는 변수 cnt

    var init_label_length = label.length;  // 함수를 호출했을때 기준 label 컬렉션의 길이

    while(1){
        label[0].remove(); // 0번째 삭제 후 , cnt + 1
        cnt++;
        if(cnt === init_label_length){ // cnt가 init_label_length 와 동일하다면 return으로 함수 종료
            return ;
        }
    }
}

var add_dotSize = function () { // 점사이즈 옵션 세팅하는 함수
    var dot_size_div = document.getElementById("dot_size_div");
    var dot_size_text = "<label id='dot_size_label'>점크기<div id='show_size'></div><br><input type='range' min= '1' max= '25' step='1' value = '6' id= 'dot_size' onInput='display()'><br></label>";

    dot_size_div.innerHTML = dot_size_text;
}

var add_xy1 = function () { //x1, y1 좌표 input 세팅하는 함수
    var xy1_div = document.getElementById("xy1_input");
    var xy1_input_txt = "<label id='x1_label'>x1 : <input type='number' id='x1'></label><br><label id='y1_label' >y1 : <input type='number' id='y1'></lable>";

    xy1_div.innerHTML = xy1_input_txt;
}

var add_xy2 = function () { //x2, x2 좌표 input 세팅하는 함수
    var xy2_div = document.getElementById("xy2_input");
    var xy2_input_txt = "<label id='x2_label'>x2 : <input type='number' id='x2'></input></label><br><label id='y2_label'>y2 : <input type='number' id='y2'></input></label>"

    xy2_div.innerHTML = xy2_input_txt;
}

var add_rad = function () { //반지름 input 세팅하는 함수
    var rad_div = document.getElementById("rad_input");
    var rad_input_txt = "<label id='rad_label'>반지름 : <input type='number' id='rad'></input></label>"

    rad_div.innerHTML = rad_input_txt;
}

var addFoH = function () { //원을 채울지 말지 선택하는 selct를 세팅하는 함수
    var FoH_div = document.getElementById("FoH_div");
    var FoH_select_txt = "<label id='FoH_label'><select id='FoH'><option value='fill'>채우기</option><option value='hollow'>비우기</option></select></label>"

    FoH_div.innerHTML = FoH_select_txt;
}

window.addEventListener("load", () => { // 처음 input 설정, 선으로 되어있기에 xy1 과 xy2 함수 호출
    add_xy1();
    add_xy2();
})

window.addEventListener("load", () => {  //모눈종이위에 그릴수있게 하는 함수
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

        addFoH();
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
            cx.fillStyle = color;
            cx.fill();

            cx.beginPath();
        }

        else if(text === "원"){
            var rad = document.getElementById("rad").value;
            var FoH_select = document.getElementById("FoH");

            var FoH = FoH_select.options[FoH_select.selectedIndex].text;

            if(rad != ""){
                x1 = x1 * 25 + 400;
                y1 = ((y1 * 25) - 400) * -1;

                cx.lineWidth = 1;

                cx.beginPath();
                cx.arc(x1, y1, rad*25, 0, 2 * Math.PI);
                if(FoH === "채우기"){
                    cx.fillStyle = color;
                    cx.fill();
                } else if ( FoH === "비우기") {
                    cx.strokeStyle = color;
                    cx.stroke();
                }

                cx.beginPath();
            }
        }
    }
})

