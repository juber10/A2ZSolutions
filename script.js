
// Intro splash fade-out
window.addEventListener('load', () => {
    const introSplash = document.getElementById('introSplash');
    const mainContent = document.getElementById('mainContent');

    setTimeout(() => {
        introSplash.classList.add('fade-out');
        setTimeout(() => {
            introSplash.style.display = 'none';
            mainContent.style.display = 'block';
           
             // Trigger stats animation when hero stats are visible
   animateStats();
        }, 1000);
    }, 1500); // Show splash for 2 seconds
});
 


    const images = [
    'url("resources/bkg/blackmagic bkg.jpg")',
    'url("resources/bkg/camera.webp")',
    'url("resources/bkg/sony switcher bkg.jpg")',
    'url("resources/bkg/switcher bkg.jpg")',
    'url("resources/bkg/audio bkg.jpg")',
    'url("resources/bkg/pcr.jpg")'
  ];

  const bg1 = document.getElementById('bg1');
  const bg2 = document.getElementById('bg2');

  let current = bg1;
  let next = bg2;
  let index = 0;

  // Initial image
  current.style.backgroundImage = images[index];
  current.style.opacity = 1;
  current.style.transform = 'translateX(0)';

  setInterval(() => {
    index = (index + 1) % images.length;

    // Next image setup: slide in from right with faster parallax
    next.style.backgroundImage = images[index];
    next.style.opacity = 1;
    next.style.transform = 'translateX(0)';

    // Current image: slide out to left slowly
    current.style.opacity = 0;
    current.style.transform = 'translateX(-10%)';

    // After transition, reset current for reuse
    setTimeout(() => {
      current.style.transition = 'none';
      current.style.opacity = 0;
      current.style.transform = 'translateX(10%)'; // reset from right

      // Swap current and next
      [current, next] = [next, current];

      // Re-enable transitions
      setTimeout(() => {
        current.style.transition = 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out';
      }, 50);
    }, 1500); // matches transition time
  }, 4000); // total cycle (3s visible + 1s transition)



// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, hsl(215, 25%, 27%), hsl(217, 91%, 60%))';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'linear-gradient(135deg, hsl(215, 25%, 27%), hsl(217, 91%, 60%))';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('nav-open');
            this.classList.toggle('active');
        });
    }

    // Contact form handling
    // const contactForm = document.getElementById('contactForm');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Get form data
    //         const formData = new FormData(this);
    //         const formObject = {};
    //         formData.forEach((value, key) => {
    //             formObject[key] = value;
    //         });
            
    //         // Show success message (you can replace this with actual form submission)
    //         showNotification(`Thank you for your quote request! We'll get back to you within 24 hours.`, 'success');

    //         // Reset form
    //         this.reset();
    //     });
    // }
                const startInput = document.getElementById('start');
                 const endInput = document.getElementById('end');

                                // Auto-open date picker on click
                [startInput, endInput].forEach(input => {
                    input.addEventListener('click', () => {
                    if (input.showPicker) {
                        input.showPicker(); // Opens native picker
                    } else {
                        input.focus(); // Fallback for browsers without showPicker()
                    }
                    });
                });

            // When the start date changes, update the minimum end date
            startInput.addEventListener('change', () => {
                endInput.min = startInput.value;
            });

            // Optional: when end date changes, limit start date max
            endInput.addEventListener('change', () => {
                startInput.max = endInput.value;
            });


    // Service cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Stats counter animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const finalNumber = stat.textContent;
            const isPlus = finalNumber.includes('+');
            const numValue = parseInt(finalNumber.replace(/\D/g, ''));
            
            let currentNumber = 0;
            const increment = numValue / 50; // Animate over 50 steps
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= numValue) {
                    clearInterval(timer);
                    stat.textContent = finalNumber;
                } else {
                    stat.textContent = Math.floor(currentNumber) + (isPlus ? '+' : '');
                }
            }, 60);
        });
    }

   // Trigger stats animation when hero stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn-hero')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.875rem;
        line-height: 1.4;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border)';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = '#ef4444';
                isValid = false;
            }
        }
    });
    
    return isValid;
}





// Update year in footer
  document.getElementById("year").textContent = new Date().getFullYear();

