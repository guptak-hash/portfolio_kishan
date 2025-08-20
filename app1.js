
// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.githubStats = document.getElementById('github-stats');
        this.githubStreak = document.getElementById('github-streak');
        this.githubCalendar = document.getElementById('github-calendar');

        this.init();
    }

    init() {
        // Load saved theme or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme, false);

        // Add event listener for theme toggle
        this.themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme, true);
        });
    }

    setTheme(theme, animate = true) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update theme icon with animation
        if (animate) {
            this.themeIcon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.themeIcon.style.transform = 'rotate(0deg)';
            }, 300);
        }

        // Update icon
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';

        // Update GitHub stats images for dark/light theme
        this.updateGitHubImages(theme);
    }

    updateGitHubImages(theme) {
        const themeParam = theme === 'dark' ? 'dark' : 'default';
        const calendarColor = theme === 'dark' ? '3b82f6' : '2563eb';

        this.githubStats.src = `https://github-readme-stats.vercel.app/api?username=guptak-hash&show_icons=true&theme=${themeParam}`;
        this.githubStreak.src = `https://github-readme-streak-stats.herokuapp.com/?user=guptak-hash&theme=${themeParam}`;
        this.githubCalendar.src = `https://ghchart.rshah.org/${calendarColor}/guptak-hash`;
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navLinks = document.querySelector('.nav-links');
        this.sections = document.querySelectorAll('section[id]');
        this.navLinksArray = document.querySelectorAll('.nav-links a[href^="#"]');

        this.init();
    }

    init() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.navLinks.classList.toggle('active');
            this.hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        this.navLinksArray.forEach(link => {
            link.addEventListener('click', () => {
                if (this.navLinks.classList.contains('active')) {
                    this.navLinks.classList.remove('active');
                    this.hamburger.classList.remove('active');
                }
            });
        });

        // Smooth scrolling and active link management
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
    }

    setupSmoothScrolling() {
        this.navLinksArray.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    setTimeout(() => {
                        this.updateActiveNavLink();
                    }, 800);
                }
            });
        });
    }

    setupActiveNavigation() {
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
        });

        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 150;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const sectionTop = section.offsetTop;

            if (scrollPosition >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
                break;
            }
        }

        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 100) {
            currentSection = 'contact';
        }

        this.navLinksArray.forEach(link => {
            link.classList.remove('active');
        });

        if (currentSection) {
            const activeLink = document.querySelector(`.nav-links a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
}

// Resume download function
function downloadAndOpenResume(event) {
    event.preventDefault();

    const resumeUrl = 'https://drive.google.com/file/d/1ZCzWKlw1yFnnlNj0-8AZ4hEprLx-BRml/view?usp=sharing';

    // Force PDF download
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://drive.google.com/uc?export=download&id=1ZCzWKlw1yFnnlNj0-8AZ4hEprLx-BRml';
    downloadLink.download = 'Kishan-Gupta-Resume.pdf';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Open in new tab
    setTimeout(() => {
        const newTab = window.open(resumeUrl, '_blank');
        if (!newTab || newTab.closed) {
            alert('Popup blocked! Please allow popups for this site to view the resume.');
        }
    }, 100);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Force scroll to top
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize managers
    new ThemeManager();
    new NavigationManager();
});

// Additional scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
