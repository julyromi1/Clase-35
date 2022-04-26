var hypnoticBall, database;
var position;


function setup(){
  database = firebase.database();  //Conecta el proyecto de visual con la base de datos
  console.log(database);
  createCanvas(500,500);

  hypnoticBall = createSprite(250,250,10,10);
  hypnoticBall.shapeColor = "red";


  var hypnoticBallPosition = database.ref('ball/position');   //Estamos diciendo que caracteristicas de la variable se va a actualizar con la base de datos position
  hypnoticBallPosition.on("value", readPosition, showError);  //Se activa la transmición de los valores con .on
}

function draw(){
  background("white");
  
    if(keyDown(LEFT_ARROW)){
      writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
      writePosition(0,+1);
    }
    drawSprites();
  
}

function writePosition(x,y){
  database.ref("val/position").set({
    "x":position.x+x,
    "y":position.y+y,
  })
  
}

function readPosition(data){
  position = data.val();
  console.log(position.x);
  hypnoticBall.x = position.x;
  hypnoticBall.y = position.y;
}

function showError(){
  console.log("Error al escribir en la base de datos");
}
