let input = document.querySelector('.form input');
let btn = document.querySelector('.form button');
let temp = document.querySelector('.info h1');
let city_print = document.querySelector('.info h2');
let humid = document.querySelector('.more-info .humid .det');
let speed = document.querySelector('.more-info .wind .det');
let img = document.querySelector('.info img');
let container = document.querySelector('.container');

let popup = document.querySelector('.popup');
let yesbtn = document.querySelector('.popup .btn1');
let nobtn = document.querySelector('.popup .btn2');

const key = "2da0e85c895fda00f064fd61d8e0f99f";
const unit = "metric";

//myfun is used to fetch weather information using api and show it on the screen
async function myfun(city)
{
   let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`;
   let response = await fetch(url);

   //if invalid city name input then show invalid city name
   if(response.status == '404')
   {
     setTimeout(() => {
      container.style.height = "400px";
     }, 800);
     setTimeout(() => {
      document.querySelector('.error').style.display = "block";
      document.querySelector('.correct').style.display = "block";
      document.querySelector('.weather').style.display = "none";
     }, 1000);
   }
   else
   {
      //else get the result in json format and print
      let result = await response.json();
      temp.innerHTML = `${parseInt(result.main.temp)} <span>&#8451;</span>`;
      city_print.innerHTML = city;
      humid.innerHTML = `${result.main.humidity}%`;
      speed.innerHTML = `${result.wind.speed} km/h`;
      let weather = result.weather[0].main;
   
      container.style.height = "580px";
      setTimeout(() => {
         if(weather == "Clear")
         {
            img.src = "Images/sun.png";
         }
         else if(weather == "Clouds")
         {
            img.src = "Images/partial_cloud.webp";
         }
         else if(weather == "Rain")
         {
            img.src = "Images/cloud-37011_640.webp";
         }
         else if(weather == "Snow")
         {
            img.src = "Images/snow.webp";
         }
         else if(weather == "Thunder")
         {
            img.src = "Images/thunder.webp";
         }
         else
         {
           img.src = "Images/foggy.png";
         }
         document.querySelector('.weather').style.display = "block";
         document.querySelector('.error').style.display = "none";
         document.querySelector('.correct').style.display = "none";
      }, 1000);
   }
}

//on click the search button
btn.addEventListener("click",()=>{
   myfun(input.value);
});

//on pressing enter key trigger the search button
input.addEventListener("keypress",(event)=>{
   if(event.key=="Enter")
   {
      myfun(input.value);
   }
});
//to handle data using geolocation api:

//to get the data with latitude and longitude
async function getdata(lat,long)
{  
   let url = `http://api.weatherapi.com/v1/current.json?key=54529f50f9d74e5a91a44654240301&q=${lat},${long}`;
   let response = await fetch(url);
   return response.json();
}

//callback function for navigator.geolocation.getCurrentPosition , it show the success of task,
//navigator is a js object used to get browser information or location, it is the window property
async function getlocation(position){
   const result = await getdata(position.coords.latitude,position.coords.longitude);
   myfun(result.location.name);
   //show the weather page
   popup.style.display = "none";
   container.style.display = "block";
}
//if navigator is not able to detect exact position then call not found (failure) callback
function notfound(){
   alert("Not able to find you location please search it manually!");
   popup.style.display = "none";
   container.style.display = "block";
}

//on yes button click use geolocation
yesbtn.addEventListener("click",()=>{
   let position = navigator.geolocation.getCurrentPosition(getlocation,notfound);
})

//on no button click use search option
nobtn.addEventListener("click",()=>{
   popup.style.display = "none";
   container.style.display = "block";
})