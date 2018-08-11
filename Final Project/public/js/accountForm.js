const CAForm = document.getElementById("createAccountForm");

//Handles submitting the "Create Account" Form
CAForm.addEventListener('submit', function(event){
    event.preventDefault(); //Stops the page from redirecting
    const name = $("#CAusername")[0].value;
    $.post( "/users", $( "#createAccountForm" ).serialize() ); // Posts the form to /users
    $("#account").hide();   //Hides both forms
    window.scrollTo(0, 0);  //Scrolls to the top of the page
    $("#nameDisplayHolder")[0].innerHTML = "Hello " + name; //Renames the 'Login / Create Account' button to be a greeting
});

//Make a table out of the information stored in the events database
//Later, we can make it more configurable, like show next 10, or show all on this date
const eventData = $.getJSON("/events", function(result){
    for (var i = 0; i < result.length; i++){
        const row = document.createElement("tr");
        const title = document.createElement("td")
        const date = document.createElement("td")
        const time = document.createElement("td")
        const location = document.createElement("td")

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
