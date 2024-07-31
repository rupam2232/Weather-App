const srchbtn = document.querySelector(".search-btn")
srchbtn.addEventListener("click", ()=>{
    check();
})

const input = document.querySelector("#search")
input.addEventListener("keypress", (e)=> {
    if (e.key === "Enter") {
      e.preventDefault();
      srchbtn.click();
    }
  });

async function check() {
    const apikey = "03685ded366bb9a73404f7b061af8c0d";
    const main = document.querySelector(".main")
    const location = document.querySelector("#search").value
    const weatherimg = document.querySelector(".weatherimg")
    const temp = document.querySelector(".temp")
    const humnum = document.querySelector(".humnum")
    const windnum = document.querySelector(".windnum")
    const tempcondition = document.querySelector(".temp-condition")
    const location_not_found = document.querySelector(".not-found")
    const found = document.querySelector(".founded")
    const humidity = document.querySelector(".humidity")
    const wind = document.querySelector(".wind")
    const video = document.querySelector("video")
    // console.log(video)


    if (found.classList.contains("active")) {
        found.classList.remove("active")
        found.classList.add("found")
    }
    if (location_not_found.classList.contains("activet")) {
        location_not_found.classList.remove("activet")
        location_not_found.classList.add("location-not-found")
    }
    if (humidity.classList.contains("act")) {
        humidity.classList.remove("act")
        humidity.classList.add("samech")
    }
    if (wind.classList.contains("act")) {
        wind.classList.remove("act")
        wind.classList.add("samech")
    }
   

    if(location == ""){
        if (found.id.includes("block")) {
            found.removeAttribute("id");
        }
        main.style.height = "16rem"
        document.querySelector(".locname").innerHTML = "Please enter a location"
        location_not_found.setAttribute("id","block")
        document.body.style.backgroundImage = "url('assets/default.png')"
        video.src = ""
        setTimeout(() => {
            location_not_found.classList.add("activet")
            location_not_found.classList.remove("location-not-found")
        }, 1000);
        return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`
    let data = await fetch(`${url}`).then(response => response.json())
    if(data.cod === "404" || data.cod === "400"){
        if (found.id.includes("block")) {
            found.removeAttribute("id");
        }
        main.style.height = "16rem"
        document.querySelector(".locname").innerHTML = "Sorry, Location not found!!!"
        location_not_found.setAttribute("id","block")
        document.body.style.backgroundImage = "url('assets/default.png')"
        video.src = ""
        setTimeout(() => {
            location_not_found.classList.add("activet")
            location_not_found.classList.remove("location-not-found")
        }, 1000);
        return;
    }
  
    if (location_not_found.id.includes("block")) {
        location_not_found.removeAttribute("id");
    }
    main.style.height = "23rem"
    found.setAttribute("id","block")
    setTimeout(() => {
        found.classList.add("active")
        found.classList.remove("found")
    }, 1000);
    temp.innerHTML = `${Math.round(data.main.temp - 273.15)}<sup>°C</sup>`
    tempcondition.innerHTML = `${data.weather[0].description}`
    humnum.innerHTML = `${data.main.humidity}%`
    windnum.innerHTML = `${Math.round(data.wind.speed * 3.6)} Km/h`
    switch (data.weather[0].main) {
        case "Clouds":
            weatherimg.src = "assets/cloud.png"
            document.body.style.backgroundImage = "url()"
            video.src = "assets/cloud.mp4"
            break;
        case "Clear":
            weatherimg.src = "assets/clear.png"
            document.body.style.backgroundImage = "url()"
            video.src = "assets/clear.mp4"
            break;
        case "Mist":
            weatherimg.src = "assets/mist.png"
            document.body.style.backgroundImage = "url()"
            video.src = "assets/mist.mp4"
            break;
        case "Rain":
            weatherimg.src = "assets/rain.png"
            document.body.style.backgroundImage = "url()"
            video.src = "assets/rain.mp4"
            break;
        case "Snow":
            weatherimg.src = "assets/snow.png"
            document.body.style.backgroundImage = "url()"
            video.src = "assets/snow.mp4"
            break;
        case "Haze" :
            weatherimg.src = "assets/haze.png"
            document.body.style.backgroundImage = "url()"
            video.src = "assets/haze.mp4"
            break;
    }
    setTimeout(() => {
        humidity.classList.add("act")
        humidity.classList.remove("samech")
        wind.classList.add("act")
        wind.classList.add("samech")
    }, 1500);
}

