var INICIO = 1
var FIM = 0
var gameState = INICIO;

var catpou, catpouImg;

var birdAnimation;
var dog, dogImg
var water, waterImg
var portion, portionImg;

var score;

var fundoImg;
var chao, chaoImg;
var sound;
var playButton,playButtonImg;

var portionV,portionV2,portionV3, portionVImg;

var btn
var life = 3;

///ativador: se esta tocando
var Toque = false;


function preload(){
catpouImg = loadImage ("./assets/catpou.png");

birdAnimation = loadAnimation ("./assets/bird1.png", "./assets/bird2.png","./assets/bird3.png","./assets/bird4.png","./assets/bird5.png");
dogImg = loadImage("./assets/dog.png");
waterImg = loadImage ("./assets/water.png");
portionImg = loadImage ("./assets/portion.png");

portionVImg = loadImage ("./assets/portion.png");

fundoImg = loadImage ("./assets/background2.jpg");
chaoImg = loadImage ("./assets/chão.png");
sound = loadSound ("./assets/Música.mp3");

playButtonImg = loadImage ("./assets/PlayButton.png")

}



function setup(){
createCanvas(1600,750);

// btn = createSprite(800,350);
// btn.addImage(playButtonImg);

chao = createSprite (200, 630, 400, 20);
chao.addImage(chaoImg);
chao.debug = false;
 

catpou = createSprite (180,610,20,50);
catpou.addImage(catpouImg);
catpou.scale = 0.8
catpou.debug = true;
catpou.setCollider("circle", 0, 0, 70)

invisibleGround = createSprite(800,690,1600,10);
invisibleGround.visible = false;


portionV = createSprite(displayWidth-150,40);
portionV.addImage(portionVImg);
portionV.scale = 0.4;

portionV2 = createSprite(displayWidth-250,40);
portionV2.addImage(portionVImg);
portionV2.scale = 0.4;

portionV3 = createSprite(displayWidth-50,40);
portionV3.addImage(portionVImg);
portionV3.scale = 0.4;

score = 0;

birdsGroup = new Group();
obstaclesGroup = new Group();
portionsGroup = new Group();

}


function draw()
{

    background(fundoImg);

        /*
        playButton = createImg("./assets/PlayButton.png");
        playButton.position(800, 350);
        playButton.size(100,100);
        playButton.mouseClicked(gameplay);
        */
        
      //  btn.visible = true
      
/*
        if(mousePressedOver(btn))
        {
            gameplay();
            btn.visible = false;
        }
    */
        if(chao.x < 0)
        {
            chao.x = width/ 2;
        }
        catpou.collide(invisibleGround);
        
        if(gameState === INICIO)
        {
            
              if(life===3){
                portionV.visible = true;
                portionV2.visible = true;
                portionV3.visible = true;
            }
            if(life===2){
                portionV.visible = true;
                portionV2.visible = true;
                portionV3.visible = false;
            }
            if(life===1){
                portionV.visible = true;
                portionV2.visible = false;
                portionV3.visible = false;
            }

            //vá para gameState "lost" quando 0 vidas estiverem restantes
            if(life===0){
                gameState = FIM;
                portionV.visible = false;
                portionV2.visible = false;
                portionV3.visible = false;
                
            } 
             


            chao.velocityX = -(5 + score/ 300);

            textSize(30)
            fill("black")
            text("Score: "+ score, 50,50);
            score = score + Math.round(getFrameRate()/60);
            
            spawObstacles();
            spawBirds();
            spawPortions();
            //camera.position.x = catpou.position.x
            
            if(catpou.x > width/2)
            {
                catpou.x = width/2;
            }
            
            if(catpou.x < width*0.05)
            {
                catpou.x = width * 0.05;
            }
            
         
            
            if(keyDown('a')){
            catpou.x = catpou.x - 10
            }
            
            if(keyDown('d')){
            catpou.x += 10;
            }
            
            if(keyDown("space") && catpou.y >= 570){
            catpou.velocityY = -15
            }
            
            //gravidade
            catpou.velocityY = catpou.velocityY + 0.7;
            
            /*
           if(Toque)
           {
            catpou.x += 5;
           }
           else{
            catpou.x -= 5;

           }
           */
            
            if(birdsGroup.isTouching(catpou)){
          //  Toque = true;
            
            life = life - 1;

            }
            
            if(obstaclesGroup.isTouching(catpou)){
          //  Toque = true;
            
            life =  life -1;
            }

            
            
        }

        if(gameState === FIM)
        {
        birdsGroup.setVelocityXEach(0);  
        obstaclesGroup.setVelocityXEach(0) ;
        portionsGroup.setVelocityXEach(0) ;

        birdsGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        portionsGroup.setLifetimeEach(-1);

        // btn.visible = true;

        chao.velocityX = 0;

        // if(btn.isTouching())
        // {
        // reset();
        // }
    
        }

    drawSprites();

}

function reset()
{  
gamestate = INICIO;      

}

function spawObstacles(){

if(frameCount % 160 === 0){
var obstacle = createSprite(camera.position.x + 800,640,40,40);
obstacle.velocityX = -(10 + score/ 300)
obstacle.scale = 0.6
obstacle.lifetime = 170;
obstacle.debug = false;
obstacle.setCollider("rectangle", 0,0,200,200);

var rand = Math.round(random(1,2));
switch(rand) {
case 1: obstacle.addImage(dogImg);
break;
case 2: obstacle.addImage(waterImg);
break;
default: break;
}
obstaclesGroup.add(obstacle);
}
}

function spawBirds(){
    
if(frameCount % 150 === 0){
var bird = createSprite(camera.position.x + 800,400,40,40);
bird.addAnimation("birdin", birdAnimation);
bird.velocityX = -(10 + score/ 300)
bird.scale = 0.6;
bird.lifetime = 170;
bird.y = Math.round(random(20,300));
bird.debug = false;
bird.setCollider("rectangle", 0,0,200,200);

birdsGroup.add(bird);
}
}

function spawPortions(){
    
if(frameCount % 570 === 0){
var portion = createSprite(camera.position.x + 800,670,40,40);
portion.addImage("portinon", portionImg);
portion.velocityX = -10 
portion.scale = 0.4;
portion.lifetime = 170;
portion.debug = false;
portion.setCollider("rectangle", 0,0,200,200);

portionsGroup.add(portion);
}
}