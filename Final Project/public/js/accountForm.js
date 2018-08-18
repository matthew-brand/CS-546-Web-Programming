/* eslint-env browser */
/* eslint-env jquery */

const CAForm = document.getElementById("createAccountForm");
const LIForm = document.getElementById("loginForm");
const eventForm = document.getElementById("eventForm");

if ($("#loginButton").length) {
  // Handles submitting the "Create Account" Form
  CAForm.addEventListener("submit", event => {
    $("#createAccountButton").html(
      "<i class='fa fa-refresh fa-spin' style='font-size:24px'></i>"
    );
    event.preventDefault(); // Stops the page from redirecting
    $.post(
      "/createuser",
      $("#createAccountForm").serialize(),
      (data, status) => {
        console.log(status);
        console.log(JSON.stringify($("#createAccountForm").serialize()));
        window.location = window.location.pathname + window.location.hash;
      }
    ).fail((err, status) => {
      alert(status);
      console.log(status);
    });
  });

  // Handles submitting the "Login" Form
  LIForm.addEventListener("submit", event => {
    $("#loginButton").html(
      "<i class='fa fa-refresh fa-spin' style='font-size:24px'></i>"
    );
    event.preventDefault(); // Stops the page from redirecting
    $.post("/login", $("#loginForm").serialize(), (data, status) => {
      console.log(status);
      window.location = window.location.pathname + window.location.hash;
    }).fail((err, status) => {
      alert(status);
      console.log(status);
    });
  });
} else {
  document.getElementById("mainMap").classList.add("editable");

  eventForm.addEventListener("submit", event => {
    event.preventDefault(); // Stops the page from redirecting
    $.post(
      "/events",
      $("#eventForm").serialize(),
      (data, status) => {
        console.log(status);
        console.log(JSON.stringify($("eventForm").serialize()));
        location.reload();
      }
    ).fail((err, status) => {
      alert(status);
      console.log(status);
    });
  });
}

// Make a table out of the information stored in the events database
// Later, we can make it more configurable, like show next 10, or show all on this date
$.getJSON("/events", result => {
  console.log("TEST");
  console.log(JSON.stringify(result));
  for (let i = 0; i < result.length; i += 1) {
    const row = document.createElement("tr");
    const title = document.createElement("td");
    const date = document.createElement("td");
    const time = document.createElement("td");
    const location = document.createElement("td");

    title.innerHTML = result[i].title;
    date.innerHTML = result[i].date;
    time.innerHTML = result[i].time;
    location.innerHTML = result[i].location;

    document.getElementById("eventList").appendChild(row);
    row.appendChild(title);
    row.appendChild(date);
    row.appendChild(time);
    row.appendChild(location);
  }
});
