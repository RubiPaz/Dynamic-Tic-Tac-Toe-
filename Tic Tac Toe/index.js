//name, color, symbol, score
var USEER1=["","#FFFF0085","x","0"];
var USEER2=["","#00FF6E85","o","0"];
var turn="X";
var arr =[];
var GameOn=true;
var TimeToChangeTurn = 10000 +1000



var colorP1=document.getElementById("colorP1");
colorP1.addEventListener("input", function(){
USEER1[1]=colorP1.value+85;
var sideP1=document.getElementById("left_side")
sideP1.style.backgroundColor=USEER1[1];
}
);

var colorP2=document.getElementById("colorP2");
colorP2.addEventListener("input", function(){
USEER2[1]=colorP2.value+85;
var sideP2=document.getElementById("right_side")
sideP2.style.backgroundColor=USEER2[1];
}
);


function isEmpty(row, col){
    if (arr[row][col]==0){
        return true;
    }
    else
        return false;
}

function buildBoard(){
	
var rows=document.getElementById("selRowNum").value;
var cols=document.getElementById("selColNum").value;

var board = document.getElementById("board");
var CheckP1=document.getElementById("UsernameP1").value;
var CheckP2=document.getElementById("UsernameP2").value;
colorP1.disabled=true;
colorP2.disabled=true;

	if(CheckP1.length==0 || CheckP2.length==0){
window.alert("Please choose name for both players.");
	}
	else{
document.getElementById("start").disabled=true;
	if (board.hasChildNodes() )
	{
		board.removeChild(board.firstChild); 
	}

document.getElementById("restart").disabled=false;

var table=document.createElement("table");

table.setAttribute("id","tableGame");
board.appendChild(table);

var rowNum;
var colNum;
	for (rowNum=0;rowNum<rows;rowNum++)
	{
		var row = document.createElement("tr");
		table.appendChild(row);
		for(colNum=0;colNum<cols;colNum++)
		{
			var cell = document.createElement("td");
			row.appendChild(cell);
			cell.onclick=function() {ClickCell()};
		}
	}
BuildArray(rows,cols);

save();

startTime();
setInterval(startTime, 1000);
document.getElementById("right_side").style.filter="grayscale(80%)" ;
document.getElementById("showTurn").innerHTML=" &larr; "+USEER1[0]+" Turn";
Timer();

	}
}

function ClickCell(){   

var cell=event.srcElement;
let selectedRow = cell.parentElement.rowIndex;
let selectedColum =cell.cellIndex;
if(isEmpty(selectedRow,selectedColum) && GameOn){       
    
    if(turn=='X'){
		cell.innerHTML=USEER1[2];
		cell.style.backgroundColor=USEER1[1] +85
	
        arr[selectedRow][selectedColum]=1;
	
    }
    else{
		cell.innerHTML=USEER2[2];

        arr[selectedRow][selectedColum]=2;
		cell.style.backgroundColor=USEER2[1] +85

    }
	NxtTurn();
	CheckWhoWon(selectedRow,selectedColum);
	if (EndAsTie()) alert("tie, press the restart button to play again")
	}
}


function BuildArray(rows,columns){

    for(var i=0;i<rows;i++){
        arr[i] =[];
        for(var j=0;j<columns;j++){
            arr[i][j]=0;  
        }
    }

}


function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	
var timeNow=	h + ":" + m + ":" +s;
var gree;
	if(h>6 && h<12)
	gree="Good Morning";
	else if(h>=12 && h<17)
	gree="Good Afternoon";
	else if(h>=17 && h<20)
	gree="Good Evening";
	else
	gree="Good Night";

document.getElementById("greeting").innerHTML=gree+" "+(USEER1[0] +" And "+ USEER2[0] + ", the time is: "+timeNow ); 

  }

function checkTime(i) {
	if (i < 10) {i = "0" + i}; 
	return i;
  }
  
function save(){

	
USEER1[0]=document.getElementById("UsernameP1").value;
USEER2[0]=document.getElementById("UsernameP2").value;

USEER1[1]=document.getElementById("colorP1").value;
USEER2[1]=document.getElementById("colorP2").value;


var Play1 = document.getElementById("UsernameP1").value
document.getElementById("nameX").innerHTML=(Play1);

var Play2 = document.getElementById("UsernameP2").value
document.getElementById("nameO").innerHTML=(Play2);
}


function CheckingCell(){
	
}
function CheckRows(r, c){
var celVal=arr[r][c];
var counter=0;
var ChoosenRow = document.getElementById("selRowNum").value;
for(var i =0;i<ChoosenRow-3;i++){
		if (arr[r][c]== arr[r][i] && arr[r][c]== arr[r][i+1] && arr[r][c]== arr[r][i+2]  && arr[r][c]== arr[r][i+3]){
			arr[r][i]=-celVal;
			arr[r][i+1]=-celVal;
			arr[r][i+2]=-celVal;
			arr[r][i+3]=-celVal;
			
			return true;

		}
	}
		return false;
}
	
function Checkcols(r, c){
var celVal=arr[r][c];
var ChoosenRow = document.getElementById("selRowNum").value;
	for(var i =0;i<ChoosenRow-3;i++){
		if (arr[r][c]== arr[i][c] && arr[r][c]== arr[i+1][c] && 
			arr[r][c]== arr[i+2][c]  && arr[r][c]== arr[i+3][c]){
		
		arr[i][c]=-celVal;
		arr[i + 1][c]=-celVal;
		arr[i + 2][c]=-celVal;
		arr[i + 3][c]=-celVal;

		return true;
		}
		
	}
		return false;
}

function LeftDiagonalChecking(r, c){ 
var celVal=arr[r][c];
var StartI;
var StartJ;
var ChoosenRow = document.getElementById("selRowNum").value;
var ChoosenCol = document.getElementById("selColNum").value;


    if (r - c >= 0) {
        StartI = r - c;
        StartJ = 0;
    } else {
        StartI = 0;
        StartJ = c - r;
    }

    for (var i = StartI; i < ChoosenRow-3; i++) {
        for (var j = StartJ; j < ChoosenCol-3; j++)
		 {
		if(arr[i][j] == arr[r][c] && arr[i + 1][j + 1] == arr[r][c] && 
			arr[i + 2][j + 2] == arr[r][c] && arr[i + 3][j + 3] == arr[r][c]){
			arr[i][j] = -celVal;
			arr[i + 1][j + 1] = -celVal;
			arr[i + 2][j + 2] = -celVal;
			arr[i + 3][j + 3] = -celVal;
			return true;
		}
		
		 }
		}
		return false;
}

function RightDiagonalChecking(r, c) {
var celVal=arr[r][c];
var StartI;
var StartJ;
var ChoosenRow = document.getElementById("selRowNum").value;
var ChoosenCol = document.getElementById("selColNum").value;

    if (r + c < ChoosenRow - 1) {
        StartI = 0;
        StartJ = r + c;

    } else {
        StartI = (r + c) - (ChoosenRow - 1);
        StartJ = ChoosenCol - 1;
    }


    for (var i = StartI; i < ChoosenRow-3; i++) {
        for (var j = StartJ; j >= 0; j--) 
		{
			if(arr[i][j] == arr[r][c] && arr[i + 1][j - 1] == arr[r][c] && 
				arr[i + 2][j - 2] == arr[r][c] && arr[i + 3][j - 3] == arr[r][c]){
				arr[i][j] = -celVal;
				arr[i + 1][j - 1] = -celVal;
				arr[i + 2][j - 2] = -celVal;
				arr[i + 3][j - 3] = -celVal;
				return true;
			}
		
		 }
		}
		return false;
	}

function CheckWhoWon(selectedRow,selectedColum){	
	

	if(CheckRows(selectedRow,selectedColum)){
		window.alert( symbyArray(selectedRow,selectedColum) +" " + namebyArray(selectedRow,selectedColum)+ " You Win!");
		GameOn=false;
	}

	if(Checkcols(selectedRow,selectedColum)){
	 	window.alert( symbyArray(selectedRow,selectedColum)+" " + namebyArray(selectedRow,selectedColum) + " You Win!");
		 GameOn=false;
	}

	if(LeftDiagonalChecking(selectedRow,selectedColum)){
		window.alert( symbyArray(selectedRow,selectedColum) +" " + namebyArray(selectedRow,selectedColum)+ " You Win!");
		GameOn=false;;
	}

	if(RightDiagonalChecking(selectedRow,selectedColum)){
		window.alert( symbyArray(selectedRow,selectedColum) +" " + namebyArray(selectedRow,selectedColum)+ " You Win!");
		GameOn=false;
	}
	if(!GameOn){
		TimeToChangeTurn = 0;
		document.getElementById("TimeP1").innerHTML="Game Ended";
		document.getElementById("TimeP2").innerHTML="Game Ended";
		clearInterval(zman);
		Color_Sequence();

	}
}
function namebyArray(i,j){
	if(Math.abs(arr[i][j])==1)
	return USEER1[0];
	if(Math.abs(arr[i][j])==2)
	return USEER2[0];
}

function symbyArray(i,j){
	if(Math.abs(arr[i][j])==1)
	return USEER1[2];
	if(Math.abs(arr[i][j])==2)
	return USEER2[2];
}



function Color_Sequence(){
	var table = document.getElementById("tableGame");
	

	for(var i=0;i<arr.length;i++){ 
        for(var j=0;j<arr[0].length;j++){ 
            if (arr[i][j]<0) {
				
				table.rows[i].cells[j].style.filter="opacity(32%)";
			} 
        }
    }


}
function Timer() {
    zman=setInterval(function(){
	TimeToChangeTurn -= 1000
	var seconds = Math.floor((TimeToChangeTurn % (1000 * 60)) / 1000);
		if (turn == 'X') {
			document.getElementById("TimeP1").innerHTML="Time left: " + seconds
		}
		else{
			document.getElementById("TimeP2").innerHTML="Time left: " + seconds
		}
		if (TimeToChangeTurn == 0) {
			NxtTurn()
		}
	}
	,1000)
	
}
function NxtTurn() {
var sideP1=document.getElementById("left_side");
var sideP2=document.getElementById("right_side");
var showTurn=document.getElementById("showTurn");
	if (turn == 'X') {
		turn = 'O'
		document.getElementById("TimeP1").innerHTML="Next Is Your Turn";
		showTurn.innerHTML= USEER2[0] + " Turn "+ " &rarr; ";
		sideP1.style.filter="grayscale(80%)";
		sideP2.style.filter="grayscale(0%)";
	

	}
	else {turn = 'X'
document.getElementById("TimeP2").innerHTML="Next Is Your Turn";
	
sideP2.style.filter="grayscale(80%)";
sideP1.style.filter="grayscale(0%)";
showTurn.innerHTML=" &larr; "+ USEER1[0]+" Turn"+" ";


	}

TimeToChangeTurn = 10000 +1000

}

function restart(){
document.getElementById("start").disabled=false;
TimeToChangeTurn = 10000+1000;
turn="X";
clearInterval(zman)
GameOn=true;
buildBoard()
}


function EndAsTie(){

	for(var i=0;i<arr.length;i++){ 
       
        for(var j=0;j<arr[0].length;j++){ 
            if (arr[i][j]==0) {
				return false;
			} 
        }
    }
return true;
}


