


var playerInput = prompt("Head or tails ...??").toLowerCase
var player1, player2;


alert("Toss Now")


 function tosska(){

    var forToss = Math.floor(Math.random() * 2 );

     if(forToss === 0 ){
         return "Head";
     }else{
        return "Tails";
    }
    
 }

 function displayToss() {
    
     var result = tosska();
     document.getElementById("tossResult").innerText = result;
        console.log(result);
 }

    


if (playerInput  === "head"){

    player1 = "head"
    player2 = "tails"
    
}   
else {
     player1 = "tails"
     player2 = "head"
    
}


var count1 = 0;
var count2  = 0;



    function rollDice() {
        var dice = Math.floor(Math.random() * 100); 
        document.getElementById("diceResult").innerText = dice;
    
        if (dice === 66) {
            alert("Congratulations You Win....!");
    
            if (playerInput === player1) {
                count1++;
            } else {
                count2++;
            }
        } 
        document.getElementById("scoreP1").innerText = count1;
        document.getElementById("scoreP2").innerText = count2;
    }

        
    



   



