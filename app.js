
// Force scroll to top immediately
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', function() {
    // Additional scroll to top on DOM ready
    window.scrollTo(0, 0);
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Active navigation highlighting based on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = document.querySelectorAll('.nav-links a[href^="#"]');

    function updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150; // Increased offset for better detection
        
        // Check sections from bottom to top to handle overlapping cases
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop;
            
            if (scrollPosition >= sectionTop - 200) { // 200px buffer for better detection
                currentSection = section.getAttribute('id');
                break;
            }
        }

        // Special handling for the very bottom of the page
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
            currentSection = 'contact';
        }

        // Remove active class from all nav links
        navLinksArray.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section's nav link
        if (currentSection) {
            const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Listen for page load to ensure scroll to top
    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
        updateActiveNavLink();
    });
    
    // Call once on page load
    updateActiveNavLink();

    // Smooth scrolling for navigation links
    navLinksArray.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Increased offset for better positioning
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Manually set active state after smooth scroll
                setTimeout(() => {
                    updateActiveNavLink();
                }, 800); // Wait for smooth scroll to complete
            }
        });
    });
});


function downloadAndOpenResume(event) {
    // Prevent default link behavior
    event.preventDefault();
    
    // Store the original URL from the link
    const resumeUrl = 'https://drive.google.com/file/d/1g3HXglfR-ifK8sgAEFnDs-ODHC-xKFVf/view?usp=sharing';
    
    // (1) FIRST: Force PDF download using Google Drive's export URL
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://drive.google.com/uc?export=download&id=1g3HXglfR-ifK8sgAEFnDs-ODHC-xKFVf';
    downloadLink.download = 'Kishan-Gupta-Resume.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    // (2) SECOND: Open the resume in a new tab for viewing
    setTimeout(() => {
        const newTab = window.open(resumeUrl, '_blank');
        // Fallback in case popup is blocked
        if (!newTab || newTab.closed) {
            alert('Popup blocked! Please allow popups for this site to view the resume.');
        }
    }, 100); // Slightly increased delay to ensure download starts first
}

