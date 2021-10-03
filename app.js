/* Global Variables */

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&APPID=1e42abb0a5c2f47252fbd7bd2ca029cc&units=imperial';

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


/* Create a new date instance dynamically with JS */

let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", generateWeather);

/* Function called by event listener */
function generateWeather(){

const content = document.getElementById('feelings').value;
let zipCode = document.getElementById('zip').value;

getData(baseURL , zipCode , apiKey)
.then(function(data){
    console.log(data)
    postData('/postWeather' , {temp : data.main.temp , date:newDate , content : content});

})
.then(()=>{

  updateUI();
})

}

/* Function to GET Web API Data*/

const getData=async(baseURL,zipCode,apiKey)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
    try {   
    const data =await res.json();
    
    return data;
    }catch (error){  
    console.log("error",error);
    }   
}

/* Function to POST data */

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};

/* Function to GET Project Data */

const updateUI = async () => {
    const request = await fetch("/allData");
    try {
      const allData = await request.json();
    
      date.innerHTML= `Date: ${allData.date}`;
      temp.innerHTML= `Temprature: ${allData.temp} `;
      content.innerHTML= `Feeling : ${allData.content}`;

    } catch (error) {
      console.log("error", error);
    }
};

