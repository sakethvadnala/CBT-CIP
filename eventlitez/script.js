document.addEventListener("DOMContentLoaded", function () {
  const eventList = document.getElementById("eventList");
  const viewBtn = document.getElementById("viewBtn");
  const noEventsMsg = document.getElementById("noEventsMsg");
  const eventDrawer = document.getElementById("eventDrawer");
  const closeDrawer = document.getElementById("closeDrawer");
  const overlay = document.getElementById("overlay");

  document.getElementById("eventForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const time = document.getElementById("eventTime").value;
    const location = document.getElementById("eventLocation").value;

    const eventBox = document.createElement("div");
    eventBox.className = "event-box";
    eventBox.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Location:</strong> ${location}</p>
      <button class="delete-btn">Delete</button>
      <button class="edit-btn">Edit</button>
    `;

    eventBox.querySelector(".delete-btn").addEventListener("click", function() {
      eventBox.remove();
      if (eventList.children.length === 0) {
        noEventsMsg.style.display = "block";
      }
    });

    eventBox.querySelector(".edit-btn").addEventListener("click", function() {
      document.getElementById("eventName").value = name;
      document.getElementById("eventDate").value = date;
      document.getElementById("eventTime").value = time;
      document.getElementById("eventLocation").value = location;
      eventBox.remove();
      if (eventList.children.length === 0) {
        noEventsMsg.style.display = "block";
      }
    });

    eventList.appendChild(eventBox);
    noEventsMsg.style.display = "none";
    eventDrawer.classList.add("show");
    overlay.style.display = "block";
    document.getElementById("eventForm").reset();
  });

  viewBtn.addEventListener("click", function() {
    if (eventList.children.length > 0) {
      noEventsMsg.style.display = "none";
    } else {
      noEventsMsg.style.display = "block";
    }
    eventDrawer.classList.add("show");
    overlay.style.display = "block";
  });

  closeDrawer.addEventListener("click", function() {
    eventDrawer.classList.remove("show");
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", function() {
    eventDrawer.classList.remove("show");
    overlay.style.display = "none";
  });
});
