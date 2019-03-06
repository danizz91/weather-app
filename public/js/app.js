console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form');
const serach = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From JavaScript';


weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    const location = serach.value;
    messageOne.textContent = 'Loading...';

    fetch('/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                messageTwo.textContent = data.error;
            }
            else {
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;

            }

        })
    });

    console.log(location);

});