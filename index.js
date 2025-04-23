document.getElementById('hamburger').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});


// HANDLE PROFILE CLICK:

 // Select all the info buttons
 const infoBtns = document.querySelectorAll(".info-btn");

 // Function to handle click events
//  function handleClick(event) {
//    event.preventDefault();
//    const teamMember = event.target.closest(".team-member");
//    const nameElement = teamMember.querySelector("h3");
//    console.log(nameElement.textContent);
//  }

//  // Attach click event listeners to each info button
//  infoBtns.forEach(btn => {
//    btn.addEventListener("click", handleClick);
//  });