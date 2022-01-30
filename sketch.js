var path,mainCyclist;
var player1,player2,player3, player4, obstacle1, obstacle2, obstacle3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;
var obstacle1img, obstacle2img, obstacle3img;

var pinkCG, yellowCG,redCG, cyanCG, obstacles1G, obstacles2G, obstacles3G;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var highdistance = 0;
var gameOver, restart;
var obstacleWin = false;

var hitbox;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  oppCyan1Img = loadAnimation("opponent10.png", "opponent11.png");
  oppCyan2Img = loadAnimation("opponent12.png");

  obstacle1img = loadImage("obstacle1.png");
  obstacle2img = loadImage("obstacle2.png");
  obstacle3img = loadImage("obstacle3.png");
}

function setup(){
  
createCanvas(windowWidth, windowHeight);//1200, 300
// Moving background
path=createSprite(width/2,height/2);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;

//set collider for mainCyclist
mainCyclist.setCollider("rectangle", 0, 0, 40, 1405); //main.
//mainCyclist.setCollider("rectangle", 0, 390, 40, 605); //can go up can't down.
//mainCyclist.setCollider("rectangle",0,0,40,40); 
//mainCyclist.setCollider("rectangle",0,0,40,40,50);
//mainCyclist.debug = true;
hitbox = createSprite(70, 150);
hitbox.setCollider("rectangle",0,0,40,40);
hitbox.visible = false;
//hitbox.debug = true;

gameOver = createSprite(width/2,height/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;
//gameOver.debug = true;
gameOver.setCollider("rectangle", 0, -5, 420, 75);

pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
cyanCG = new Group();

obstacles1G = new Group();
obstacles2G = new Group();
obstacles3G = new Group();

edges = createEdgeSprites();
  
}

function draw() {
  background(0);
  hitbox.x = mainCyclist.x;
  hitbox.y = mainCyclist.y;
  //console.log(hitbox.x);
  //console.log(mainCyclist.x)
  //console.log(World.mouseY);
  drawSprites();
  textSize(20);
  fill('gold');
  text("Distância: "+ distance,windowWidth-235,30);
  text("Melhor Distância: "+ highdistance,windowWidth-235,50);
  if(cyanCG.isTouching(obstacles2G)){
    cyanCG.destroyEach();
  }
  if(redCG.isTouching(obstacles2G)){
    redCG.destroyEach();
  }
  if(yellowCG.isTouching(obstacles2G)){
    yellowCG.destroyEach();
  }
  if(pinkCG.isTouching(obstacles2G)){
    pinkCG.destroyEach();
  }
  if(cyanCG.isTouching(obstacles1G)||cyanCG.isTouching(obstacles3G)){
    player4.addAnimation("defeated", oppCyan2Img);
    player4.changeAnimation("defeated", oppCyan2Img);
  }
  if(redCG.isTouching(obstacles2G)||redCG.isTouching(obstacles3G)){
    player3.addAnimation("defeated", oppRed2Img);
    player3.changeAnimation("defeated", oppCyan2Img);
  }
  if(yellowCG.isTouching(obstacles2G)||yellowCG.isTouching(obstacles3G)){
    player2.addAnimation("defeated", oppYellow2Img);
    player2.changeAnimation("defeated", oppCyan2Img);
  }
  if(pinkCG.isTouching(obstacles2G)||pinkCG.isTouching(obstacles3G)){
    player1.addAnimation("defeated", oppPink2Img);
    player1.changeAnimation("defeated", oppCyan2Img);
  }
  if(gameState===PLAY){
   
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
   
   mainCyclist.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    //code to play cycle bell sound
  if(keyWentUp("space")) {
    cycleBell.play();
  }
  //console.log(mainCyclist.y);
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,4));
  //console.log("Random: "+select_oppPlayer);
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer == 3){
      redCyclists();
    } else {
      cyanCyclists();
    }
  }
  var select_obstacle = Math.round(random(1,3));
  //console.log("obstacle: "+select_obstacle);
  if (World.frameCount % 220 == 0) {
    if (select_obstacle == 1) {
      obstacles1();
    } else if (select_obstacle == 2) {
      obstacles2();
    } else {
      obstacles3();
    }
  }
  
   if(pinkCG.isTouching(hitbox)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(hitbox)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(hitbox)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    if(cyanCG.isTouching(hitbox)){
      gameState = END;
      player4.velocityY = 0;
      player4.addAnimation("opponentPlayer12",oppCyan2Img);
    }

    if(obstacles1G.isTouching(hitbox)){
      gameState = END;
      obstacleWin = true;
    }

    if(obstacles2G.isTouching(hitbox)){
      gameState = END;
      mainCyclist.visible = false;
      obstacleWin = true;
    }

    if(obstacles3G.isTouching(hitbox)){
      gameState = END;
      obstacleWin = true;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    if(mainCyclist.y>250){
      mainCyclist.y = 245;
    }
    if(mainCyclist.y<50){
      mainCyclist.y = 55;
    }
    /*if(gameOver.isTouching(obstacles1G)
    ||gameOver.isTouching(obstacles2G)
    ||gameOver.isTouching(obstacles3G)){
      obstacles1G.destroyEach();
      obstacles2G.destroyEach();
      obstacles3G.destroyEach();
    }*/
    textSize(20);
    fill('cyan');
    text("Pressione A Seta Para Cima Para Reiniciar O Jogo!", width/2-220,height/2+45);//440, 200
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
    if(obstacleWin == false){
      pinkCG.setVelocityXEach(0);
      yellowCG.setVelocityXEach(0);
      redCG.setVelocityXEach(0);
      cyanCG.setVelocityXEach(0);
    }else{
      
    }
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setLifetimeEach(-1);
  
    redCG.setLifetimeEach(-1);

    cyanCG.setLifetimeEach(-1);

    obstacles1G.setLifetimeEach(-1);
    obstacles1G.setVelocityXEach(0);

    obstacles2G.setLifetimeEach(-1);
    obstacles2G.setVelocityXEach(0);

    obstacles3G.setLifetimeEach(-1);
    obstacles3G.setVelocityXEach(0);

     if(keyDown("UP_ARROW")) {
       reset();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function cyanCyclists(){
  player4 =createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)));
  player4.scale =0.06;
  player4.velocityX = -(6 + 2*distance/150);
  player4.addAnimation("opponentPlayer12",oppCyan1Img);
  player4.setLifetime=170;
  cyanCG.add(player4);
}

function obstacles1(){
  obstacle1 = createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)))
  obstacle1.addImage("obstacle1", obstacle1img);
  obstacle1.scale = 0.1;
  obstacle1.velocityX = -(7 + 2*distance/150);
  obstacle1.setLifetime = 170;
  obstacle1.depth = gameOver.depth;
  gameOver.depth = gameOver.depth+1;
  //obstacle1.debug = true;
  obstacles1G.add(obstacle1);
}

function obstacles2(){
  obstacle2 = createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)))
  obstacle2.addImage("obstacle2", obstacle2img);
  obstacle2.scale = 0.1;
  obstacle2.velocityX = -(7 + 2*distance/150);
  obstacle2.setLifetime = 170;
  obstacle2.depth = gameOver.depth;
  gameOver.depth = gameOver.depth+1;
  //obstacle2.debug = true;
  obstacles2G.add(obstacle2);
  
}

function obstacles3(){
  obstacle3 = createSprite(windowWidth+1100,Math.round(random(50, windowHeight-50)))//1100, (random)50, 250
  obstacle3.addImage("obstacle3", obstacle3img);
  obstacle3.scale = 0.1;
  obstacle3.velocityX = -(7 + 2*distance/150);
  obstacle3.setLifetime = 170;
  obstacle3.depth = gameOver.depth;
  gameOver.depth = gameOver.depth+1;
  //obstacle3.debug = true;
  obstacles3G.add(obstacle3);
  
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.visible = true;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  obstacleWin = false;
  if(distance>highdistance){
    highdistance = distance;
  }
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  cyanCG.destroyEach();
  obstacles1G.destroyEach();
  obstacles2G.destroyEach();
  obstacles3G.destroyEach();
  
  distance = 0;
 }


