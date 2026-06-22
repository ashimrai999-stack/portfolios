// 1. Toggle Navbar (Hamburger Menu)
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    // Toggles the 'fas fa-bars' to 'fas fa-times' (X icon)
    menuIcon.classList.toggle('fa-xmark');
    // Toggles the 'active' class to show/hide the menu
    navbar.classList.toggle('active');
};


// 2. Smooth Scrolling & Active Link Highlighting
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Offset for better highlighting
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Check if the current scroll position is within the section bounds
        if(top >= offset && top < offset + height) {
            // Remove 'active' class from all links
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            // Add 'active' class to the link corresponding to the current section
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    // Sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Close navbar when clicking a link (on mobile)
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};


// 3. Contact Form Validation
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Simple Email Regex (covers most common formats)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check for required fields
    if (name === '' || email === '' || subject === '' || message === '') {
        displayMessage('Please fill in all required fields.', 'error');
        return;
    }

    // Validate email format
    if (!emailPattern.test(email)) {
        displayMessage('Please enter a valid email address.', 'error');
        return;
    }

    // If validation passes, simulate form submission (in a real app, you'd send an AJAX request here)
    
    // --- SIMULATE SUCCESS ---
    displayMessage('Message sent successfully! I will get back to you soon.', 'success');
    contactForm.reset(); // Clear the form after simulated success
    
    // In a real application, you would use fetch() or XMLHttpRequest
    /*
    fetch('/your-server-endpoint', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone: document.getElementById('phone').value, subject, message }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            displayMessage('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            displayMessage('An error occurred. Please try again later.', 'error');
        }
    })
    .catch(error => {
        displayMessage('Network error. Check your connection.', 'error');
    });
    */
});

function displayMessage(text, type) {
    formMessage.textContent = text;
    formMessage.classList.remove('success', 'error');
    formMessage.classList.add(type);
}const typingText = document.querySelector(".typing-text");

const texts = [
    "It's me Ashim Rai",
    "I am a Software Developer"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    let current = texts[textIndex];

    if (!deleting) {
        typingText.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1000); // pause before deleting
            return;
        }
    } else {
        typingText.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 120);
}

typeEffect();
