// jQuery Weather!

// Using your newfound knowledge of jQuery, create a weather
// application. It should:
// - Use a loop to create 6 days of forecast within the <div> element
//   with class name "forecast"
// - When clicking the "Get the weather!" button, the weather should
//   appear with a "fade" effect (try fading in the .current and .forecastweather
//   elements at different speeds for maximum fun!)
// - It doesn't need to fade in again when clicking "Get the weather!"
//   after the first time

// NOTES AND HINTS

// All of the work of grabbing data from the Dark Sky API is already done
// for you! Your task is to take that data, transform it into HTML, and
// insert it into the document. All of your work begins on line 47!

// Each day of the forecast should use HTML markup similar to:
// <div class="current">
//   <h3><i class="fas fa-sun"></i></h3>
//   <h4>89|55</h4>
//   <h5>Clear throughout the day.</h5>
// </div>

// The CSS styles are already written to fit the markup above. However,
// feel free to go nuts!

// The provided icon() function (in helpers.js) takes a Dark Sky icon name
// (e.g. "clear-day") and converts it into an icon, e.g.
// icon("clear-day") => <i class='fas fa-sun'></i>

// Math.round(75.88) => 75

// .empty() empties the HTML contents of a jQuery DOM object

// .append() appends a string (containing HTML) to a jQuery DOM object

let handleWeatherResponse = function(response) {
  // leave these two lines alone; they allow for the inspection of
  // the response object in the browser console (try typing "response"
  // in the Chrome JavaScript console!)
  console.log(response)
  window.response = response
  // **** your code starts here - don't modify anything else. you will be sad.


$("#current-conditions-icon").empty();
$("#current-conditions-text").empty();
$(".forecast").empty();

/// Current weather
let now_header = '<div class="col-12">'+ '<h4> CURRENT CONDITIONS </h4>'+ '</div>';
$("#current-conditions-icon").append(now_header);

$("#current-conditions-icon").append(icon(response.currently.icon));
$("#current-conditions-icon").append(response.currently.summary);

let html = '<div class="col-12">'
html = html + '<h4>'+ Math.round(response.daily.data[0].apparentTemperatureHigh) + '&deg' +
 ' | ' + Math.round(response.daily.data[0].apparentTemperatureLow) + '&deg' + '</h4>'
$("#current-conditions-text").append(html);


/// Forecast weather
let forecast_header = '<div class="col-12">'+ '<h4> FORECAST </h4>'+ '</div>';
$(".forecast").append(forecast_header);

for (let x = 0; x < 6; x++) {
  let forecast = response.daily.data[x]
  let html = '<div class="col">'
  html = html + '<h3>' + icon(forecast.icon)+ '</h3>'
  html = html + '<h4>'+ Math.round(forecast.apparentTemperatureHigh) + '&deg' +
   ' | ' + Math.round(forecast.apparentTemperatureLow) + '&deg' + '</h4>'
  html = html + '<h5>' + forecast.summary + '</h5>'
  html = html + '</div>'
  $(".forecast").append(html);
}
$(".current").fadeIn(2000);
$(".forecast").fadeIn(5000);


// *** your code ends here -- really.
};

  // leave this alone; does the event handling and ajax
  $(function() {
    $("#get-the-weather").on("click", function(event) {
      event.preventDefault();
      let locationName = $("#location-name").val();
      geocodeAndGetWeather(locationName);
    });
  });
