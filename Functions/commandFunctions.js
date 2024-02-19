function getHeadsOrTails() {
    if(Math.random() < 0.5){
        return "Es cara!";
    }
    else{
        return "Es cruz!";
    }
};

function getHeadsOrTails(lastResponse) {
    if(Math.random() < 0.5){
        if(lastResponse === "Es cara!"){
            return "De nuevo, es cara!";
        }
        else{
            return "Es cara!";
        }
    }
    else{
        if(lastResponse === "Es cruz!"){
            return "De nuevo, es cruz!";
        }
        else{
            return "Es cruz!";
        }
    }
};

function choosePpt(){ //Function that gets randomly a value between rock paper or scissors
    num = Math.random();

    if(num <= 0.33){
        return "rock";
    }
    else if(num > 0.33 && num <= 0.66){
        return "paper";
    }
    else{
        return "scissors";
    }

}

function rpsWinner(election, opponentElection){ //This function return 1 if the election is winner, 0 if its a draw and -1 if its a lose
    if(election === "rock"){

        switch(opponentElection){
            case ("rock"):
                return 0;

            case ("paper"):
                return -1;

            case("scissors"):
                return 1;
        }

    }
        else if(election === "paper"){

            switch(opponentElection){
                case ("paper"):
                    return 0;

                case ("rock"):
                    return 1;

                case("scissors"):
                    return -1;
            }

        }
        else{ //election === scissors

            switch(opponentElection){
                case ("scissors"):
                    return 0;

                case ("paper"):
                    return 1;

                case("rock"):
                    return -1;
            }
        }
}



function getRpsWinner(userElection){
    botElection = choosePpt();
    if(userElection === botElection){
        return `Empate! Ambos hemos sacado ${userElection}`;
    }

    if(rpsWinner(userElection, botElection) === 1){
        return `Tu ganas! Has sacado ${userElection} y yo ${botElection}`;
    }
    else if(rpsWinner(userElection, botElection) === -1){
        return `Gané! Te avisé que soy muy bueno 🙈 Has sacado ${userElection} y yo ${botElection}`;
    }
}


module.exports = {getHeadsOrTails, getRpsWinner, rpsWinner};
