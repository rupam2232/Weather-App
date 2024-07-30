const srchbtn = document.querySelector(".search-btn")
srchbtn.addEventListener("click", ()=>{
    async function check() {
        const apikey = "03685ded366bb9a73404f7b061af8c0d";
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
        if (found.id.includes("block")) {
            found.removeAttribute("id");
        }
        if (location_not_found.id.includes("block")) {
            location_not_found.removeAttribute("id");
        }

        if(location == ""){
            document.querySelector(".locname").innerHTML = "Please enter a location"
            location_not_found.setAttribute("id","block")
            document.body.style.backgroundImage = "url('assets/default.png')"
            setTimeout(() => {
                location_not_found.classList.add("activet")
                location_not_found.classList.remove("location-not-found")
            }, 1000);
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`
        let data = await fetch(`${url}`).then(response => response.json())
        if(data.cod === "404" || data.cod === "400"){
            document.querySelector(".locname").innerHTML = "Sorry, Location not found!!!"
            location_not_found.setAttribute("id","block")
            document.body.style.backgroundImage = "url('assets/default.png')"
            setTimeout(() => {
                location_not_found.classList.add("activet")
                location_not_found.classList.remove("location-not-found")
            }, 1000);
            return;
        }
        if (location_not_found.classList.contains("activet")) {
            location_not_found.classList.remove("activet")
            location_not_found.classList.add("location-not-found")
        }
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
                document.body.style.backgroundImage = "url('assets/cloudweather.jpg')"
                break;
            case "Clear":
                weatherimg.src = "assets/clear.png"
                document.body.style.backgroundImage = "url('assets/clearcloud.jpg')"
                break;
            case "Mist":
                weatherimg.src = "assets/mist.png"
                document.body.style.backgroundImage = "url('assets/mistcloud.png')"
                break;
            case "Rain":
                weatherimg.src = "assets/rain.png"
                document.body.style.backgroundImage = "url('assets/rainweather.jpg')"
                break;
            case "Snow":
                weatherimg.src = "assets/snow.png"
                document.body.style.backgroundImage = "url('assets/snowweather.png')"
                break;
            case "Haze" :
                weatherimg.src = "assets/haze.png"
                document.body.style.backgroundImage = "url('assets/hazeweather.jpg')"
                break;
        }
        setTimeout(() => {
            humidity.classList.add("act")
            humidity.classList.remove("samech")
            wind.classList.add("act")
            wind.classList.add("samech")
        }, 1500);
        console.log(data)
    }
    check();
})

