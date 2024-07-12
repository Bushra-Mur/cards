var errors=0;
var cardlist=[
    "lion",
    "giraffe",
    "butterfly",
    "worm",
    "elephant",
    "rabbit",
    "bear",
    "monkey",
    "donkey",
    "deer"
]
var cardset;
var board=[];
var rows= 4;
var col=5;
var card1selected;
var card2selected;

window.onload= function(){
    shufflecards();
    startgame();
}
function shufflecards(){
    cardset= cardlist.concat(cardlist);
    console.log(cardset);
    //shuffle
    for(let i = 0; i<cardset.length; i++){
        let j = Math.floor(Math.random()*cardset.length);
        //swap
        let temp=cardset[i];
        cardset[i]=cardset[j];
        cardset[j]=temp;
    }
    console.log(cardset);
}
function startgame(){
    for (let r = 0; r<rows;r++){
        let row=[];
        for(let c=0; c<col;c++){
            let carding=cardset.pop();
            row.push(carding);

            let card= document.createElement("img");
            card.id=r.toString() + "-" + c.toString();
            card.src = carding + ".jpg";
            card.classList.add("card");
            card.addEventListener("click",selectcard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    setTimeout(hidecards,2000);

}
function hidecards(){
    for(let r= 0; r<rows;r++){
        for(let c=0;c<col;c++){
            let card= document.getElementById(r.toString()+"-"+c.toString());
            card.src="back.jpg";
        }
    }
}
function selectcard(){
    if(this.src.includes("back")){
        if(!card1selected){
            card1selected=this;
            let coords=card1selected.id.split("-");
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);
            card1selected.src=board[r][c]+".jpg";
        }
        else if (!card2selected && this != card1selected){
            card2selected=this;
            let coords=card2selected.id.split("-");
            let r=parseInt(coords[0]);
            let c=parseInt(coords[1]);
            card2selected.src=board[r][c]+".jpg";
            setTimeout(update,1000);
        }
    }
}

function update(){
    if (card1selected.src!= card2selected.src){
        card1selected.src="back.jpg";
        card2selected.src="back.jpg";
    }
    card1selected=null;
    card2selected=null;
}