let turn="X"; //initail turn goes for X
var grids = document.querySelectorAll(".tile"); //selecting all cells in game board
let isgameOver=false; //boolean flag

const changeTurn=()=>{
	return turn==="X"? "O": "X";  //retruns present turn
}

const checkwin=()=>{
	let boxtext=document.getElementsByClassName("tile");
	//winning conditions as per grid
	/*
	0 | 1 | 2
	--+---+---
	3 | 4 | 5
	--+---+---
	6 | 7 | 8
	*/
	let wins=[[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
	//checks if any empty cell and if all vertical or horizontal or dialgonal elements are same and returns who won
	wins.forEach(e=>{
		if((boxtext[e[0]].innerText!=="") && (boxtext[e[1]].innerText!=="") && (boxtext[e[2]].innerText!=="")){
			if((boxtext[e[0]].innerText===boxtext[e[1]].innerText) && (boxtext[e[1]].innerText===boxtext[e[2]].innerText)){
				document.querySelectorAll("h2")[0].innerText=boxtext[e[0]].innerText+" - has Won!!!";
				isgameOver=true;
			}
		}
	});

}

//checks for draw condition if no one wins and all cells are not empty and no condition matches winning conditions
const isDraw=()=>{
	var count=0;
	for(var i=0;i<9;i++){
		if(grids[i].innerText!==""){
			count++;
		}
	}
	if(count===9 && (!isgameOver)){
		document.querySelectorAll("h2")[0].innerText="Game Draw!!!";
	}
}

//actual game logic
for (var i=0; i < grids.length; i++) {
	//setting click listener for all cells
	grids[i].addEventListener("click",function(){
		//changes to X or O according to turn if cell is empty
		if(this.innerText===""){
			this.innerText=turn;
			turn=changeTurn();
			if(!isgameOver){
				document.querySelectorAll("h2")[0].innerText=turn+"'s Turn";
			}
			//trace backs to checkwin function
			checkwin();
			//trace backs to isDraw function
			isDraw();
		}
	});
}

//resets all values when reset button is clicked
document.querySelectorAll("button")[0].addEventListener("click",function(event){
	let boxtext=document.querySelectorAll(".tile");
	Array.from(boxtext).forEach(element=>{
		element.innerText="";
	});
	isgameOver=false;
	turn="X";
	document.querySelectorAll("h2")[0].innerText=turn+"'s Turn";
});