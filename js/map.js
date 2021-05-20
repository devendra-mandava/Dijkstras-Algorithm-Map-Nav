var pointList = Array();
var linkList = Array();
var circles = [];
var bgcolor;

function reflesh() {
	window.location.href = window.location.href;
}
function getCo(e) {
	var x = e.clientX;
	var y = e.clientY;
	document.getElementById("xycoordiv").innerHTML = " &nbsp;&nbsp;current  x=" + (x-6) + ' y=' + (y-60);
}

function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
function clearCo() {
	document.getElementById("xycoordiv").innerHTML = "";
} 


function getPointById(pointId) {
	for (var i = 0; i < pointList.length; i++) {
		var curPoint = pointList[i];
		if (curPoint.id == pointId) {
			return curPoint;
		} 
	} 
} 


function getCost(point1, point2) {
	var x1 = point1.x;
	var x2 = point2.x;
	var y1 = point1.y;
	var y2 = point2.y;
	var cost = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
	return parseInt(cost);
}


function Point(id, name, x, y, type) {
	this.id = id;
	this.name = name;
	this.x = x;
	this.y = y;
	this.type = type;
}

function Link(point1, point2, cost) {
	this.point1 = point1;
	this.point2 = point2;
	this.cost = cost;
}

$(document).ready(function () {
	var myCanvas = document.getElementById("myCanvas");
	var context = myCanvas.getContext("2d");

	//�������
	var draw = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext) {
		context.beginPath();
		context.arc(x, y, radius, 0, 2 * Math.PI, false);
		context.fillStyle = fillcolor;
		context.fill();
		context.lineWidth = linewidth;
		context.strokeStyle = strokestyle;
		context.stroke();

		context.fillStyle = fontcolor;
		context.textAlign = textalign;
		context.textBaseline = "bottom";
		context.font = fonttype;
		context.fillText(filltext, x+24, y-7);
	};

	var Circle = function (x, y, radius) {
		this.left = x - radius;
		this.top = y - radius;
		this.right = x + radius;
		this.bottom = y + radius;
	};
	
	var drawCircle = function (context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext, circles) {
		draw(context, x, y, fillcolor, radius, linewidth, strokestyle, fontcolor, textalign, fonttype, filltext);
		var circle = new Circle(x, y, radius);
		circles.push(circle);
	};


	var num;
	var numlist = Array();
	var pic1 = new Image();
	pic1.src = "./images/A.png";
	var pic2 = new Image();
	pic2.src = "./images/B.png";
	
	$('#myCanvas').click(function (e) {
		var clickedX = e.pageX - this.offsetLeft;
		var clickedY = e.pageY - this.offsetTop;
		for (var i = 0; i < circles.length; i++) {

			if (clickedX < circles[i].right && clickedX > circles[i].left && clickedY > circles[i].top && clickedY < circles[i].bottom) {
				num = i + 1;
				numlist.push(num);

				for (var k = 1; k < numlist.length + 1; k++) {
					context.drawImage(eval('pic' + k), clickedX-15, clickedY-25, 24, 24);
				}
			}
		}

		p1 = numlist[0];
		p2 = numlist[1];
		linkToBest(p1, p2);
		numlist = Array();
	   
	});
	
	function lineTo(x1, y1, x2, y2) {
		context.beginPath();
		context.strokeStyle='#666666';
		context.moveTo(x1, y1);
		context.lineTo(x2, y2);
		context.stroke();   
	}
	
	function linkToBest(p1, p2) {
		var a = findPath(p1, p2).toString();
		
		var x1, x2, y1, y2, t;
		var plist = Array();
		var alist = Array();
		var b = Array();
		for (var i = 0; i < a.split(">").length; i++) {
			alist.push(a.split(">")[i]);
			b.push(alist[i].slice(0, 2).trim());
			x2 = getPointById(b[i]).x;
			y2 = getPointById(b[i]).y;
			t = Array("" + x2, y2 + "");
			plist.push(t);
		}
		x1 = getPointById(b[0]).x;
		y1 = getPointById(b[0]).y;
		context.strokeStyle = 'red'; 
		context.lineWidth = 5; 
		context.beginPath();
		context.moveTo(x1, y1);
		for (var k = 0; k < plist.length; k++) {
			context.lineTo(plist[k][0], plist[k][1]);
		}
		context.stroke();
	}
   

	$.get('./data/map.xml', function (d) {
	
		$(d).find('point').each(function () { 
			var $point = $(this);
			var id = $point.attr("id");
			var name = $point.attr("name");
			var x = parseInt($point.attr("x"));
			var y = parseInt($point.attr("y"));
			var type = $point.attr("type");
			var point = new Point(id, name, x, y, type);
			pointList.push(point);

		});
	 
		
		$(d).find('link').each(function () {
			var $link = $(this);
			var pid1 = $link.attr("point1");
			var pid2 = $link.attr("point2");
			var point1 = getPointById(pid1);
			var point2 = getPointById(pid2);
			var cost = getCost(point1, point2);
			var link = new Link(point1, point2, cost);
			linkList.push(link);
		});
		
		for (var i = 0; i < linkList.length; i++) {
			var x1 = linkList[i].point1.x;
			var y1 = linkList[i].point1.y;
			var x2 = linkList[i].point2.x;
			var y2 = linkList[i].point2.y;
			lineTo(x1, y1, x2, y2);
		}

		
		for (var i = 0; i < pointList.length; i++) {
			if (pointList[i].type == "1") {
				bgcolor = "red";
			} else if (pointList[i].type == "2") {
				bgcolor = "green";
			} else {
				bgcolor = "yellow";
			}
			var px = pointList[i].x;
			var py = pointList[i].y;
			drawCircle(context, px, py, bgcolor, 8, 3, "#003300", "black", "center", "bold 10px Arial", pointList[i].name, circles);

		}


	
		for (var i = 0; i < linkList.length; i++) {
			var curLink = linkList[i];
			var point1 = curLink.point1;
			var point2 = curLink.point2;
			link(curLink.point1.id, curLink.point2.id, curLink.cost);
		} 


  
	});
	$("#btnClear").click(function () {
		window.location.href = window.location.href;
	});
});
     