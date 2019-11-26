/*------------------------------CREATED BY WADE HELQUIST--------------------------
--------------------------------LAST UPDATE 8/29/2017------------------------------*/
                    
/*-----------GOT THIS CODE TO CONSOLIDATE PROGRAM ONLINE---------*/                    
/* https://stackoverflow.com/questions/45909017/consolidating-html-code-button */
var gridSize = prompt("Pick a grid-size 1-10","3"), buttons=[], array_of_ids=[];
for (var i=1;i<=gridSize;i++) {
  for (var j=1;j<=gridSize;j++) {
    id = 's'+i+''+j;
    buttons.push('<button type="button" onclick="sc('+i+', '+j+')" id="'+id+'" class="but blue">X</button>');
    array_of_ids.push(id);
    if (j==gridSize) buttons.push('<br/>');
  }  
}
document.querySelector("#container").innerHTML=buttons.join("")
/*----------------------------------------------------------------*/
var count = 0, nextSolution = 'O', totalTime = 0, bestTime = 0;
var time_string = "";
document.getElementById("nextSolution").innerHTML = "<font size='+2'>Solve for<font size='+3' color='blue'><b> BLUE</b></font>.";
changeColor();
randomize (gridSize*gridSize);
// Example of 5x5 squares for functions:
/*               1        2           3           4         5  
            _____________________________________________________
           |          |          |           |         |         |
      1    |    11    |   12     |    13     |   14    |    15   |
           |__________|__________|___________|_________|_________|
           |          |          |           |         |         | 
      2    |    21    |   22     |    23     |   24    |    25   | 
           |__________|__________|___________|_________|_________| 
           |          |          |           |         |         |
      3    |    31    |   32     |    33     |   34    |    35   |
           |__________|__________|___________|_________|_________|    
           |          |          |           |         |         |
      4    |    41    |   42     |    43     |   44    |    45   |
           |__________|__________|___________|_________|_________| 
           |          |          |           |         |         |
      5    |    51    |   52     |    53     |   54    |    55   |
           |__________|__________|___________|_________|_________|    
           */
/*----------------------TIMER-----------------------------------*/
/* Found this online: https://stackoverflow.com/questions/20035357/display-current-time-from-javascript-count-up-timer/20035778#20035778 */
        var minutesLabel = document.getElementById("minutes");
        var secondsLabel = document.getElementById("seconds");
        
        var totalSeconds = 0; 
        setInterval(setTime, 1000);
        function setTime(){
            ++totalSeconds;   
            secondsLabel.innerHTML = pad(totalSeconds%60);
            minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
        }
        function pad(val){
            var valString = val + "";
            if(valString.length < 2)
              return "0" + valString;
            else
              return valString; 
        } 
        
function pause(){
  alert("Click OK when ready to continue");
}
/*-------------------RANDOMIZE-------------------------*/
function randomize(i){  
       for (var loop =0; loop <= i; loop++){
       sc(Math.floor(Math.random() * gridSize) + 1,
       Math.floor(Math.random() * gridSize) + 1);     
       solve();
       }
}
/*-------------------INDIVIDUAL SQUARES--------------*/
       
function s(x){
 if (document.getElementById(x).innerText == 'O')
      document.getElementById(x).innerText = 'X';
  else 
     document.getElementById(x).innerText = 'O';
}
/*---------------------ON CLICK----------------------*/
function sc(row, col){
 
  s("s" + row + col);  //Square that is clicked
  if((row-1) > 0) // One Above
    s("s" + (row-1) + col); 
  
  if((row + 1) <= gridSize) //One below
    s("s" + (row+1) +col); 
  
  if((col - 1) > 0) //One left
    s("s" + row + (col-1));
  
  if((col + 1) <= gridSize) //One right
    s("s" + row +(col+1));
  solve();
}
/*------------------------SOLVE---------------------------*/
function solve(){
      
       /*------------IF RED NEXT SOLUTION IS BLUE--------*/
if (nextSolution == 'X' && totalSeconds > 0 && changeColor()==(gridSize*gridSize)){   
      nextSolution = 'O';
      document.getElementById("nextSolution").innerHTML = "<font size='+2' color="white">Solve for<font size='+3' font color='blue'><b> BLUE</font></b>";
     
      document.getElementById("time").style.color = "blue";
      document.getElementById("minutes").style.color = "blue";
      document.getElementById("seconds").style.color = "blue";

      document.getElementById("title").style.color = "blue";
      document.getElementById("count").style.color = "red";
      document.getElementById("stats").style.color = "red";
      document.getElementById("stats2").style.color = "red";

      document.getElementById("button1").style.background='blue';
      document.getElementById("button1").style.color = "white";
      document.getElementById("button2").style.background='red';
      document.getElementById("button2").style.color = "black";

      //https://stackoverflow.com/questions/15071062/using-javascript-to-edit-css-gradient/15071347
      var dom = document.getElementById('background'); dom.style.backgroundImage = " radial-gradient(blue,red)";
      solveEnd(); 
      }      
       /*------------IF BLUE NEXT SOLUTION IS RED--------*/
if (nextSolution == 'O' && totalSeconds > 0 && changeColor()==(gridSize*gridSize)){   
      nextSolution = 'X';
      document.getElementById("nextSolution").innerHTML = "<font size='+2' color="white">Solve for<font size='+3' font color='red'><b> RED</font></b>";

      document.getElementById("time").style.color = "red";
      document.getElementById("minutes").style.color = "red";
      document.getElementById("seconds").style.color = "red";

      document.getElementById("title").style.color = "red";
      document.getElementById("count").style.color = "blue";
      document.getElementById("stats").style.color = "blue";
      document.getElementById("stats2").style.color = "blue";

      document.getElementById("button1").style.background='red';
      document.getElementById("button1").style.color = "black";
      document.getElementById("button2").style.background='blue';
      document.getElementById("button2").style.color = "white";

      // https://stackoverflow.com/questions/15071062/using-javascript-to-edit-css-gradient/15071347
      var dom = document.getElementById('background'); dom.style.backgroundImage = " radial-gradient(red,blue)";
      solveEnd();
      }   
      changeColor();   
}
          /*----PROVIDES STATS AND STARTS BOARD OVER---*/
          
function solveEnd(){
  if (bestTime == 0)
    bestTime = totalSeconds;
    
  if (bestTime > 0 && totalSeconds < bestTime)
     bestTime = totalSeconds
     
  totalTime += totalSeconds;
  count += 1;
  document.getElementById("count").innerHTML = "You have solved this <b>" + count +"</b> times in: " + min_and_sec(totalTime)
  document.getElementById("stats").innerHTML = "Thats an average of: " + min_and_sec((totalTime / count))
  document.getElementById("stats2").innerHTML = "Your best time is " + min_and_sec(bestTime)
  alert("You solved it!");  
  totalSeconds = 0;
  randomize(gridSize*gridSize);   
}
    /*----------GIVES BOARD COLOR AND COUNTS FOR WIN--------------*/
function changeColor(){
var win_count = 0;
for (i = 0; i < (gridSize*gridSize); i++){
  if (document.getElementById(array_of_ids[i]).innerText == 'O'){
      document.getElementById(array_of_ids[i]).style.background='blue';
      document.getElementById(array_of_ids[i]).style.color = 'blue'; 
      if (nextSolution == 'O') win_count += 1
      }
  else {document.getElementById(array_of_ids[i]).style.background='red';
       document.getElementById(array_of_ids[i]).style.color = 'red'; 
       if (nextSolution == 'X') win_count += 1
      } 
  }
  return win_count
}
 
function min_and_sec(time){
  if (time > 60)
    return time_string = "<b>" + (time / 60).toFixed(0) + 
    "</b> minutes <b>" + (time % 60).toFixed(0) + "</b> seconds."
  else 
    return "<b>" + time.toFixed(0) + "</b>" + " seconds."
}
