// Funktion för att sätta spelarnas namn

function setNames () {
    let player1 = document.querySelector('#player1')
    let player2 = document.querySelector('#player2')
    playerOne.name = player1.value
    playerTwo.name = player2.value
    updateDisplays()
}

let playerOne = {
    name: "Spelare 1",
    score: 0
}

let playerTwo = {
    name: "Spelare 2",
    score: 0
}

let players = [playerOne, playerTwo];
let gameTurn = 0;
let playerTurnLbl = document.querySelector(".player-turn-lbl");
let playerOneScorePara = document.querySelector(".player-one-score");
let playerTwoScorePara = document.querySelector(".player-two-score");

// Funktion för att uppdatera namnen samt poängen
function updateDisplays() {
    let currentPlayer = players[gameTurn];
    playerTurnLbl.innerText = currentPlayer.name;
    playerOneScorePara.innerText = `${players[0].name}: ${players[0].score}`
    playerTwoScorePara.innerText = `${players[1].name}: ${players[1].score}`
}

// Funktion för att alternera spelare
function changePlayer(){
gameTurn = (gameTurn + 1) % 2; 
}

// Funktion för att kolla om någon vunnit eller om det är oavgjort
function checkWinner() { 
    if (playerOne.score === 7){
       alert(`Grattis ${playerOne.name}, du vann! Fortsätt spela om ni vill!`);
    }
    else if (playerTwo.score === 7){
       alert(`Grattis ${playerTwo.name}, du vann! Fortsätt spela om ni vill!`);
    } 
    else if (playerOne.score === 6 && playerTwo.score === 6){
        alert("Oavgjort, försök igen!");
    }
}

const gamefield = document.querySelector(".game-field");

// Array som innehåller samtliga bilder
const cardArray = () => [ 
    {imgSrc: "./assets/pic1.png", name: "pic1"},
    {imgSrc: "./assets/pic2.png", name: "pic2"},
    {imgSrc: "./assets/pic3.png", name: "pic3"},
    {imgSrc: "./assets/pic4.png", name: "pic4"},
    {imgSrc: "./assets/pic5.png", name: "pic5"},
    {imgSrc: "./assets/pic6.png", name: "pic6"},
    {imgSrc: "./assets/pic7.png", name: "pic7"},
    {imgSrc: "./assets/pic8.png", name: "pic8"},
    {imgSrc: "./assets/pic9.png", name: "pic9"},
    {imgSrc: "./assets/pic10.png", name: "pic10"},
    {imgSrc: "./assets/pic11.png", name: "pic11"},
    {imgSrc: "./assets/pic12.png", name: "pic12"},
    {imgSrc: "./assets/pic1.png", name: "pic1"},
    {imgSrc: "./assets/pic2.png", name: "pic2"},
    {imgSrc: "./assets/pic3.png", name: "pic3"},
    {imgSrc: "./assets/pic4.png", name: "pic4"},
    {imgSrc: "./assets/pic5.png", name: "pic5"},
    {imgSrc: "./assets/pic6.png", name: "pic6"},
    {imgSrc: "./assets/pic7.png", name: "pic7"},
    {imgSrc: "./assets/pic8.png", name: "pic8"},
    {imgSrc: "./assets/pic9.png", name: "pic9"},
    {imgSrc: "./assets/pic10.png", name: "pic10"},
    {imgSrc: "./assets/pic11.png", name: "pic11"},
    {imgSrc: "./assets/pic12.png", name: "pic12"},
    ];

    //Randomizerar alla kort
    const randomize =() =>{
        const cardData = cardArray(); //Går igenom samtliga kort
        cardData.sort(() => Math.random() - 0.5); //Randomizerar en array. sort= sorterar ut korten
        return cardData; //Returnerar en randomizerad array
    }

//Kortgenerator
const cardGenerator = () => {
    const cardData = randomize(); // Tar den randomizerade arrayen från randomize och genererar ett nytt spelfält
    
    cardData.forEach(item => {  // Här skapas samtliga element och slås ihop 
        const card = document.createElement('div') ; // Div som innehåller både baksida och framsida av kortet
        const frontSide = document.createElement("div"); // Baksidan av kortet 
        const backSide = document.createElement("img") // Genererar kortet spelaren ser när kortet vänts 
        card.classList = "card"; // Döper card till klassen card i html
        frontSide.classList = "frontSide" // Döper frontSide till klassen frontSide i html
        backSide.classList = "backSide" // Döper backSide till klassen backSide i html
        
    // Lägger till information om korten och lägger till source
    backSide.src = item.imgSrc 
    card.setAttribute("name", item.name)

    // Lägger till korten (append) i spelfältet
    gamefield.appendChild(card); // Båda sidorna läggs till som barn till gamefield
    card.appendChild(frontSide);
    card.appendChild(backSide);

    card.addEventListener("click", (e) => { // 
        card.classList.toggle("toggleCard"); // Togglecard används enbart för animationen
        checkCard(e);
    })
})
}
    // Kollar korten 
    const checkCard = (e) => { //e= event
        console.log(e);
        const chosenCard = e.target;

         // När vi klickat på ett kort så läggs klassen turned in på diven samt tilldelas variabeln turnedCards
        chosenCard.classList.add("turned"); 
        let turnedCards = document.querySelectorAll(".turned");

        //Logic
        let currentPlayer = players[gameTurn];
        if(turnedCards.length === 2) { // if kollar om turnedCards nått 2 och kör i såna fall nästa if
            // Kollar om korten med klassen turned har samma namn (från info i cardArray) och tar i såna fall bort
            // klassen turned och gör att den ej blir klickbar
            if(turnedCards[0].getAttribute("name") ===
            turnedCards[1].getAttribute("name")) 
            {
               
                turnedCards.forEach(card => {
                    card.classList.remove("turned"); 
                    card.style.pointerEvents = "none"; // Tar bort turned samt görs ej klickbar, då körs ej animationen igen och korten ligger kvar
                   
                })
                currentPlayer.score++; 
                turnedCards=[]; // Tömmer arrayen
                updateDisplays(); // Uppdaterar spelarnas poäng
                checkWinner(); // Kollar funktionen om någon spelare nått 7 poäng eller om båda nått 6 poäng
            }
            
            else{
              
                turnedCards.forEach((card) => {
                card.classList.remove("turned");
                setTimeout(() => card.classList.remove("toggleCard"), 1000);  // Fördröjer animationen så man ser det felande kortet
                turnedCards=[];
            })
            changePlayer(); // Kör funktionen spelarbyte
            updateDisplays(); // Uppdaterar spelarnas poäng
            }
        }
    }
cardGenerator();
updateDisplays();