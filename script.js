$.ajaxSetup({ async: false });
var data;

function getData() {
  var apiURL = "https://data.cityofnewyork.us/resource/kpav-sd4t.json";
  data = $.getJSON(apiURL).responseJSON;
}

function openMenu() {
  document.getElementById("menu").style.width = "380px";
  document.getElementById("page").style.marginLeft = "380px";
}

function closeMenu() {
  document.getElementById("menu").style.width = "0";
  document.getElementById("page").style.marginLeft = "0";
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    document.getElementById("topbutton").style.display = "block";
  } else {
    document.getElementById("topbutton").style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0; 
}

function map(){
  
  var outputmap=document.getElementById("outputmap");
  var longitude=document.getElementById("longitude").value;
  var latitude=document.getElementById("latitude").value;
  var mapurl="https://www.mapquestapi.com/staticmap/v5/map?key=cipM1GWoUnMGvSjj6VblqrAEgu1Bq4CM&locations="+latitude+","+longitude+"&zoom=12&size=@2x";
  var buildmap="<a href="+mapurl+"><img src="+mapurl+"></a>";
  outputmap.innerHTML=buildmap;
}

function showInfo() {
  var output = document.getElementById("output");
  var request = document.getElementById("request").value;
  var build = "";

  for (var i = 0; i < data.length; i++) {
    var businessTitle = data[i].business_title;
    var jobCategory = data[i].job_category;
    var fullpartTime = data[i].full_time_part_time_indicator;
    var description = data[i].job_description;
    var minRequire = data[i].minimum_qual_requirements;
    var prefSkills = data[i].preferred_skills;
    var residentRequire = data[i].residency_requirement;
    var toApply = data[i].to_apply;
    var salaryFrequency = data[i].salary_frequency;
    var salaryRangeFrom = data[i].salary_range_from;
    var salaryRangeTo = data[i].salary_range_to;
    var location = data[i].work_location;

    if (fullpartTime == "F") {
      fullpartTime = "Full Time";
    } else if (fullpartTime == "P") {
      fullpartTime = "Part Time";
    }

    try {
      if (businessTitle.toLowerCase().includes(request.toLowerCase())) {
        build += "<div class='card'>";
        build += "<h2> Business Title: " + businessTitle + "</h2>";
        build += "<h3> Job Category: " + jobCategory + "</h3><hr>";
        build += "<p> Work Location: " + location + "</p><br>";
        build += "<p> Full Time or Part Time: " + fullpartTime + "</p><br>";
        build += "<p> Job Description: " + description + "</p><br>";
        build += "<p> Preferred Skill(s): " + prefSkills + "</p><br>";
        build += "<p> Minimum Qualification Requirement(s): " + minRequire + "</p><br>";
        build += "<p> Residental Requirement(s): " + residentRequire + "</p><br>";
        build += "<p> How to Apply: " + toApply + "</p>";
        build += "<p> Salary Frequncy: " + salaryFrequency + "</p><br>";
        build += "<p> Salary Range: " + "$" + salaryRangeFrom + " - " + "$" + salaryRangeTo + "</p><br>";
        build += "</div>";
      }
    } catch (err) { }
  }
  output.innerHTML = build;
}