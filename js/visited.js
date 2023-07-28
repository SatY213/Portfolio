<<<<<<< HEAD
// Retrieve the current visit count from local storage
var visitCount = localStorage.getItem("visitCount");

// Check if visitCount exists in local storage
if (visitCount) {
  // Increment the visit count
  visitCount = parseInt(visitCount) + 1;
} else {
  // Initialize the visit count to 1
  visitCount = 1;
}

// Store the updated visit count in local storage
localStorage.setItem("visitCount", visitCount);

// Output the visit count to the console or display it on your portfolio
document.getElementById("vues").value = visitCount;

// @media (max-width: 767px) {
//   /* Adjust column width on smaller screens */
//   .col-md-6 {
//     width: 100%;
//   }
//   #answer {
//     position: static;
//     border-radius: 40%;
//     text-align: center;
//   }
//   .answer {
//     margin-top: 0px;
//     align-self: center;
//   }

//   .slider {
//     height: 150px;
//     margin: auto;
//     position: relative;
//     width: 90%;
//     box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.8);
//     display: grid;
//     border-radius: 20%;
//     place-items: center;
//     overflow: hidden;
//     color: rgba(181, 216, 247, 0.874);
//   }
//   img {
//     width: 60%;
//     margin-bottom: 50px;
//     transition: transform 1s;
//   }
//   .photodemoi {
//     top: 60px;
//     width: 2cm;
//     height: 2cm;
//     margin-left: 1px;
//   }
//   .photodemoi img {
//     width: 2cm;
//     height: 2cm;
//   }
//   #questions-container {
//     margin-top: 10px;
//   }
//   #contactFormWrapper {
//     /* Adjust contact form width for smaller screens */
//     position: relative;
//     width: 40%; /* Adjust the width as needed */
//     max-width: 7cm; /* Optional: Set a maximum width to prevent it from getting too wide on large screens */
//   }

//   .contact-form {
//     max-width: 7cm;
//     margin-right: 0 auto;
//   }
// }
=======
// Retrieve the current visit count from local storage
var visitCount = localStorage.getItem("visitCount");

// Check if visitCount exists in local storage
if (visitCount) {
  // Increment the visit count
  visitCount = parseInt(visitCount) + 1;
} else {
  // Initialize the visit count to 1
  visitCount = 1;
}

// Store the updated visit count in local storage
localStorage.setItem("visitCount", visitCount);

// Output the visit count to the console or display it on your portfolio
console.log("Number of visits: " + visitCount);
>>>>>>> d2f1e5e02a79d26231082864801eaf85738ea326
