var canvas = document.getElementById('grid');


function print_cor(e) {
    var cors = document.getElementById('cor');
    
    var text = "x= " + e.offsetX + "\n";
    
    text += "y= " + e.offsetY;
    cors.innerText = text;
}


function drawLine(e) {
    var t = canvas.getContext('2d');
    t.beginPath(), t.moveTo(e.start.x, e.start.y), t.lineTo(e.end.x, e.end.y), t.stroke(), t.closePath()
}