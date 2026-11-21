
// Get Booking Form

let bookingForm = document.getElementById("bookingForm");

let slotCapacity = 20;

// Form Submit Event

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get Visitor Details

    let name = document.getElementById("visitorName").value;

    let mobile = document.getElementById("mobile").value;

    let date = document.getElementById("visitDate").value;

    let slot = document.getElementById("timeSlot").value;

    let visitors = Number(document.getElementById("visitors").value);

    // Check Date

    let today = new Date();

    today.setHours(0, 0, 0, 0);

    let selectedDate = new Date(date + "T00:00:00");

    if (selectedDate < today) {

        alert("Please select a valid future date!");

        return;
    }

    // Get Previous Bookings

    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // Count Booked Visitors

    let bookedVisitors = 0;

    for (let i = 0; i < bookings.length; i++) {

        if (bookings[i].date === date &&
            bookings[i].slot === slot) {

            bookedVisitors += bookings[i].visitors;
        }
    }

    // Check Capacity

    if (bookedVisitors + visitors > slotCapacity) {

        alert("Sorry! This slot is full. Choose another slot.");

        return;
    }

    // Create Booking

    let booking = {

        id: "FB" + Date.now(),

        name: name,

        mobile: mobile,

        date: date,

        slot: slot,

        visitors: visitors

    };

    // Save Booking

    bookings.push(booking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    // Show Confirmation

    alert(
        "Booking Successful!\n\n" +
        "Name: " + name + "\n" +
        "Date: " + date + "\n" +
        "Time: " + slot + "\n" +
        "Visitors: " + visitors + "\n" +
        "Booking ID: " + booking.id
    );

    // Clear Form

    bookingForm.reset();

});
