
//kreiramo canvas element
const cvs = document.getElementById("snake");

//kreiramo metod koji ce nam dozvoliti crtanje u canvasu
const ctx = cvs.getContext("2d");

//kreiramo jedinicu koja ce nam predstavljati (pixeli)
const pomeraj = 32;

//ucitavanje slika-slikom predstavljamo pozadinu i hranu tj. krofne
const pesak = new Image();
pesak.src = "img/sand.png";
const krofnaSlika = new Image();
krofnaSlika.src = "img/food.png";


ucitajIme();


//kreiramo zmiju, u vidu niza
let zmija = [];

//inicijalizujemo glavu zmije, prvi kvadratic
zmija[0] = {
    x : 9 * pomeraj,
    y : 10 * pomeraj
};

// kreiramo krofnu- objekat koji zmija jede
//ovaj objekat generisemo random, kako bi nam svaki put bio na nekoj
//drugoj poziciji
let krofna = {
    //pozicija za x ce biti izmedju 1 kockice i 17
    x : Math.floor(Math.random()*17+1) * pomeraj,
    //pozicija za y izmedju 3 i 17kockica
    y : Math.floor(Math.random()*15+3) * pomeraj
   
}

// promenljiva za rezultat
let rezultat = 0;

//promenljiva koja prati poziciju zmije tj. njenog kretanja
let d;

document.addEventListener("keydown",kretanje);


//kod tastera levo, desno, gore, dole
//to nam odredjuje poziciju i smer kretanja
function kretanje(event){
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
function sudar(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}



//crtamo objekte
function crtaj(){
    
    ctx.drawImage(pesak,0,0);
    
    for( let i = 0; i < zmija.length ; i++){
        //postavljamo boju prve kockice u braon, ostatak-rep ce biti beo
        ctx.fillStyle = ( i == 0 )? "brown" : "white";
        ctx.fillRect(zmija[i].x,zmija[i].y,pomeraj,pomeraj);
        
        //ivice postavljamo na crvenu boju(uoivicene kockice)
        ctx.strokeStyle = "red";
        ctx.strokeRect(zmija[i].x,zmija[i].y,pomeraj,pomeraj);
    }
    
    //postavljamo objekat na odgovarajucu poziciju
    ctx.drawImage(krofnaSlika, krofna.x, krofna.y);
    
    // pozicija stare glave
    let zmijaX = zmija[0].x;
    let zmijaY = zmija[0].y;
    
    // smer kretanja
    if( d == "LEFT") zmijaX -= pomeraj;
    if( d == "UP") zmijaY -= pomeraj;
    if( d == "RIGHT") zmijaX += pomeraj;
    if( d == "DOWN") zmijaY += pomeraj;
    
    // ako pojede krofnu, uvecaj rezl, postavi novu krofnu random
    //zmija jede krofnu kada se pozicija glave poklopi sa pozicijom krofne
    if(zmijaX == krofna.x && zmijaY == krofna.y){
        rezultat++;
        krofna = {
            x : Math.floor(Math.random()*17+1) * pomeraj,
            y : Math.floor(Math.random()*15+3) * pomeraj
        }
       //ne brisemo rep, vec samo dodamo novu glavu
    }else{
        // ako nije pojela krofnu, skini rep, jer se pomera
        zmija.pop();
    }
    
    //Dodajemo novu glavu
    let newHead = {
        x : zmijaX,
        y : zmijaY
    }
    
    //Kraj igre
    //Igra je gotova ako 1.zmijica udari u neki od 4 zida ili 2.ako 'pojede samu sebe' tj. dodje do sudara
    if(zmijaX < pomeraj || zmijaX > 17 * pomeraj || zmijaY < 3*pomeraj || zmijaY > 17*pomeraj || sudar(newHead,zmija)){
        clearInterval(game);
        window.alert("Game over! Your score is: " + rezultat);
        posaljiRezultat(ime, rezultat);
    }
    
    zmija.unshift(newHead);
    
    //ispis rezultata(gornji levi ugao)-boja, font, pozicija
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(rezultat,2*pomeraj,1.6*pomeraj);
}

//na svakih 100ms se poziva crtaj() function
let game = setInterval(crtaj,100);

