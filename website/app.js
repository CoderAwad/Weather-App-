
/* Global Variables */
//const valdiate_zip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'/'+ d.getDate()+'/'+ d.getFullYear();


// Personal API Key for OpenWeatherMap API

const base = 'https://api.openweathermap.org/data/2.5/weather?zip='

const apiKey = '&appid=990e520559525542015660b56b53200f&units=metric'




// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click' , makeAction)

/* Function called by event listener */

function makeAction(e){
    const zip_code = document.getElementById('zip').value;
    const user_feeling = document.getElementById('feelings').value;
    const code = `,${document.getElementById('country').value}`;

    if (zip_code!==null&zip_code!==''){
        
        getTheweather(base,zip_code,apiKey,code)
        .then(function(data){
            console.log(data);
    
            postData('/weatherData', {temp:data.main.temp, content:user_feeling , date:newDate} )
            putalltogther()
        })
    } else{
        alert(" don't leave zip code emty & please select a country")

       
    }
     

    }



/* Function to GET Web API Data*/

const getTheweather = async(api,zip,key,city)=>{
    const res = await fetch(api+zip+city+key);
    console.log(res)

    try{
        const data = await res.json()
        return data

    } catch(error){
        console.log('error' , error)
        document.getElementById('msg').innerHTML= error

    }
}

/* Function to POST data */

const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      return newData
    }catch(error) {
    console.log("error", error);
    }
}


/* Function to GET Project Data */

const putalltogther = async() =>{
    const request = await fetch('/all');
    try{
        const all_data = await request.json();
        document.getElementById('date').innerHTML = `Date is : ${all_data.date}`;
        document.getElementById('temp').innerHTML = `Temperture is : ${Math.round(all_data.temp)} &#8451;`;
        document.getElementById('content').innerHTML = ` User message : ${all_data.content} `


    } catch(error){
        console.log('error' , error)
    }
}

