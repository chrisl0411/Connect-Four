//Connect Four Game
//Created by: Chris Lee

// player initial
var player1Name = prompt("Player 1: What is your name?, you will be blue.")
var player1Color = 'rgb(86, 151, 255)'

var player2Name = prompt("Player 2: What is your name?, you will be red.")
var player2Color = 'rgb(237, 45, 73)'

var table = $('table tr')

//change color
function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color)
}
//return color
function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}
//return row that has no color, taking in column
function nextGrayRow(colIndex) {
    var bottomColor = returnColor(5,colIndex); //checks bottom most row
    for (var row = 5; row > -1; row--){
        bottomColor = returnColor(row,colIndex);
        if (bottomColor === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

//displays result; win or tie
function returnResult(result, currentPlayerName){
    $('h3').fadeOut('slow')
    $('h2').fadeOut('slow')
    $('h1').fadeOut('slow')
    $('table').fadeOut('slow')
    if (result === "win"){
        $('h1').text(currentPlayerName+" Won! Refresh page to play again.").fadeIn('slow')
    }else if(result === "tie"){
        $('h1').text("Tie Game! Refresh page to play again.").fadeIn('slow')
    }
}


//boolean test to see if four cells are the same color and not gray; cell inputs will be rgb color strings
function checkColors(cell1,cell2,cell3,cell4){
    if (cell1===cell2 && cell1===cell2 && cell1===cell3 && cell1===cell4 && cell1!='rgb(128, 128, 128)'){
        return true
    }
}

//check for horizontal win
function horizontalWin(){
    for (var r=0; r<6; r++){
        for (var c=0; c<4; c++){
            if (checkColors(returnColor(r,c),returnColor(r,c+1),returnColor(r,c+2),returnColor(r,c+3))){
                console.log("Horizontal Win")
                return true
            }
        }
    }
}

//check for vertical win
function verticalWin(){
    for (var c=0; c<7; c++){
        for (var r=0; r<3; r++){
            if (checkColors(returnColor(r,c),returnColor(r+1,c),returnColor(r+2,c),returnColor(r+3,c))){
                console.log("Vertical Win")
                return true
            }
        }
    }
}

//check for diagonal win
function diagonalWin(){
    for (var r=0; r<3; r++){
        for(var c=0; c<4; c++){
            if(checkColors(returnColor(r,c),returnColor(r+1,c+1),returnColor(r+2,c+2),returnColor(r+3,c+3))){
                console.log("Diagonal Win")
                return true
            }
        }
    }
    for (var r=3; r<6; r++){
        for(var c=0; c<4; c++){
            if(checkColors(returnColor(r,c),returnColor(r-1,c+1),returnColor(r-2,c+2),returnColor(r-3,c+3))){
                console.log("Diagonal Win")
                return true
            }
        }
    }
}

//check for tie, entire board is filled up
function tieGame(){
    var gray = 'rgb(128, 128, 128)'
    if (returnColor(0,0)!= gray && returnColor(0,1)!= gray && returnColor(0,2)!= gray && returnColor(0,3)!= gray && returnColor(0,4)!= gray && returnColor(0,5)!= gray && returnColor(0,6)!= gray){
        return true
    } 
}

// Start with Player One
var currentPlayer = 1;
var currentPlayerName = player1Name;
var currentPlayerColor = player1Color;

$('h3').text(player1Name+": it is your turn. You are blue.")

//Main Game
$('.board button').on('click',function(){

    //current column index
    var currentCol = $(this).closest('td').index()
    
    //if statement doesnt allow accidental click of fully filled column to toggle currentPlayer info
    if (typeof(nextGrayRow(currentCol))!= "undefined"){
        //return row that is available to be changed then changes color according to currentCol
        var currentRow = nextGrayRow(currentCol);
        changeColor(currentRow,currentCol,currentPlayerColor);

        //check for win
        if (horizontalWin()||verticalWin()||diagonalWin()){
            returnResult("win",currentPlayerName)
        }else if (tieGame()){
            returnResult("tie",currentPlayerName)
        }

        //currentPlayer variable changes after
        currentPlayer *= -1

        //change name and color
        if (currentPlayer == 1){
            currentPlayerName = player1Name;
            currentPlayerColor = player1Color;
            $('h3').text(currentPlayerName+": it is your turn. You are blue.")
        } else{
            currentPlayerName = player2Name;
            currentPlayerColor = player2Color;
            $('h3').text(currentPlayerName+": it is your turn. You are red.")
        }
    }
})