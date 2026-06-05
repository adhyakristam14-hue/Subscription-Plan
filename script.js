var firebaseConfig = {
  apiKey: "AIzaSyCp15pKMaHbZqPWPkTLiAMzZr3V5m4jdnA",
  authDomain: "movieticket-69420.firebaseapp.com",
  databaseURL: "https://movieticket-69420-default-rtdb.firebaseio.com",
  projectId: "movieticket-69420",
  storageBucket: "movieticket-69420.firebasestorage.app",
  messagingSenderId: "991869575931",
  appId: "1:991869575931:web:553443fd888ce7bd12465e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function showBill() {
  const plan = document.getElementById("plan-type").value.trim().toLowerCase();
  const email = document.getElementById("email").value.trim();
  let total = 0;

  if (!plan) {
    alert("Please select a plan!");
    return;
  }

  if (plan === "basic") {
    total = 5;
  } else if (plan === "standard") {
    total = 12;
  } else if (plan === "premium") {
    total = 20;
  }

  if (!email) {
    alert("Please enter your email!");
    return;
  }

  document.getElementById("bill-details").innerHTML = `
    <strong>Plan:</strong> ${plan.charAt(0).toUpperCase() + plan.slice(1)}<br>
    <strong>Total:</strong> $${total}
  `;

  document.getElementById("overlay").style.display = "block";
  document.getElementById("bill-popup").style.display = "block";
}

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("bill-popup").style.display = "none";
}

function makePayment() {
  closePopup();

  setTimeout(() => {
    alert("✅ Payment successful!");

    const userEmail = document.getElementById("email").value.trim();
    const plan = document.getElementById("plan-type").value.trim();
    let total = 0;

    if (plan.toLowerCase() === "basic") {
      total = 5;
    } else if (plan.toLowerCase() === "standard") {
      total = 12;
    } else if (plan.toLowerCase() === "premium") {
      total = 20;
    }

    const emailParams = {
      user_name: localStorage.getItem("name") || "Customer",
      to_email: userEmail,
      plan_name: plan,
      amount: total
    };

    console.log("Sending with:", emailParams);

    emailjs.send("service_f3yq1ru", "template_b7nzy9k", emailParams)
      .then(() => {
        alert("Booking Email Sent!");
        window.location.href = "thankyou.html";
      })
      .catch((error) => {
        alert("Failed to send email");
        console.error(error);
      });

    const bookingId = Date.now();
    db.ref("bookings/" + bookingId).set({
      ...emailParams,
      status: "confirmed"
    });
  }, 500);
}