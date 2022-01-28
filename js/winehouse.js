let counter1 = 0;
let counter2 = 1;
let bool = true;

const sections = document.querySelectorAll("section");
const progress = document.querySelector('.progress h2');
const circles = document.querySelectorAll('.circle');

//Progress counter

const progressCounter = () => {
    progress.textContent = `${counter2}/${sections.length}`;

    Array.from(circles).forEach(circle => {
        circle.style.backgroundColor = "transparent";
    });
    document.querySelector(`.circle-${counter2}`).style.backgroundColor = "#ddd";
};

const pageController = () => {
    bool = true;


    //if counter 1 = 5, move us to the first section.
    if(counter1 === 5){
        Array.from(sections).forEach(section => {
            section.style.left = 0;
        });
        counter1 = 0;
        counter2 = 1;

        //Update Progress Circle and Text
        progressCounter();
        bool = false;
    }

    //If counter1 = -1, move us to the fifth section.
    if(counter1 === -1){
        Array.from(sections).forEach(section => {
            if(section.classList[0] === 'section-5'){
                return;
            }
            section.style.left = "-100vw";
        })
        counter1 = 4;
        counter2 = 5;

        //Update Progress Circle and Text
        progressCounter();
        bool = false;
    }

    //Update Progress Circle and Text
    progressCounter();
    return bool;
}


// Increment or decrement counter from wheel's deltaY value. (+100 on scroll down, -100 scroll up)
window.addEventListener('wheel', (e) => {

    const deltaY = e.deltaY > 0;
    if(deltaY){
        counter1++;
        counter2++;
    } else {
        counter1--;
        counter2--;
    }

    pageController();
    progressCounter();
    
    //Check value of bool == true (next page exists) and then set the left value of the section according to if it's a previous or a next section.
    bool && (document.querySelector(`.section-${deltaY ? counter1 : counter2}`).style.left = `${deltaY ? "-100vw" : "0"}`); 
});

//Left and right button event listeners to transition between pages on click.
document.querySelector('.left-btn').addEventListener('click', () => {
    counter1--;
    counter2--;
    pageController() && (document.querySelector(`.section-${counter2}`).style.left = '0');
});

document.querySelector('.right-btn').addEventListener('click', () => {
    counter1++;
    counter2++;
    pageController() && (document.querySelector(`.section-${counter1}`).style.left = '-100vw');
});

document.querySelector('.grapes-img').addEventListener('mouseover', () => {
    document.querySelector('.section-3-wrapper').style.opacity = '0.5';
})
document.querySelector('.grapes-img').addEventListener('mouseout', () => {
    document.querySelector('.section-3-wrapper').style.opacity = '1';
})