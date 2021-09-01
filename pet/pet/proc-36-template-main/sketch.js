var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  
  feeddog=createButton("Feed Dog");
  feeddog.position(700,95);
  feeddog.mousePressed(feedDog);
  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  var today = new Date();
  var hour = today.getHours();
  console.log(hour);
  fill("black");
  if(hour>12){
    text("Last Fed: "+hour%12+ " PM",600,95);
  }
  else if(hour === 12){
    text("Last Fed: 12 PM",600,95);
  }
  else{
    text("Last Fed: "+hour+" AM",600,95);
  }

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  console.log(foodS);
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  if(foodS>0){
  foodS--;
  console.log(foodS);
  database.ref('/').update({
    Food:foodS
  })
  //foodObj.deductFood();
}
  //foodObj.deductFood();
  console.log(foodS);
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  //console.log(foodS);
  database.ref('/').update({
    Food:foodS
  })
}
