// Add smooth entrance animations
document.addEventListener('DOMContentLoaded', function() {
  // Animate sections on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // Add shimmer effect to navigation links
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    link.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add parallax effect to profile picture
  const profilePic = document.querySelector('.profile-picture');
  if (profilePic) {
    document.addEventListener('mousemove', (e) => {
      const rect = profilePic.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      profilePic.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  }

  // Simple fade in for header
  const header = document.querySelector('header h1');
  if (header) {
    header.style.opacity = '0';
    header.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      header.style.opacity = '1';
    }, 200);
  }
});

function showProjectDetails(title, description) {
  // Create a beautiful modal instead of alert
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
    backdrop-filter: blur(5px);
  `;
  
  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                padding: 40px; 
                border-radius: 20px; 
                max-width: 500px; 
                color: white; 
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: scaleIn 0.3s ease;
                text-align: center;">
      <h2 style="margin-bottom: 20px; font-size: 2em;">${title}</h2>
      <p style="font-size: 1.2em; line-height: 1.6; margin-bottom: 30px;">${description}</p>
      <button id="closeModal" style="background: white; color: #764ba2; border: none; 
                                     padding: 12px 30px; border-radius: 25px; 
                                     font-size: 1.1em; cursor: pointer; 
                                     transition: all 0.3s ease; font-weight: bold;">
        Close
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const closeBtn = modal.querySelector('#closeModal');
  closeBtn.addEventListener('click', () => {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => modal.remove(), 300);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  });
  
  // Add keyframe animations dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (name === '') {
    alert('Please enter your name.');
    return false;
  }

  if (email === '') {
    alert('Please enter your email.');
    return false;
  }

  // Basic email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (message === '') {
    alert('Please enter your message.');
    return false;
  }

  alert('Thank you for contacting me!');
  // Clear form after submission
  document.getElementById('contactForm').reset();
  return false; // prevent actual submission for demo
}
