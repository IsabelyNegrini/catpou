var catpou, catpouImg;

var bird, birdAnimation;
var dog, dogImg
var water, waterImg
var portion, portionImg

var fundoImg;
var chao, chaoImg;
var sound;



function preload(){
catpouImg = loadImage ("./assets/catpou.png");

birdAnimation = loadAnimation ("./assets/bird1.png", "./assets/bird2.png", "./assets/bird3.png", "./assets/bird4.png", "./assets/bird5.png");
dogImage = loadImage("./assets/dog.png");
waterImg = loadImage ("./assets/water.png");
portionImg = loadImage ("./assets/water.png");

fundoImg = loadImage ("./assets/fundo.webp");
chaoImg = loadImage ("./assets/chão.png");
sound = loadSound ("./assets/Música.mp3")
}



function setup(){
createCanvas(windowWidth, windowHeight);

chao = createSprite (300, 300, 200, 200 )
chao.addImage(chaoImage);
}


function draw(){
background(fundoImg);



drawSprites()
}

