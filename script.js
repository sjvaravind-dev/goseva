// Enhanced JavaScript for Sri Sri Radha Gokulanand Ashramam Website

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupSmoothScrolling();
    setupScrollToTop();
    setupActiveNavigation();
    setupAnimations();
    setupInteractiveElements();
    setupCountdownTimer();
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
}

// Scroll to top button functionality
function setupScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    };

    scrollTopBtn.addEventListener('click', scrollToTop);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add active class to navigation links on scroll
function setupActiveNavigation() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Setup animations and effects
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add floating animation to specific elements
                if (entry.target.classList.contains('schedule-item') || 
                    entry.target.classList.contains('festival-card') ||
                    entry.target.classList.contains('involvement-item')) {
                    entry.target.classList.add('hover-lift');
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Setup interactive elements
function setupInteractiveElements() {
    // Add click effects to buttons
    document.querySelectorAll('.cta-button, .btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });

    // Add hover effects to cards
    document.querySelectorAll('.schedule-item, .festival-card, .involvement-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Create ripple effect for buttons
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Countdown timer for next festival
function setupCountdownTimer() {
    // Example: Countdown to next Janmashtami (you can modify the date)
    const nextFestival = new Date('2024-08-26T00:00:00').getTime();
    
    const countdownElement = document.createElement('div');
    countdownElement.className = 'countdown-timer';
    countdownElement.innerHTML = `
        <div class="countdown-content">
            <h3>🕉️ Next Festival Countdown</h3>
            <div class="countdown-grid">
                <div class="countdown-item">
                    <span id="days">00</span>
                    <label>Days</label>
                </div>
                <div class="countdown-item">
                    <span id="hours">00</span>
                    <label>Hours</label>
                </div>
                <div class="countdown-item">
                    <span id="minutes">00</span>
                    <label>Minutes</label>
                </div>
                <div class="countdown-item">
                    <span id="seconds">00</span>
                    <label>Seconds</label>
                </div>
            </div>
        </div>
    `;
    
    // Insert countdown after hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.parentNode.insertBefore(countdownElement, heroSection.nextSibling);
    }
    
    // Update countdown
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = nextFestival - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(countdown);
            countdownElement.innerHTML = '<h3>🎉 Festival is here! Jai Sri Krishna!</h3>';
        }
    }, 1000);
}

// Add CSS for countdown timer
const countdownStyles = `
    .countdown-timer {
        background: linear-gradient(135deg, var(--primary), var(--gold));
        color: white;
        padding: 2rem 0;
        text-align: center;
    }
    
    .countdown-content h3 {
        color: white;
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
    }
    
    .countdown-grid {
        display: flex;
        justify-content: center;
        gap: 2rem;
        flex-wrap: wrap;
    }
    
    .countdown-item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .countdown-item span {
        font-size: 2.5rem;
        font-weight: bold;
        color: var(--accent);
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .countdown-item label {
        font-size: 0.9rem;
        margin-top: 0.5rem;
        opacity: 0.9;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .countdown-grid {
            gap: 1rem;
        }
        
        .countdown-item span {
            font-size: 2rem;
        }
    }
`;

// Inject countdown styles
const styleSheet = document.createElement('style');
styleSheet.textContent = countdownStyles;
document.head.appendChild(styleSheet);

// Add devotional quotes rotation
function setupDevotionalQuotes() {
    const quotes = [
        "Hare Krishna Hare Rama",
        "Jai Sri Radhe",
        "Om Namo Bhagavate Vasudevaya",
        "Sri Krishna Sharanam Mama",
        "Radhe Radhe"
    ];
    
    const quoteElement = document.createElement('div');
    quoteElement.className = 'devotional-quote';
    quoteElement.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: rgba(255, 153, 51, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        display: none;
    `;
    
    document.body.appendChild(quoteElement);
    
    let currentQuote = 0;
    setInterval(() => {
        quoteElement.textContent = quotes[currentQuote];
        quoteElement.style.display = 'block';
        
        setTimeout(() => {
            quoteElement.style.display = 'none';
        }, 3000);
        
        currentQuote = (currentQuote + 1) % quotes.length;
    }, 10000);
}

// Initialize devotional quotes after a delay
setTimeout(setupDevotionalQuotes, 5000);

// Add loading screen
function showLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-content">
            <div class="sacred-symbol">🕉️</div>
            <h2>Sri Sri Radha Gokulanand Ashramam</h2>
            <div class="loading"></div>
            <p>Loading divine blessings...</p>
        </div>
    `;
    loadingScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary), var(--secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        color: white;
        text-align: center;
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 2000);
}

// Show loading screen on page load
window.addEventListener('load', showLoadingScreen); 