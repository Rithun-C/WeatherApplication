const searchinput = document.querySelector("input");
const searchbtn = document.querySelector("#search-btn");

searchbtn.addEventListener("click", searcher);

async function searcher() {
    const place = searchinput.value;
    if (place != "") {
        const data = await fetchweather(place);
        if (data != null) {
            updateDom(data);
        }
        searchinput.value = "";
    }
}

async function fetchweather(place) {
    const url = `http://api.weatherapi.com/v1/current.json?key=d509d8a631944d4fb2e82005241707&q=${place}&aqi=no`;

    const response = await fetch(url);
    if (response.status == 400) {
        alert("Invalid Location.. Please Enter a valid Location");
        return null;
    } else if (response.status == 200) {
        const json = await response.json();
        console.log(json);
        return json;
    }
}

const temp = document.querySelector(".temperature");
const loc = document.querySelector(".location");
const time = document.querySelector("#time");
const date = document.querySelector("#date");
const emoji = document.querySelector(".emoji");
const condition = document.querySelector("#condition");

function updateDom(data) {
    temp.textContent = data.current.temp_c + "°C";
    loc.textContent = data.location.name;
    emoji.src = data.current.condition.icon;
    const [datee, timee] = data.current.last_updated.split(" ");
    date.innerText = datee;
    time.innerText = timee;
    condition.textContent = data.current.condition.text;
}
