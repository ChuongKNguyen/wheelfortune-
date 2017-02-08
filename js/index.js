// var modal = document.getElementById('firework');

// display the alphabet keyboard
function showAlphabet(){
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h','i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z',' ','-','<','>','%','1','2','3','4','5','6','7','8','9','0','{','}'];
	var divbtn =""
	for (i=0;i< alphabet.length; i++ ){
		divbtn+="<button type='button' class='btn btn-primary letter-button'>"+alphabet[i]+"</button>"
	}
		$('#alphabet').html(divbtn);
}

// display the square of anwsers
function guessAnswer(arrayWord){
	this.arrayWord=arrayWord;
	var divbtn =""
	for (i=0;i< this.arrayWord.length; i++ ){
// 		divbtn+="<button type='button' class='btn btn-default'>"+this.arrayWord[i]+"</button>"
		divbtn+="<button type='button' class='btn btn-default letter-answer'>-</button>"
	}
		$('#answer').html(divbtn);
}

// display the letter selected by user if they selected the right one 
var oldArrayTrueFalse;
function showAnswer(arrayTrueFalse,arrayWord){
	this.arrayWord=arrayWord;
	this.newArrayTrueFalse=arrayTrueFalse;	
	var divbtn ="";
	
	if (oldArrayTrueFalse == null){
		console.log(" NULL")
		oldArrayTrueFalse=this.newArrayTrueFalse;
	}
	
	for (i=0;i< this.arrayWord.length; i++ ){
		this.newArrayTrueFalse[i]= this.newArrayTrueFalse[i] || oldArrayTrueFalse[i] 
	}
	
	console.log("this.newArrayTrueFalse 2 "+ this.newArrayTrueFalse)
	if (this.newArrayTrueFalse.every(Boolean)== true){
		for (i=0;i< this.arrayWord.length; i++ ){
			divbtn+="<button type='button' class='btn btn-default letter-answer'>"+this.arrayWord[i]+"</button>"	
		}
		alert("WELL DONE, SPINE AGAIN")
		showAlphabet()
		oldArrayTrueFalse =[];
// this is where i call the firework.js but i need couple more hours on it 
// 		activatefirework()
// 		setTimeout(activatefirework(), 1000);
// 		setTimeout(function(){ modal.style.display = "none";}, 5000);
	}
	else {
		for (i=0;i< this.arrayWord.length; i++ ){
		if (this.newArrayTrueFalse[i]== true) {
			// 		divbtn+="<button type='button' class='btn btn-default'>"+this.arrayWord[i]+"</button>"
			divbtn+="<button type='button' class='btn btn-default letter-answer'>"+this.arrayWord[i]+"</button>"
		}
		else divbtn+="<button type='button' class='btn btn-default letter-answer'>-</button>"
		}
		oldArrayTrueFalse = this.newArrayTrueFalse;
	}
	$('#answer').html(divbtn);

}


/*
function activatefirework(){
	document.body.appendChild(canvas);
	canvas.width = SCREEN_WIDTH;
	canvas.height = SCREEN_HEIGHT;
	setInterval(launch, 800);
	setInterval(loop, 1000 / 50);
}
*/

function checkAnswer(letter,arrayAnswer){
	this.letterCorrectIndex=[];
// 	this.letterCorrect="";
	this.stat="";
	this.letter=letter;
	this.arrayAnswer=arrayAnswer;
	for (i=0;i< this.arrayAnswer.length; i++ ){
		if (this.letter==this.arrayAnswer[i]){
// 			console.log("this.arrayAnswer[i] " +this.letter+this.arrayAnswer[i])	
			this.stat=true;
		}
		else {
			this.stat=false;
		}
// 		this.letterCorrect=this.letter;
		console.log("this.state in checkAnswer "+this.stat)
// 		console.log("lerre"+this.letterCorrect)
		this.letterCorrectIndex.push(this.stat)
		
	}
	console.log("DONE CHECKANSWER")
	return this.letterCorrectIndex
	
}



showAlphabet();



