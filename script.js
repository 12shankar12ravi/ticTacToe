var gameData={
    currPlayer: null,
    player1: null,
    player2: null,
    winPlayer: null,
    gameSound: null
}


var player = function (sign,points,status){
    this.sign = sign;
    this.points = points;
    this.status = status;
}

//var constants = {
//    
//
//}

function showIcon(currSel){
    console.log("item no "+currSel.id+" clicked");
    var currSign = gameData.currPlayer.sign; 
    currSel.innerHTML="<span>"+currSign+"<span>";
    setPoints(currSel.id);
    if(!checkForWin())
      togglePlayer();
}

function checkForWin(){
    var arr = gameData.currPlayer.points;
    switch(true){
        case arr[0]+arr[1]+arr[2] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[3]+arr[4]+arr[5] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[6]+arr[7]+arr[8] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[0]+arr[3]+arr[6] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[1]+arr[4]+arr[7] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[2]+arr[5]+arr[8] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[0]+arr[4]+arr[8] == 3:
            gameData.currPlayer.status = "WIN";
        break;
        case arr[2]+arr[4]+arr[6] == 3:
            gameData.currPlayer.status = "WIN";
        break;        
    }
    
    if(gameData.currPlayer.status=="WIN"){
        var msg = "";
        if(gameData.currPlayer.sign == gameData.player1.sign){
            msg="Player 1 won the game";
        }else{
            msg="Player 2 won the game";
        }
        finishGame(msg);
        return true;
    }   
    //all points occupied , draw the game
    var sum = 0;
    gameData.player1.points.forEach(e => sum=sum+e);
    gameData.player2.points.forEach(e => sum=sum+e);
    if(sum == 9){
        //alert("Math is draw");
        finishGame("Match is draw");
        return true;
    }
    return false;
}

//Reset all the fields , 
function finishGame(msg){
    document.querySelector(".tgroup").insertAdjacentHTML("afterend","<span style='font-size:50px;color:red' id='gameStatus'>"+msg+"</span>")
    //reset all the signs
    for(var i=0;i<9;i++){
        document.getElementById(i+'').innerHTML='';
    }
    //reset choose the sign options
    document.getElementsByName("sign").forEach(e => e.disabled = false);
    document.querySelector("input[name=sign]:checked").checked = false;
    
    //reset gamedata object
    gameData.currPlayer= null;
    gameData.player1= null;
    gameData.player2= null;
    gameData.winPlayer= null;
    
    //alert("Game finished successfully");
    gameData.gameSound.play();
}


function togglePlayer(){
    document.getElementById("playerTurn").innerHTML="";
    if(gameData.currPlayer == gameData.player1){
        gameData.currPlayer = gameData.player2;
        //which player turn it is ?
        document.getElementById("playerTurn").innerHTML = "This is Player 2's turn ........ "+gameData.currPlayer.sign;
    }else{
        gameData.currPlayer = gameData.player1;
        //which player turn it is ?
        document.getElementById("playerTurn").innerHTML = "This is Player 1's turn ........ "+gameData.currPlayer.sign;
    }
    
}

function setPoints(point){  
    if(gameData.currPlayer.sign == gameData.player1.sign){
        gameData.player1.points[point]=1;
        gameData.currPlayer = player1;
    }else{
        gameData.player2.points[point]=1;
        gameData.currPlayer = player2;
    }
}

function startGame(curr){
    
    //stop laugh sound
    if(gameData.gameSound)
        gameData.gameSound.stop();
    
    //reset game status
    if(document.getElementById("gameStatus"))
      document.getElementById("gameStatus").innerHTML ="";
    
    //set player status
    var selectedSign = document.querySelector("input[name=sign]:checked");
    var signError = document.getElementById('signError');
    var signs = document.getElementsByName("sign");
    
    //which player turn it is ?
    document.getElementById("playerTurn").innerHTML = "This is Player 1's turn ........ "+selectedSign.value;
  
    if(!selectedSign){
        curr.insertAdjacentHTML("afterend","<span class='error' id='signError'>Please select your sign first</span>");
    }else{
        if(signError){
           signError.style.display = 'none';
        }
        signs.forEach(e => e.disabled = true);
    }
    initializePlayers(selectedSign);
}

function initializePlayers(selectedSign){
    var p1Points = [9];
    var p2Points = [9];
    for(var i=0;i<9;i++){
        p1Points[i]=0;
        p2Points[i]=0;
    }
    player1 = new player(selectedSign.value,p1Points,-1);
    if(selectedSign.value== 'X')
        player2 = new player('O',p2Points,-1)
    else
        player2 = new player('X',p2Points,-1)
    
    gameData.currPlayer = player1;
    gameData.player1 = player1; 
    gameData.player2 = player2; 
    gameData.gameSound = new sound("laugh.mp3");
}
    
  
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    