// Select all "Want to Read" buttons
document.querySelectorAll(".want-to-read").forEach(button => {
    button.addEventListener("click", () => {
        // Display a pop-up alert when "Want to Read" button is clicked
        alert("Added to 'Want to Read' list!");
    });
});

// Function to show pop-up when browsing


// Show popup when "Browse" menu is hovered over
document.querySelector(".dropdown").addEventListener("mouseover", showBrowsePopup);
