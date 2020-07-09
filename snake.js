
//kreiramo canvas element
const cvs = document.getElementById("snake");

//kreiramo metod koji ce nam dozvoliti crtanje u canvasu
const ctx = cvs.getContext("2d");

//kreiramo jedinicu koja ce nam predstavljati dimenziju polja(pixeli)
const box = 32;

//ucitavanje slika-slikom predstavljamo pozadinu i hranu tj. krofne
const ground = new Image();
ground.src = "img/sand1.jpeg";
const foodImg = new Image();
foodImg.src = "img/food.png";


ucitajIme();


//kreiramo zmiju, u vidu niza
let snake = [];

//inicijalizujemo glavu zmije, prvi kvadratic
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// kreiramo krofnu- objekat koji zmija jede
//ovaj objekat generisemo random, kako bi nam svaki put bio na nekoj
//drugoj poziciji
let food = {
    //pozicija za x ce biti izmedju 1 kockice i 17
    x : Math.floor(Math.random()*17+1) * box,
    //pozicija za y izmedju 3 i 17kockica
    y : Math.floor(Math.random()*15+3) * box
   
}

// promenljiva za rezultat
let score = 0;

//promenljiva koja prati poziciju zmije tj. njenog kretanja
let d;

document.addEventListener("keydown",direction);


//kod tastera levo, desno, gore, dole
//to nam odredjuje poziciju i smer kretanja
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// funkcija koja proverava sudar tj. da li je zmija 'pojela' samu sebe
//proveravamo da li je pozicija 'nove glave' tj. polja koje ce sledece //postati glava zmije neko od elemenata niza koji cini zmijicu
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}



//crtamo objekte
function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        //postavljamo boju prve kockice u braon, ostatak-rep ce biti beo
        ctx.fillStyle = ( i == 0 )? "brown" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        //ivice postavljamo na crvenu boju(uoivicene kockice)
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    //postavljamo objekat na odgovarajucu poziciju
    ctx.drawImage(foodImg, food.x, food.y);
    
    // pozicija stare glave
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // smer kretanja
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // ako pojede krofnu, uvecaj rezl, postavi novu krofnu random
    //zmija jede krofnu kada se pozicija glave poklopi sa pozicijom krofne
    if(snakeX == food.x && snakeY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
       //ne brisemo rep, vec samo dodamo novu glavu
    }else{
        // ako nije pojela krofnu, skini rep, jer se pomera
        snake.pop();
    }
    
    //Dodajemo novu glavu
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    //Kraj igre
    //Igra je gotova ako 1.zmijica udari u neki od 4 zida ili 2.ako 'pojede samu sebe' tj. dodje do sudara
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        window.alert("Game over! Your score is: " + score);
        posaljiRezultat(ime, score);
    }
    
    snake.unshift(newHead);
    
    //ispis rezultata(gornji levi ugao)-boja, font, pozicija
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

//na svakih 100ms se poziva draw() function
let game = setInterval(draw,100);

