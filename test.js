function get_url_vars() {
    for (var t, e = [], n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), i = 0; i < n.length; i++) t = n[i].split("="), e.push(t[0]), e[t[0]] = t[1];
    return e
}
$(function () {
    var l = $("#paper"),
        a = 15,
        s = "Courier New",
        c = "#a7c4ce",
        u = "#c1e2ed";
    $("#print").click(function () {
        var t = l[0];
        $("#print-graph-paper").attr("src", t.toDataURL()), $("#print-graph-paper").css("border", "2px solid " + c), window.print()
    }), $("#undo").click(v), $("#eraseAll").click(function () {
        h = [], p(), k()
    }), $(document).keydown(function (t) {
        90 === t.which && t.ctrlKey && v()
    });
    var n = $("#textInput"),
        i = $("#measureTextInput"),
        o = null,
        t = {
            fontSize: a,
            fontFamily: s
        };
    n.css(t), i.css(t), n.on("blur", function () {
        var t = n.val();
        "" != t.trim() && (h.push({
            type: "text",
            text: t,
            location: o
        }), n.val(""), p(), k()), n.hide()
    }), n.on("keydown", function (t) {
        if (27 == t.which || 13 == t.which) n.blur();
        else {
            var e = n.val();
            i.text(e), n.width(i.width() + 20)
        }
    }), l.on("mousedown", function (t) {
        t.preventDefault(), n.blur();
        r = {
            x: t.offsetX,
            y: t.offsetY
        };
        f = {
            type: "line",
            start: r,
            end: r
        }, k()
    }), l.on("mousemove", function (t) {
        var e = {
                x: t.pageX - l.offset().left,
                y: t.pageY - l.offset().top
            },
            n = w(e);
        if ($("#current_coordinates").text("(" + n.x + ", " + n.y + ")"), !f) return;
        try {
            console.log("line is " + y(f) / d + " RAW units in length")
        } catch (t) {}
        if (1 != t.which) return void g(t);
        f.end = e, k()
    }), l.on("mouseup", g), l.on("mouseenter", function () {
        return $("#current_coordinates_container").css("visibility", "visible")
    }), l.on("mouseout", function () {
        return $("#current_coordinates_container").css("visibility", "hidden")
    });
    var f = null,
        h = [],
        d = +(get_url_vars().grid_size || 20),
        e = [],
        r = null;

    function p() {
        var t = JSON.stringify(h);
        e.push(t), 20 < e.length && e.splice(0, 1), localStorage.setItem("data", t)
    }

    function v() {
        if (1 != e.length) {
            e.pop();
            var t = e.pop();
            h = JSON.parse(t), p(), k()
        }
    }

    function y(t) {
        var e = t.start.y - t.end.y,
            n = t.start.x - t.end.x;
        return Math.sqrt(e * e + n * n)
    }

    function x(t) {
        return y(t) <= d / 2
    }

    function g(t) {
        if (f) {
            if (x(f)) return f = null, k(), e = m({
                x: (e = r).x - d / 2,
                y: e.y - d / 2
            }), o = e, n.val(""), n.css({
                left: e.x + l.offset().left + 3,
                top: e.y + l.offset().top + 3,
                width: 10
            }), n.show(), void n.focus();
            var e;
            f.start = m(f.start), f.end = m(f.end), h.push(f), f = null, k(), p()
        }
    }

    function w(t) {
        return {
            x: Math.round(t.x / d),
            y: Math.round(t.y / d)
        }
    }

    function m(t) {
        var e = w(t);
        return {
            x: e.x * d,
            y: e.y * d
        }
    }

    function b(t, e) {
        t.beginPath(), t.moveTo(e.start.x, e.start.y), t.lineTo(e.end.x, e.end.y), t.stroke(), t.closePath()
    }

    function k() {
        var t = l[0].getContext("2d");
        t.lineCap = "round", t.fillStyle = "white", t.fillRect(0, 0, l.width(), l.height()),
            function (t) {
                t.lineWidth = 1, t.strokeStyle = "#badae5";
                for (var e = 0, n = 0; n < l.height(); n += d) t.strokeStyle = e % 5 == 0 ? c : u, t.beginPath(), t.moveTo(0, n), t.lineTo(l.width(), n), t.stroke(), t.closePath(), e++;
                for (var i = e = 0; i < l.width(); i += d) t.strokeStyle = e % 5 == 0 ? c : u, t.beginPath(), t.moveTo(i, 0), t.lineTo(i, l.height()), t.stroke(), t.closePath(), e++
            }(t), t.lineWidth = 3, t.strokeStyle = "#4521cb";
        for (var e = 0, n = h; e < n.length; e++) {
            var i = n[e];
            "line" == i.type ? b(t, i) : "text" == i.type && (t.fillStyle = "black", t.font = a + "px " + s, t.fillText(i.text, i.location.x + 1, i.location.y + d - .5 * a + 1))
        }
        if (f && !x(f)) {
            var o = {
                start: m(f.start),
                end: m(f.end)
            };
            b(t, o);
            var r = (y(o) / d).toFixed(2);
            $("#line_length").text("line is " + r + " units in length")
        } else $("#line_length").text("")
    }! function () {
        var t = localStorage.getItem("data");
        if (!t) return;
        h = JSON.parse(t), p()
    }(), k()
});