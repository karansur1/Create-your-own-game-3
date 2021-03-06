var bgImage
var bg
var rocket 
var rocketImage
var edges
var meteor
var meteorImage
var alienShip
var alienShipImage
var bulletGroup
var alienGroup
var meteorGroup
var bullet
var bulletImage
var livesImage
var blastImage
var live1,live2,live3,live4,live5
var liveCount 
var score = 0
var gameState = "PLAY"






function preload(){

  bgImage = loadImage("bg.jpg")

  rocketImage = loadImage("spaceship.png")

  meteorImage = loadImage("meteor.png")

  alienShipImage = loadImage("alienShip.png")

  bulletImage = loadImage("bullet.png")

  livesImage = loadImage("lives.png")

  blastImage = loadImage("Blast.png")
}





function setup(){
    createCanvas(1500,800);
    liveCount = 5
  
    bg = createSprite(500,300)
    bg.addImage(bgImage)
    bg.scale = 3.50  

    rocket = createSprite(100,450);
    rocket.addImage(rocketImage);
    rocket.scale=1.3;

    live1 = createSprite(1300,70)
    live1.addImage(livesImage)
    live1.scale = 0.5
    
    live2 = createSprite(1360,70)
    live2.addImage(livesImage)
    live2.scale = 0.5

    live3 = createSprite(1420,70)
    live3.addImage(livesImage)
    live3.scale = 0.5

    live4 = createSprite(1480,70)
    live4.addImage(livesImage)
    live4.scale = 0.5

    live5 = createSprite(1240,70)
    live5.addImage(livesImage)
    live5.scale = 0.5

    edges = createEdgeSprites();

    end= createSprite(10,400,10,800);


   

    rocket.setCollider("rectangle",0,0,90,50)
    
    bulletGroup = createGroup();
    meteorGroup = createGroup();
    alienGroup = createGroup();
}









function draw() {
  background("black")



  if(gameState === "PLAY"){
    if(keyDown(UP_ARROW)){
      rocket.y = rocket.y-20
    }
  
    if(keyDown(DOWN_ARROW)){
      rocket.y = rocket.y+20
    }
  
    if(keyDown(RIGHT_ARROW)){
      rocket.x = rocket.x+20
    }
  
    if (keyDown(LEFT_ARROW)){
      rocket.x = rocket.x-20 
    }
  
    rocket.bounceOff(edges)
  
    
  
  
    if(keyWentDown("space")){
  
      bulletSpawn();
  
    }
  
  
    for(var i=0; i<alienGroup.length ;i++){
    if(end.isTouching(alienGroup.get(i))){
      alienGroup.get(i).destroy()
      liveCount = liveCount-1;
      
      
  
    }
  }
  
  
  for(var i = 0; i<meteorGroup.length;i++){
      if(rocket.isTouching(meteorGroup.get(i))){
        
        liveCount = liveCount-1
        meteorGroup.get(i).destroy()
      }
    }
    
  
    if(bulletGroup.isTouching(alienGroup)){
      alienShip.addImage(blastImage)
      alienShip.scale = 0.07 
      bulletGroup.destroyEach();
      score = score + 20

    }

    if(rocket.isTouching(alienGroup)){

      alienGroup.destroyEach();
      liveCount = liveCount - 2

    }
  
   
   
    
    if(liveCount === 4){
  
        live4.visible = false
    }
  
    if(liveCount === 3){
  
      live3.visible = false
  }
  
  if(liveCount === 2){
  
    live2.visible = false
  }
  
  if(liveCount === 1){
  
    live1.visible = false
  }
  
  if(liveCount === 0){
  
  
    live5.visible = false
  }

  if(liveCount <= 0){
    gameState = "END" 
   }
 

  meteorSpawn();

  alienSpawn();
  }

  drawSprites();

  if(gameState === "END"){

    textSize(20)
      fill("red")
      text("GAME OVER!",500,500)

      alienGroup.destroyEach();
      meteorGroup.destroyEach();
      bulletGroup.destroyEach();
      rocket.destroy();
   }


  


  
  textSize(20)
  fill("red")
  stroke("white");
  strokeWeight(1)
  text("SCORE : "+score,100,50)
}



function meteorSpawn(){


  if(frameCount%80 === 0){
    meteor = createSprite(1500,random(50,700))
    meteor.addImage(meteorImage)
    meteor.scale = 0.5
    meteor.velocityX = random(-5,-13)
    meteor.velocityY=random(-3,6)
    meteorGroup.add(meteor);
    
    meteor.setCollider("rectangle",0,0,400,200)
  }
}

function alienSpawn(){

  if(frameCount%330 === 0){
  alienShip = createSprite(1500,random(50,700))
  alienShip.addImage(alienShipImage);
  alienShip.scale = 0.5
  alienShip.velocityX = -4
  alienGroup.add(alienShip);

  

  }

}


function bulletSpawn(){

  bullet = createSprite(rocket.x,rocket.y)
  bullet.addImage(bulletImage)
  bullet.velocityX = 7
  bullet.scale = 0.2
  bulletGroup.add(bullet)

  // bullet.debug = true
  bullet.setCollider("rectangle",0,0,200,200)
  
}
