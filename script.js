function resizeStreet()
{
//Margin-top: Linee Guida
	streetHeight = document.getElementsByClassName("strada")[0].offsetHeight;
	
	lineeGuidaHeight = document.getElementsByClassName("linee-guida")[0].offsetHeight;
	
	marginTopValue=(streetHeight/2)-lineeGuidaHeight;
	
	Array.from(document.getElementById("street1").querySelectorAll(".linee-guida")).forEach(function(item, index) {
		item.style.marginTop = marginTopValue+"px";
	});
	
	Array.from(document.getElementById("street2").querySelectorAll(".linee-guida")).forEach(function(item, index) {
		item.style.marginTop = marginTopValue+"px";
	});
	
//Margin-Left: Linee Guida
	streetWidth = document.getElementsByClassName("strada")[0].offsetWidth;
	
	lineeGuidaWidth = document.getElementsByClassName("linee-guida")[0].offsetWidth;
	
	marginLeftValue=(streetWidth-(lineeGuidaWidth*6))/7;
	
	Array.from(document.getElementById("street1").querySelectorAll(".linee-guida")).forEach(function(item, index) {
		item.style.marginLeft = marginLeftValue+"px";
	});
	
	Array.from(document.getElementById("street2").querySelectorAll(".linee-guida")).forEach(function(item, index) {
		item.style.marginLeft = marginLeftValue+"px";
	});
	
//Calcolo corsie
	//streetHeight già preso

	//lineeGuidaHeight già preso
	
	corsie[0] = (streetHeight/2)-lineeGuidaHeight;
	corsie[1] = (((streetHeight/2)+streetHeight)/2)+lineeGuidaHeight;
	
	divisoreHeight = document.getElementsByClassName("divisore")[0].offsetHeight;
	spaziatoreHeight = document.getElementsByClassName("spaziatore")[0].offsetHeight;
	
	corsie[2] = ((streetHeight/2)-lineeGuidaHeight)+streetHeight+(divisoreHeight*2)+spaziatoreHeight;
	corsie[3] = (((streetHeight/2)+streetHeight)/2)+lineeGuidaHeight+streetHeight+(divisoreHeight*2)+spaziatoreHeight;
	
//Calcolo margin-left automatico

	marginLeftAuto = getBodyWidth();
	marginLeftAuto = marginLeftAuto * (10/100);
}

function getBodyWidth()
{
	bodyWidth = document.getElementsByTagName("body")[0].offsetWidth;
	
	return bodyWidth;
}


/* --- Timer/Score --- */

function start(){
	ms = 0;
	score = 0;
	valoreDaSottrarre = 5;
	range = 500;
	vecchioScore = 0;

	counterVita = 3;

	posizionePersonaggio = 1;
	
	scoreCounter.style.color = "#ffffff";
    currentTimer = setInterval(updateTimer, 10);
}

function updateTimer()
{
	score = parseInt(score);
	marginLeftAuto = parseInt(marginLeftAuto);
	
	if((score - vecchioScore) >= 50)
	{
		vecchioScore=score;
		
		if(range>=15)
		{
			range-=15;
		}
		valoreDaSottrarre+=1;
	}
	
	
	ms++;
	
	
	if(Math.floor(Math.random() * range) == 7)
	{
		posizioneImmagine = Math.floor(Math.random() * arrayImg.length);
		
		if(!arrayImg[posizioneImmagine][1] && arrayImg[posizioneImmagine][0] != "accendino")
		{
			document.getElementById(arrayImg[posizioneImmagine][0]).style.display = "block"; /* Modificare in caso di problemi */
			
			arrayImg[posizioneImmagine][4] = "stallo";
			
			random = Math.floor(Math.random()*2);
			
			if(random)
			{
				document.getElementById(arrayImg[posizioneImmagine][0]).classList.add("top");
				document.getElementById(arrayImg[posizioneImmagine][0]).classList.remove("bottom");
				
				arrayImg[posizioneImmagine][3] = "0";
			} else {
				document.getElementById(arrayImg[posizioneImmagine][0]).classList.add("bottom");
				document.getElementById(arrayImg[posizioneImmagine][0]).classList.remove("top");

				arrayImg[posizioneImmagine][3] = "3";
			}
			
			arrayImg[posizioneImmagine][1] = true;
		}
		
		if (Math.floor(Math.random() * 4200) == 69 && !arrayImg[5][1])
		{
			posizioneCorsia = Math.floor(Math.random() * 4);
			
			document.getElementById("accendino").style.display = "block";
			document.getElementById("accendino").style.marginTop = corsie[posizioneCorsia] + "px";
			arrayImg[5][3] = posizioneCorsia;
			
			arrayImg[5][1] = true;
		}
		
	}
	
	
	for (i = 0; i<arrayImg.length; i++)
	{
		if(arrayImg[i][1])
		{
			if(arrayImg[i][2]<(marginLeftAuto+10) && arrayImg[i][2]>(marginLeftAuto-10))
			{
				if (arrayImg[i][3] == posizionePersonaggio)
				{
					arrayImg[i][4] = "fischio";
				} else if (arrayImg[i][4] != "fischio")
				{
					arrayImg[i][4] = "rispetto";
				}
			} else if (arrayImg[i][2]<(marginLeftAuto-10) && arrayImg[i][4] == "rispetto")
			{
				if(arrayImg[i][0] != "accendino")
				{
					counterVita--;
				}
				arrayImg[i][4] = "stallo";
			} else if (arrayImg[i][2]<(marginLeftAuto-10) && arrayImg[i][4] == "fischio")
			{
				score+=10;
				arrayImg[i][4] = "stallo";
				
				
				
				switch(arrayImg[i][0])
				{
					case "scuola":
						if(Math.floor(Math.random()*2) == 0)
						{
							document.getElementById("bagno").play();
						} else {
							document.getElementById("cattedra").play();
						}
						break;
					case "accendino":
						counterVita++;
						break;
					default:
						document.getElementById("fantastica").play();
						break;
				}
			}
		}
	}
	
	street1-=valoreDaSottrarre;
	street2-=valoreDaSottrarre;
	
	for (i=0; i<arrayImg.length; i++)
	{
		if(arrayImg[i][1])
		{
			arrayImg[i][2]-=valoreDaSottrarre;
			document.getElementById(arrayImg[i][0]).style.left = arrayImg[i][2] + "px";
		}
	}
	
	
	if (strada2Secondaria && street2 < valoreDaSottrarre)
	{
		document.getElementById("street1").style.left = bodyWidth + "px";
		street1 = bodyWidth;
		strada2Secondaria = false;
	}
	
	if (!strada2Secondaria && street1 < valoreDaSottrarre)
	{
		document.getElementById("street2").style.left = bodyWidth + "px";
		street2 = bodyWidth;
		strada2Secondaria = true;
	}
	
	for (i=0; i<arrayImg.length; i++)
	{
		if (arrayImg[i][2] < -110)
		{
			document.getElementById("street2").style.left = bodyWidth + "px";
			arrayImg[i][2] = bodyWidth;
			document.getElementById(arrayImg[i][0]).style.display = "none";
			
			arrayImg[i][1] = false;
		}
	}
	
	document.getElementById("street1").style.left = street1 + "px";
	document.getElementById("street2").style.left = street2 + "px";
	
	
	if (ms == 100)
	{
		score++;
		ms=0;
	}
	
	if (score < 10 || score == 0)
	{
		score = '000' + score;
	} else if (score < 100 || score == 0)
	{
		score = '00' + score;
	} else if (score < 1000 || score == 0)
	{
		scoreCounter.style.color = "#70eab6";
		score = '0' + score;
	} else {
		scoreCounter.style.color = "#e8a70f";
	}
	
	scoreCounter.innerHTML = score;
	document.getElementById("counter-vita").innerHTML = counterVita;
	
	if(counterVita<=0)
	{
		stopTimer();
		
		document.getElementById("img-container").style.display = "none";
		
		document.getElementById("riepilogo").style.display = "block";
		document.getElementById("riepilogo").style.opacity = "1";
		
		document.getElementById("title").innerHTML = "Hai perso!";
		score = parseInt(score)
		document.getElementById("counter-score").innerHTML = "Score: " + score;
	}
}


function stopTimer() {
    clearInterval(currentTimer);
	scoreCounter.innerHTML = "0000";
}

const scoreCounter = document.getElementById('score');

var ms = 0;
var score = 0;

var arrayImg = [["donna-1", false, 0, 3, "stallo"],
					["donna-2", false, 0, 3, "stallo"],
					["donna-3", false, 0, 3, "stallo"],
					["donna-4", false, 0, 3, "stallo"],
					["scuola", false, 0, 3, "stallo"],
					["accendino", false, 0, 1, "stallo"]];
					//ID, visibilità, posizione, corsia, status fischio

var bodyWidth;
var street1 = 0;
var street2;
var strada2Secondaria = true;
var valoreDaSottrarre = 5;
var range = 500;
var vecchioScore = 0;

var counterVita = 3;

var marginLeftAuto;

var posizionePersonaggio = 1; /* Corsia: altoCorsia2 */
var corsie = new Array(4);
/* altoCorsia1 - altoCorsia2 - bassoCorsia1 - bassoCorsia2 */


window.addEventListener('load', function(event){    
    resizeStreet();
	
	street2 = getBodyWidth();
	
	document.getElementById("street2").style.left = street2 + "px";
	
	Array.from(document.getElementById("img-container").querySelectorAll(".donne")).forEach(function(item, index) {
		for(i=0; i<arrayImg.length; i++)
		{
			arrayImg[index][2] = street2;
		}
		
		item.style.left = streetWidth + "px";
	});
	
	document.getElementById("er-faina-item").style.marginTop = corsie[1] + "px";
});

window.addEventListener('resize', function(event){    
    resizeStreet();
	bodyWidth = getBodyWidth();
});


document.getElementById("button").onclick = function() {
	
	document.getElementById("riepilogo").style.opacity = "0";
	
	setTimeout(function(){
		document.getElementById("riepilogo").style.display = "none";
		document.getElementById("img-container").style.display = "block";
	}, 500);
	
	start();
}


document.onkeydown = function myFunction() {
	
	/*
		38: Up
		40: Down
		37: Right
		39: Left
	*/
	switch (event.keyCode)
	{
		case 38:
			/* Up */
			
			if(posizionePersonaggio>0 && posizionePersonaggio <=3)
			{
				posizionePersonaggio--;
			}
			
			document.getElementById("er-faina-item").style.marginTop = corsie[posizionePersonaggio] + "px";

			break;
		case 40:
			/* Down */

			if(posizionePersonaggio>=0 && posizionePersonaggio <3)
			{
				posizionePersonaggio++;
			}
			
			document.getElementById("er-faina-item").style.marginTop = corsie[posizionePersonaggio] + "px";
			
			break;			
	}
}