const buttons = document.querySelectorAll('button');
const screenPlay = document.querySelector('.screen');

let pixel = "";
let gridSize = 50;
let currentMode = "Black";

/* step 1: is to create a grid by creating an element div depending on the size.
    and then we manipulate the columns and rows by assigning an auto parameters: meaning
    it will automatically adjust according to the situation. */
function createGrid (screenSize) {
    for (let i=0; i < (screenSize*screenSize); i++){
        pixel = document.createElement('div');
        pixel.classList.add('content');
        pixel.style.backgroundColor='white';
        screenPlay.appendChild(pixel);
    }

    screenPlay.style.gridTemplateColumns = `repeat(${screenSize}, auto)`; //its just a repeat function using es6 features. auto means it adjust automatically to the content.
    screenPlay.style.gridTemplateRows = `repeat(${screenSize}, auto)`;     //its just a repeat function using es6 features. auto means it adjust automatically to the content.
}

createGrid(gridSize);

/* step 3: we create a function were when the button resize and clear were selected it will 
    accordingly resize the grid or clear the etch board. */

function clear (btnID){
    if(btnID === "Resize"){
        gridSize = prompt("Enter a gride size not more than 100",50 );
        if(gridSize > 100 || gridSize === null){
            gridSize=50;
            
        }
    }
    screenPlay.innerHTML='';
    createGrid(gridSize);
    active ();
}


/* step 5: create a rainbow function that will return a rainbow colors */

function rainbow (){
    let color = "rgba(";       // we must return a color that looks like this rgba(value,value,value,value) 
    for (let i=0; i<3; i++){
        color = color + Math.floor(Math.random()*255)+ ",";   //255 colors to be selected randomly
    }
    return color+ "1)";       // it will look like this rgba(random,random,random, 1);
}

/* step 6: create a function that will return a gray color. */

function shady (){
    let color = "rgb(192,192,192)";
    return color;
}


/* step 4: this step is created for the remainig button Black, Colors, and shade. */

function active (){
    let square = document.querySelectorAll(".content");      //we assign each div on the class content we created into square variable.
    square.forEach(sqr => {                                 //and then we use the forEach function because it is a querySelectorAll - 
        sqr.addEventListener('mouseover', (e) => {          //were it adds an eventListener by each 'div' we created just passing over by the mouse.
            sqr.addEventListener('mouseover', (e) => {
            let currentColor = getComputedStyle(sqr, null).getPropertyValue('Background-color');    //getComputedStyle is a javascript Window method -
             switch(currentMode) {                                                                  //where it gets all the actual (computed) CSS property and values of specified element.
                                                                                                    
                case "Black" :
                    e.target.style.backgroundColor = "rgba(0,0,0)";           //we target the background color by giving an specific value to be pass on currentColor which is the getCOmputedStyle and getPropertyValue
                    break;                                              // "rgba(0,0,0,) is a black color." __Review parameter 'e' please__.
                case "Color" :
                    e.target.style.backgroundColor = rainbow();              //we create a rainbow function where it will return a specific proper value of a Background Color. refer to step 5
                    break;
                case "Shady" :
                    e.target.style.backgroundColor = shady ();                //we create a shady color which is color gray by using shady function. refer to step 6.
                    Break;
             }
         });
    });     
});
}

/* step 2: we create a main function where we add an eventlistener to the buttons. */
   function main(){
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if(button.id === "Resize" || button.id === "Clear"){
                clear(button.id);
            }
            else {                                // the choices left in this portion of buttons are Black , Colors, and Shading.
                currentMode=button.id             // then the default currentMode variable will be changed by the id of the button we select
                clear(button.id);
            }
        })

    })
   }
   main ();

