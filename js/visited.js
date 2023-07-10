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
