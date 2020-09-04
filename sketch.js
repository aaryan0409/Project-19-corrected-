
var player, player_running;
var bananaimage,bananagroup;
var obstaclegroup,obstacleimage;
var back,backimage;
var ground,groundimage;
var score=0;

function preload(){

  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimage=loadImage("Banana.png");
  obstacleimage=loadImage("stone.png");
  backimage=loadImage("jungle2.jpg");
  //groundimage=loadImage("ground.jpg");
}

function setup() {
  createCanvas(800,400);
 
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground=createSprite(200,340,300,400);
  //ground.addImage("Invisible",groundimage);
  ground.visibility=false;
  player.collide(ground);
  
  invisibleground=createSprite(200,370,600,10);
  invisibleground.visible=false;
  
  back=createSprite(400,200,800,400);
  back.addImage(backimage);
  back.velocityX=-5;
  back.scale=1.5;
  back.x=back.width/2;
    
  bananagroup=new Group();
  obstaclegroup=new Group();
}


function draw() {
  
  background(255);
  background(220);
   
  console.log(player.y);
 
    if (bananagroup.isTouching(player)) {
      score=score+2;
      bananagroup.destroyEach();
    }
  
   
   if(keyDown("space")&&player.y>330) {
    player.velocityY = -10;
  } 
  
  player.velocityY = player.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if (back.x < 0){
    back.x = back.width/2;
  }
  
  player.collide(invisibleground);  
  
    
  player.depth=back.depth+1;
  if (obstaclegroup.isTouching(player)) {
    player.scale=0.1;
  }
  
  switch (score) {
    case 10 :player.scale=0.12;
          break;
    case 20 :player.scale=0.14;
          break;
    case 30 :player.scale=0.16;
          break;
    case 40 :player.scale=0.18;
          break; 
          default:break;
  }
  
  spawnbanana();
  spawnobstacle();
  
  drawSprites();
  text("Score: "+ score, 600,100);
}

function spawnbanana () {
  if (World.frameCount%150===0) {
    var banana = createSprite(800,200,20,20);
    banana.y = Math.round(random(200,250));
    banana.addImage(bananaimage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 300;
    bananagroup.add(banana);
  }
}

function spawnobstacle () {
  if (World.frameCount%100===0) {
    var obstacle = createSprite(800,340,30,30);
    obstacle.addImage(obstacleimage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -5;
    obstacle.lifetime = 300;
    obstaclegroup.add(obstacle);
  }
}
