// Add a click event to each review button
document.querySelectorAll(".review-btn").forEach(button => {
    button.addEventListener("click", () => {
        alert("Redirecting to review page...");
    });
});
