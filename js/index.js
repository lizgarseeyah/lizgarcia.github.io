// Smooth scroll to sections on navigation click
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Optional: Mute/unmute video on click (if needed)
document.getElementById('backgroundVideo').addEventListener('click', function() {
    this.muted = !this.muted;
});
