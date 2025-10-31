document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.material-symbols-outlined');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        updateIcon(savedTheme === 'dark-mode');
    }

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.toggle('dark-mode');
        body.classList.toggle('light-mode');
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark-mode' : 'light-mode');
        
        // Update icon
        updateIcon(isDark);
    });

    function updateIcon(isDark) {
        icon.textContent = isDark ? 'dark_mode' : 'light_mode';
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Handle CV request form submission
    const cvRequestForm = document.getElementById('cvRequestForm');
    if (cvRequestForm) {
        cvRequestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                message: document.getElementById('message').value
            };

            // Here you would typically send this data to your backend
            // For now, we'll just show a success message
            alert('Thank you for your request! I will send the CV to your email shortly.');
            cvRequestForm.reset();
        });
    }
});
