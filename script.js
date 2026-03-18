document.addEventListener("DOMContentLoaded", () => {
    // Standard Scroll Fade-In Logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the target is NOT hidden via hidden-section (i.e., unhidden after present click)
            if (entry.isIntersecting && !entry.target.classList.contains('hidden-section')) {
                entry.target.classList.add('visible');
                // Stop observing once it's visible to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Finale Click Logic
window.revealSurprise = function() {
    // Hide the present box completely
    document.getElementById('surprise-container').style.display = 'none';
    
    // Unhide the revealed-section by removing hidden-section
    const revealedSection = document.getElementById('revealed-section');
    revealedSection.classList.remove('hidden-section');
    
    // Fire the confetti
    fireConfetti(); 
};

function fireConfetti() {
    var duration = 4000;
    var end = Date.now() + duration;

    (function frame() {
        // Left side confetti
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#FFC0CB', '#87CEFA', '#FFFACD', '#ffffff'] // Chiikawa colors
        });
        // Right side confetti
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#FFC0CB', '#87CEFA', '#FFFACD', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}