var dogImg, happyDogImg, database ,foodS ,foodStock;

function preload(){
	dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock,writeStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  
  background("green");
  if(foodS !== undefined){
    textSize(20);
    fill(255);
    text("NOTE: Press UP ARROW to feed DRAGO milk", 50 ,50);
    text("Food Remaining: " + foodS ,150 ,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    if(foodS === 0){
      foodS = 20;
    }
  }
  
  
  drawSprites();
}

//Function to read values from DB
function readStock(data){
  foodS = data.val();
}

//Function to write values in DB
function writeStock(x) {

  if(x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }
   database.ref('/').update({
     food:x
   })
}
