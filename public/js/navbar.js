function myFunction() {
  let x = document.getElementById("navbar");
  if (x.className === "navbar") {
    x.className += " responsive";
  } else {
    x.className = "navbar";
  }
}

function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");

    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

// copyrights DOM
const date = new Date().getFullYear();
const year = document.getElementById("year");

year.innerHTML = ` <h4>&copy; Copyrights<a href="https://facebook.com/zawawisme" target="_blank">Zawawi</a> | ${date} All Rights Reserved </h4> `;

// setting date format
const dateTime = document.getElementById("hidden");
const dateinject = document.getElementById("strong");

let dateTimeParts = dateTime.split(/[- :]/);
dateTimeParts[1]--;

const dateObject = new Date(...dateTimeParts);

dateinject.innerHTML = dateObject;
