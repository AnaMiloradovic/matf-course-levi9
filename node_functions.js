function loadUsername() {
    let person = prompt("Please enter your name", "Ana Miloradovic");
    let username = "";

    if (person == null || person == "") {
        username = "Unknown username";
    } else {
        username = person;
    }
    
    return username;
};


const sendResult = async (username, result) => {
    try { 
        const URL = 'http://localhost:3002/';
        const response = await fetch(URL, {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            mode : 'cors',
            body : JSON.stringify({
                name : username,
                score : result
            })
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
    } catch (err) {
        console.error(err);
    }
}

function showScore() {
    gameContext.font = "16px Arial";
    gameContext.fillStyle = "#585858";
    gameContext.fillText("Score: " + score, 980, 20);
}
