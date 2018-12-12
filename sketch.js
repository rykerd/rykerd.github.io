var fishPictures = [];

var fish = [];
var numberFish;
var remaining;
 var numberShark;
var caughtScore;
var catchX;
var catchY;
var fishOn = false;
var shark = [];
var sharkImg;
var final;

function preload(){
  pond = loadImage("catchFish/pond.jpg")
  boat = loadImage("boat.png")
  fisherman = loadImage("fisherman.png")
  fishPictures[0] = loadImage("catchFish/fish1.png");
  fishPictures[1] = loadImage("catchFish/fish2.png");
  fishPictures[2] = loadImage("catchFish/fish3.png");
  fishPictures[3] = loadImage("catchFish/fish4.png");
  hook = loadImage("catchFish/hook.png")
  sharkImg = loadImage("catchFish/shark.png")
  loser  = loadImage("loser.jpg")

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  numberFish = floor(random(25,35));    //random amounts of fish and sharks
  numberShark  = floor(random(6,13));
  remaining = numberFish;
  for (var i = 0; i < numberFish; i++) {
    fish[i] = new Fish(floor(random(4)));      //random types of fish will spawn
  }
  for (var i = 0; i < numberShark; i++) {
   shark[i] = new Shark();
}

  caughtScore = 0


}
function draw() {    //calling all the functions
  background(pond)
  image(fisherman,500,20,180,250)
  image(boat,300,20,300,300)
  for(var i = 0; i < fish.length;  i++){
    fish[i].display();
    fish[i].checkCaptured();
    fish[i].move();
    fish[i].catch();
    fish[i].reload();
  }
  for(var i = 0; i < shark.length;  i++){
  shark[i].display();
  shark[i].move();
  shark[i].offScreen();
  shark[i].lose();
  hookEm()
  showScore()
  }
}

function Fish (type){
  this.img = fishPictures[type];
  this.type = type;
  this.x = random(0, width);         //fish move randomly
  this.y = random(250, height);
  this.size =  random(50,130)        //different sized fish
  this.isCaptured = false;
  this.move = function() {
    this.x -= random(5,20);
  }
  this.display = function() {
    if( this.isCaptured == false){            //display dee fish
      image(this.img,this.x,this.y,this.size,this.size);
      this.y += random(5,-5);
      if(this.x> width || this.x<0){
        this.x= width;
      }
      if (this.y> height || this.y<250){
        this.y = random(0,height);
      }
    }
  }
  this.checkCaptured  = function() {
    if(mouseX> this.x && mouseX< this.x+100
      && mouseY> this.y && mouseY< this.y+100   //if fish is pressed
      && mouseIsPressed){
        fill(255,0,0);

        if (!this.isCaptured) {
          this.score();
        }

        this.isCaptured = true              //It is now captured
      }

    }

    this.catch = function(){
      catchY = this.y
      if(this.isCaptured == true){
        this.y-=10                            //caught fishies float up with the hook
        image(hook,mouseX,catchY-25,50,100)
        image(this.img, mouseX,this.y,this.size,this.size)
      }

    }
    this.score = function(){    //adds up the scores
      if(this.size <=75){
        caughtScore+=100        //different sized fish are worth different scores
      }
      if(this.size<=100 && this.size > 75){
        caughtScore += 50
      }
      if(this.size>100){
        caughtScore += 25
      }
    }
    this.reload = function (){
      if(this.y< -100){             // after fish is Caught, it will respawn
        this.isCaptured = false
        this.y = random(500,1000)
        catchY = 6000
        this.x -= random(5,20)
      }
    }
  }

  function Shark (){
    this.y = random(250,height-2000)
    this.x = random(0,6000)
    this.size =  random(300,600)          //spawn sharks randomly
    this.sharkCaught = false
    this.move = function() {
      this.x += random(5,20);            //sharkies move at random speeds
    }
    this.display = function(){
     if (this.sharkCaught == false){       //display them sharkies
      image(sharkImg, this.x,this.y,this.size,this.size)
    }
    }
    this.offScreen = function(){
      if(this.x> 6000 ){       // after moving off the screen the sharks respawn
        this.x = -100;
      }
      if (this.y> height-150 || this.y<250){
        this.y = random(0,height);
      }
    }
    this.lose = function(){
      final+=10
      if(mouseX> this.x && mouseX< this.x+this.size
        && mouseY> this.y && mouseY< this.y+this.size //if shark is pressed
        && mouseIsPressed){

          this.sharkCaught == true
          final = windowWidth            // ends the game and shows the score
          image(loser,0,0,windowWidth,windowHeight)
          text("Try again",100,100)
          text("FINAL SCORE :", 100,225)
          text(caughtScore,100,350)
          if( sharkCaught == true){
          image(loser,0,0,windowWidth,windowHeight)
          background(255)
          }

        }

    }
  }


  function hookEm(){        //the hook
    image(hook,mouseX-25,mouseY-25,50,100)
  }

  function showScore(){
    fill(0)                  //Shows da score
    textSize(75)
    text("Score : "+ caughtScore,1000,200)
  }

  function boat(){
    background(pond)
    image(fisherman,500,20,180,250)
    image(boat,300,20,300,300)
  }
