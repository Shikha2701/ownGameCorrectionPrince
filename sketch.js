var backgroundImg,invisibleGround,bg;
var sunImg,SUN;
var cloudImg,CLOUD;
var stageImg,STAGE;
var boyImg1,boyImg2,boyImg3;
var boy;
var coronaImg,corona;
var maskImg,MASK;
var sanitizerImg,SANITIZER;
var rand;
var coro;
var badal;
var coronaGrp;
var maskGrp;
var sanitizerGrp;
var stageGrp;
var boyStanding;
var score = 0;
var PLAY;
var gameState = "PLAY";
var END ; 

var name ="dominic" //string
var num= 7;   //number
var value=true; //boolean(true/false)
null,undefined;

//array is data a structure;
 var combination = [3,"name",true];    //1D
 console.log(combination[1]);
 combination.push("flower");
 console.log(combination);
 combination.pop();
 console.log(combination);



 var D2= [["dominic",13],["name",10],["animal",56]];
 console.log(D2[2][0]);


 var students= "dominic";
 var second="shikha"

function preload() {
  backgroundImg = loadImage("bg-1.png");
  boyImg1 = loadAnimation("BOY1.png","BOY2.png","BOY3.png");
  boyImg2 = loadImage("BOY2.png");
  coronaImg = loadImage("CORONA.png");
  maskImg = loadImage("mask.png");
  sanitizerImg = loadImage("sanitizer.png");
  sunImg = loadImage("sun.png");
  cloudImg = loadImage("cloud.png");
  stageImg = loadImage("stage.png");
  boyStanding = loadAnimation("BOY2.png");
  jumpSound = loadSound("jump.wav");
  collidedSound = loadSound("collided.wav");

}

function setup() {
  createCanvas(displayWidth,displayHeight - 120);
  
  bg = createSprite(displayWidth/2,displayHeight - 530);
  bg.addImage(backgroundImg);
  bg.scale = 4.2; 
  bg.x = bg.width / 2;
  bg.velocityX = -8;

  SUN = createSprite(displayWidth - 120,displayHeight - 790,100,100);
  SUN.addImage("SUN",sunImg);
  SUN.scale = 0.2;

 
  //console.log(displayWidth - 1350);
  boy = createSprite(displayWidth - 1350,displayHeight - 300,100,100);
  boy.addAnimation("boy",boyImg1);
  boy.addAnimation("boyStanding",boyStanding);
  boy.setCollider("rectangle",0,10,boy.width,boy.height);
  boy.debug = true;


  invisibleGround = createSprite(displayWidth/2,displayHeight - 100,10000,10);
  invisibleGround.shapeColor = "red";
  invisibleGround.visible = false;

  rand = Math.round(random(200,500));
  //console.log(rand);
  coro = Math.round(random(displayHeight - 100,displayHeight - 400));

  coronaGrp = new Group();
  maskGrp = new Group();
  sanitizerGrp = new Group();
  stageGrp = new Group();

  score = 0;
  
}

function draw() {
  background("lightblue");  
  if(bg.x<displayWidth/3) 
    {
      bg.x = displayWidth/2
    }
 //joining the ground or infinitive ground
  if(gameState === "PLAY") 
  {
    //console.log(boy.y);
    //jumping the boy
    if(keyDown(UP_ARROW) && boy.y>=550 ) 
    {
      boy.velocityY = -20;
      jumpSound.play();
    }
     boy.velocityY = boy.velocityY + 0.8;

     if(coronaGrp.isTouching(boy)) 
     {
       collidedSound.play();
       gameState = END;
     }
     boy.collide(invisibleGround);
     stageGrp.collide(boy);


  }
 
  if(gameState === "END") {
   
    boy.velocityY = 0;
    // bg.velocityX = 0;
    // CLOUD.velocityX = 0;
    // corona.velocityX = 0;
    // MASK.velocityX = 0;
    // //SANITIZER.velocityX = 0;
    //STAGE.velocityX = 0;
    //SANITIZER.visible = false;
    //STAGE.visible = false;
    //boy.visible = false;
    //boy.changeAnimation("boyStanding",boyStanding);
    console.log("touch");

  }


 if(maskGrp.isTouching(boy)) 
 {
    MASK.visible = false;
    score = score + 1;

  }

  
  spawnCorona();
  spawnMask();
  spawnSanitizer();
  spawnCLOUD();
  spawnStage();

  drawSprites();

  textSize(20);
  stroke(3);
  fill("black")
  text("Score: "+ score, camera.position.x,50);
  
}

function spawnCorona() {
  if(frameCount%200 === 0) {
    console.log(coro);
    corona = createSprite(displayWidth - 10,displayHeight - 180,100,100);
    corona.addImage("corona",coronaImg);
    corona.scale = 0.2;
    corona.velocityX = -8;
    coronaGrp.add(corona); 
  }
  }

  function spawnCLOUD() {
    badal = Math.round(random(100,200));
    if (frameCount%badal === 0){
      CLOUD = createSprite(displayWidth - 40,displayHeight - 700,100,100);
      CLOUD.addImage("CLOUD",cloudImg);
      CLOUD.scale = 2;
      CLOUD.velocityX = -8;


    }

  }
 
function spawnMask() {
  var num;
  num = Math.round(random(displayWidth -100,displayHeight - 400 ));
  if(frameCount% 200 === 0) {
  MASK = createSprite(displayWidth - 10,num,100,100);
  MASK.addImage("MASK",maskImg);
  MASK.scale = 0.08;
  MASK.velocityX = -8;
  maskGrp.add(MASK);
  

}

}

function spawnSanitizer() {
  var sani;
  sani = Math.round(random( 200,displayHeight - 700));
  if(frameCount% 600 === 0) {
  SANITIZER = createSprite(displayWidth - 200,sani,100,100);
  SANITIZER.addImage("SANITIZER",sanitizerImg);
  SANITIZER.scale = 0.4;
  SANITIZER.velocityX = -8;
  sanitizerGrp.add(SANITIZER);
}

}

function spawnStage() {
  var lower = Math.round(random(200,displayHeight - 600));
  if(frameCount%570 === 0) {
  STAGE = createSprite(displayWidth - 220,displayHeight - 400,100,100);
  STAGE.addImage("STAGE",stageImg);
  STAGE.scale = 0.5;
  STAGE.velocityX = -10;
  stageGrp.add(STAGE);
  
}
}

