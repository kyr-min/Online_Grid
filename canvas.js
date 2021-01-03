var drawGrid = function(w, h, id) {
    var canvas = document.getElementById(id);
    var c = canvas.getContext('2d');
    c.canvas.width  = w;
    c.canvas.height = h;
    
    var data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
            <pattern id="smallGrid" width="25" height="25" patternUnits="userSpaceOnUse"> \
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="blue" stroke-width="0.5" /> \
            </pattern> \
            <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse"> \
                <rect width="25" height="25" fill="url(#smallGrid)" /> \
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="gray" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';

    var DOMURL = window.URL || window.webkitURL || window;
    
    var img = new Image();
    var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    var url = DOMURL.createObjectURL(svg);
    
    img.onload = function () {
      c.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;


    //vertical
    c.beginPath();
    c.moveTo(400, 0);
    c.lineTo(400, 800);
    c.stroke();


    //horizontal
    c.beginPath();
    c.moveTo(0, 400);
    c.lineTo(800, 400);
    c.stroke();

    c.beginPath();
}


drawGrid(800, 800, "grid");