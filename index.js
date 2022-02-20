let city;
async function getWeather() {
  try {
    city = document.querySelector("#city").value;
    let respose = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=da1de6ea55bd1a35ca6697fad73464ab&units=metric`
    );
    let sevenUrl = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=da1de6ea55bd1a35ca6697fad73464ab&units=metric`
    );
    let array = await sevenUrl.json();
    let data = await respose.json();
    // console.log("data:", data);

    append(data, array.list);
  } catch (error) {
    alert("Enter a valid City Name");
  }
}
function append(data, arr) {
  document.querySelector("#data").innerText = "";
  document.querySelector("#map").innerHTML = "";
  city = document.querySelector("#city").value;
  // console.log("data:", data);
  let div = document.createElement("div");

  let today = document.createElement("h1");
  today.innerText = "Today's Weather";

  let temp = document.createElement("p");
  temp.innerHTML = "Temparature:" + " " + data.main.temp + "° C";

  let minTemp = document.createElement("p");
  minTemp.innerText = "Min Temp:" + " " + data.main.temp_min + "° C";

  let maxTemp = document.createElement("p");
  maxTemp.innerText = "Max Temp:" + " " + data.main.temp_max + "° C";

  let cloud = document.createElement("p");
  cloud.innerText = "Clouds:" + " " + data.clouds.all;

  let wind = document.createElement("p");
  wind.innerText = "Wind Speed:" + " " + data.wind.speed;

  let sunrise = document.createElement("p");
  sunrise.innerText = "Sun Rise:" + " " + data.sys.sunrise;

  let sunset = document.createElement("p");
  sunset.innerText = "Sun Set:" + " " + data.sys.sunset;

  div.append(today, temp, minTemp, maxTemp, cloud, wind, sunrise, sunset);
  document.querySelector("#data").append(div);

  let x = document.createElement("iframe");
  x.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCSX44DcZpgB-cha4ZV3n04WN_NRBdPHWY&q=${city}`;

  document.querySelector("#map").append(x);

  document.querySelector("#seven").innerHTML = "";
  arr.map(function (elem, index) {
    console.log(elem);
    if (index % 7 == 0) {
      let div = document.createElement("div");

      let dayHead = document.createElement("h2");
      let p = elem.dt_txt.split(" ")[0];
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      var d = new Date(p);
      var dayName = days[d.getDay()];
      dayHead.innerText = dayName;

      let temp = document.createElement("img");
      temp.src =
        "https://openweathermap.org/img/wn/" + elem.weather[0].icon + ".png";

      let desc = document.createElement("h2");
      desc.innerText = elem.weather[0].description;

      let T = document.createElement("h2");
      T.innerText = elem.main.temp + "° C";

      let sp = document.createElement("div");

      let i = document.createElement("i");
      i.setAttribute("class", "material-icons");
      i.innerText = "air";
      i.style.background = "none";

      let a = document.createElement("a");
      a.innerText = elem.wind.speed;

      sp.append(a, i);

      div.append(dayHead, temp, T, desc, sp);
      document.querySelector("#seven").append(div);
    }
  });
}
