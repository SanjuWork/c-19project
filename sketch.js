//Global Variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var Monkey, Monkey_running;
var ground,groundImage;

var gameOver,restart,gameOverImage,restartImage;

var BananaGroup, BananaImage;
var BananaGroup;

var jungle,jungleImage;
var stone,Image;

function preload(){
  Monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 groundImage = loadImage("ground.jpg");
  
 BananaImage = loadImage("Banana.png");
  
 jungleImage = loadImage("jungle.jpg");
 stoneImage = loadImage("stone.png");
  
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
  
  MonkeyCollide = loadAnimation("Monkey_01.png");
}


function setup() {
  createCanvas(600,300);
  
  jungle = createSprite(300,150,20,20);
  jungle.addImage("Ironman",jungleImage);
  jungle.scale = 1.5;
  
  Monkey = createSprite(100,0,20,50);
  
  Monkey.addAnimation("running", Monkey_running);
  Monkey.scale = 0.1;
  
  ground = createSprite(0,380,1000,20);
  ground.addImage("ground",groundImage);
  ground.scale=0.4; 
  ground.x = ground.width /2;
  ground.velocityX=-5
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  gameOver.visible = false;
  restart.visible = false;
  
  BananaGroup = new Group();
  stoneGroup = new Group();
  
  score = 0;
}


function draw(){
 background(255); 
   if (gameState===PLAY){
    
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    if(keyDown("space") && Monkey.y >= 160) {
      Monkey.velocityY = -12;
    }
     
     Monkey.collide(ground);
  
    Monkey.velocityY = Monkey.velocityY + 0.9
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    Monkey.collide(ground);
    banana();
    Stone();
  
    if(stoneGroup.isTouching(Monkey)){
        gameState = END;
    }
     
   }
  
   else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
     
    Monkey.changeAnimation("owch",MonkeyCollide);
     
    //set velcity of each game object to 0
    ground.velocityX = 0;
    Monkey.velocityY = 0;
    BananaGroup.setVelocityXEach(0);
    stoneGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }
   }
     drawSprites();
}
  
 function banana() {
  
  if (frameCount % 90 === 0) {
    Banana = createSprite(600,120,40,10);
    Banana.y = Math.round(random(90,150));
    Banana.addImage(BananaImage);
    Banana.scale = 0.1;
    Banana.velocityX = -2;
      
    BananaGroup.add(Banana);
  }
  
}

function Stone() {
  
  if (frameCount % 120 === 0) {
    stone = createSprite(620,170,10,10);
    stone.addImage(stoneImage);
    stone.scale = 0.2;
    stone.velocityX = -4;
      
    stoneGroup.add(stone);
  }
  
}

 
  