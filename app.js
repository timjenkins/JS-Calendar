var today = new Date();

var buildMonth = function(date){
  currentMonth = {
    monthDate: date,
    days: [],
  }
  $("#month-monthname").html(
    date.toLocaleString("en-us", {month: "long"})
  );
};

var buildDay = function(year, month, day){
  var selectedDay = new Date(year, month, day);
  $(".day").html(selectedDay.getDate());
  $("#day-monthname").html(
    selectedDay.toLocaleString("en-us", {month: "long"})
  );
};

buildDay(2015,6,3);
buildMonth(today);