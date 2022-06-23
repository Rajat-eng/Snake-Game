// Gmae const and variables
let velocity={x:0,y:0};
let speed=8;
let lastPaintTime=0;
let snake=[
    {x:15,y:15}
];
let food={x:10,y:10};
let board=document.getElementById('board');
let counter=document.getElementById('click-count');
let count=0;


// Game functions running continously
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

function isCollide(snake){
    for(let i=1;i<snake.length;i++){
        if( snake[i].x===snake[0].x && snake[i].y===snake[0].y ){
            return true;
        }  
    }
    return false;
}


function move(snake){
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={...snake[i]};
    }
    // console.log(snake);
    if(snake[0].x>50){
        snake[0].x=0;
    }
    else if(snake[0].x<0){
        snake[0].x=50;
    }
    else if(snake[0].y<0){
        snake[0].y=50;
    }
    else if(snake[0].y>50){
        snake[0].y=0;
    }
    snake[0].x+=velocity.x;
    snake[0].y+=velocity.y;
}




function gameEngine(){

    move(snake);

    if(isCollide(snake)){
        alert("Game Over. Refresh to play again");
        velocity={x:0,y:0};
        snake={x:15,y:15};
        food={x:10,y:10};
        counter=0;
    }

   

    // food eat and grow
    if(snake[0].y===food.y && snake[0].x===food.x){
        snake.unshift( {x:food.x , 
                        y:food.y } );
        count+=1;
        counter.innerHTML=count;
        speed+=0.75;
        let a=1;
        let b=50;
        food={ x:Math.round(a + (b-a)*Math.random()), 
               y:Math.round(a + (b-a)*Math.random()) };
    }
    

// moving the snake

   
    


// display snake 
        board.innerHTML='';
        snake.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


// display food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}




// Logic
window.requestAnimationFrame(main);


// eventhandling
document.addEventListener('keydown',(e)=>{
  
    switch(e.key){
        case "ArrowUp":
            // console.log("up");
            if(velocity.y===1){
                break;
            }
            velocity.x=0;
            velocity.y=-1;
            break;

        case "ArrowDown":
            // console.log("down");
            if(velocity.y===-1){
                break;
            }
            velocity.x=0;
            velocity.y=1;
            break;

        case "ArrowLeft":
            // console.log("left");
            if(velocity.x===1){
                break;
            }
            velocity.x= -1;
            velocity.y=0;
            break;

        case "ArrowRight":
            // console.log("right");
            if(velocity.x===-1){
                break;
            }
            velocity.x=1;
            velocity.y=0;
            break;
            
        default:
            break;
    }
        
});


