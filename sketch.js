      // storing all the sprites and gamestates in a variable 
      var PLAY = 1;
      var END = 0;
      var gameState = 1;
      var path,boy,cash,diamonds,jwellery,sword;
      var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
      var treasureCollection = 0;
      var cashG,diamondsG,jwelleryG,swordGroup;
      var e;
      var endImg;

      //loading images
function preload(){
      pathImg = loadImage("Road.png");
      boyImg = loadAnimation("runner1.png","runner2.png");
      cashImg = loadImage("cash.png");
      diamondsImg = loadImage("diamonds.png");
      jwelleryImg = loadImage("jwell.png");
      swordImg = loadImage("sword.png");
      endImg =loadImage("gameOver.png");
}

function setup(){
  
     createCanvas(600,600);
     // Moving background
     path=createSprite(300,600);
     path.addImage(pathImg);
     path.velocityY = 4;


     //creating boy running
     boy = createSprite(300,570,20,20);
     boy.addAnimation("SahilRunning",boyImg);
     boy.scale=0.08;
  
     
     cashG = new Group();
     diamondsG = new Group();
     jwelleryG = new Group();
     swordGroup = new Group();
      //creating the animation for end
     e = createSprite(300 , 300);
     e.addAnimation( "end",endImg);
     e.visible = false;
}

function draw() {

        background(0);
        boy.x = World.mouseX;//moving the boy

        edges= createEdgeSprites();//creating edges
        boy.collide(edges);//colliding boy with edges
        //creating gamestate for play
     if (gameState ==PLAY){
         if(path.y > 400 ){
        path.y = height/2;
         }
         createCash();
         createDiamonds();
         createJwellery();
         createSword();

      if (cashG.isTouching(boy)) {
          cashG.destroyEach();
          treasureCollection = treasureCollection+50;
          }
          else if (diamondsG.isTouching(boy)) {
          diamondsG.destroyEach();
          treasureCollection = treasureCollection+50;
          }else if(jwelleryG.isTouching(boy)) {
          jwelleryG.destroyEach();
          treasureCollection = treasureCollection+50;
          }else if(swordGroup.isTouching(boy)) {
            swordGroup.destroyEach();
            gameState =END;
          }   
          }
  
         //creating gamestate for end
     if (gameState == END){
        path.velocityY = 0;
        boy.setVelocityYEach =0;
        cashG.destroyEach();
        cashG.setVelocityYEach=0;
        diamondsG.destroyEach();
        diamondsG.setVelocityYEach =0;
        jwelleryG.destroyEach();
        jwelleryG.setVelocityEach();
        e.visible = true;
        boy.visible = false;
      }
      //code to reset the background
        drawSprites();//displaying all the sprites
  
        //displaying text
        textSize(20);
        fill(255);
        text("Treasure: "+ treasureCollection,150,30);

}
        //spawning cash sprite at random positions
function createCash() {
      if (World.frameCount % 50 == 0) {
      var cash = createSprite(Math.round(random(50, 350),40, 10,                                                              10));
      cash.addImage(cashImg);
      cash.scale=0.12;
      cash.velocityY = 3;
      cash.lifetime = 150;
      cashG.add(cash);
      }
}

      //creating diamond sprites at different positions
function createDiamonds() {
      if (World.frameCount % 80 == 0) {
      var diamonds = createSprite(Math.round(random(50, 350),40,                                                           10,10));
      diamonds.addImage(diamondsImg);
      diamonds.scale=0.03;
      diamonds.velocityY = 3;
      diamonds.lifetime = 150;
      diamondsG.add(diamonds);
     }
}
        //creating jwellery sprite at random positions
function createJwellery() {
      if (World.frameCount % 80 == 0) {
      var jwellery = createSprite(Math.round(random(50, 350),40,                                                          10, 10));                                                             
      jwellery.addImage(jwelleryImg);
      jwellery.scale=0.13;
      jwellery.velocityY = 3;
      jwellery.lifetime = 150;
      jwelleryG.add(jwellery);
      }
}

        //creating sword srites at random positions
function createSword(){
      if (World.frameCount % 150 == 0) {
      var sword = createSprite(Math.round(random(50, 350),40, 10,                                                               10));
      sword.addImage(swordImg);
      sword.scale=0.1;
      sword.velocityY = 3;
      sword.lifetime = 150;
      swordGroup.add(sword);
      }
}