var inputArea = document.getElementById("inputArea");

if(inputArea){
 console.log("hello");
 var showButton = document.createElement("div");
 showButton.id = "showButton";  
 showButton.innerHTML = "Show password";
 inputArea.appendChild(showButton);
 
 var appendedButton = document.getElementById("showButton");
 appendedButton.onmousedown = function(){ document.getElementById("password").type = "text"; };
   
 appendedButton.onmouseup = function(){ document.getElementById("password").type = "password";};
 
}
