let long;
let lat;
let tempDes = document.getElementsByClassName("tempDes");
let tempDeg = document.getElementsByClassName("tempDeg");
let timezone = document.getElementsByClassName("timezone");
let observation = document.getElementsByClassName("observation");
let counter = 0;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        const proxy = "https://cors-anywhere.herokuapp.com/";
        fetch(`${proxy}https://climacell-microweather-v1.p.rapidapi.com/weather/nowcast?fields=temp,weather_code&unit_system=si&lat=${lat}&lon=${lon}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "climacell-microweather-v1.p.rapidapi.com",
                "x-rapidapi-key": "d2d765aceemshea3c9ca608c26fep1d9c41jsn2418072501d1",
                "origin": "http://localhost/D:/webDevelopment/ToDoListWebPage/ToDoList-simple.html"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            for (let i = 0; i < 73; i += 18) {
                observation[counter].innerHTML = data[i].observation_time.value.split("T")[0] + "/" +
                    data[i].observation_time.value.split("T")[1].slice(0, 5);
                tempDeg[counter].innerHTML = data[i].temp.value + "&#8451;";
                tempDes[counter].innerHTML = data[i].weather_code.value;
                document.getElementsByClassName("icon")[counter].src = "images/" + data[i].weather_code.value + ".svg";
                counter += 1;
            }
        }).catch(err => {
            console.log(err);
        });
    });
} else {
    alert("position not working");
}