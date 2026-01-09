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

/* ✅ ADD THIS: Download CV function - generates PDF using jsPDF */
function downloadCV() {
  // Check if jsPDF is loaded
  if (typeof window.jspdf === 'undefined') {
    alert('PDF library is loading. Please try again in a moment.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  // Set font and add content
  doc.setFontSize(20);
  doc.text('ARZUMAN ARA MUKTA', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.text('Web Developer', 105, 30, { align: 'center' });
  
  let yPos = 45;
  
  // Contact Information
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('CONTACT INFORMATION', 105, yPos, { align: 'center' });
  yPos += 10;
  doc.setFont(undefined, 'normal');
  doc.text('Email: your.email@example.com', 20, yPos);
  yPos += 7;
  doc.text('GitHub: https://github.com/Arzumanara', 20, yPos);
  yPos += 7;
  doc.text('LinkedIn: https://linkedin.com/in/yourprofile', 20, yPos);
  yPos += 15;
  
  // Education
  doc.setFont(undefined, 'bold');
  doc.text('EDUCATION', 20, yPos);
  yPos += 7;
  doc.setFont(undefined, 'normal');
  doc.text('Your Degree/Diploma', 20, yPos);
  yPos += 7;
  doc.text('Your University/College Name', 20, yPos);
  yPos += 7;
  doc.text('Year - Year', 20, yPos);
  yPos += 15;
  
  // Skills
  doc.setFont(undefined, 'bold');
  doc.text('SKILLS', 20, yPos);
  yPos += 7;
  doc.setFont(undefined, 'normal');
  const skills = ['HTML, CSS, JavaScript', 'React, Node.js', 'Python', 'Git & Version Control', 'Responsive Design', 'REST API Integration'];
  skills.forEach(skill => {
    doc.text('• ' + skill, 20, yPos);
    yPos += 7;
  });
  yPos += 8;
  
  // Projects
  doc.setFont(undefined, 'bold');
  doc.text('PROJECTS', 20, yPos);
  yPos += 7;
  doc.setFont(undefined, 'normal');
  doc.text('1. E-Commerce Website', 20, yPos);
  yPos += 7;
  doc.text('   Technologies: HTML, CSS, JavaScript, React', 20, yPos);
  yPos += 10;
  doc.text('2. Task Management App', 20, yPos);
  yPos += 7;
  doc.text('   Technologies: HTML, CSS, JavaScript, LocalStorage API', 20, yPos);
  yPos += 10;
  doc.text('3. Weather Dashboard', 20, yPos);
  yPos += 7;
  doc.text('   Technologies: HTML, CSS, JavaScript, REST API', 20, yPos);
  yPos += 15;
  
  // Career Goals
  doc.setFont(undefined, 'bold');
  doc.text('CAREER GOALS', 20, yPos);
  yPos += 7;
  doc.setFont(undefined, 'normal');
  const careerGoals = doc.splitTextToSize(
    'I aspire to become a full-stack developer and work on innovative projects that make a positive impact. My goal is to continuously learn new technologies, contribute to open-source projects, and build scalable web applications that solve real-world problems.',
    170
  );
  doc.text(careerGoals, 20, yPos);
  
  // Save the PDF
  doc.save('Arzuman_Ara_Mukta_CV.pdf');
}// Add smooth entrance animations
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

/* Download CV function - generates PDF with profile picture matching CV design */
function downloadCV() {
  // Check if jsPDF is loaded
  if (typeof window.jspdf === 'undefined') {
    alert('PDF library is loading. Please try again in a moment.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm
  const leftColumnWidth = 70; // Left column width
  const rightColumnWidth = pageWidth - leftColumnWidth;
  
  // Colors matching CV design
  const darkPurple = [74, 20, 140]; // Dark purple for left column
  const lightBeige = [250, 240, 230]; // Light beige for right column
  const darkBrown = [101, 67, 33]; // Dark brown for text
  const white = [255, 255, 255]; // White
  
  // Draw left column background (dark purple)
  doc.setFillColor(darkPurple[0], darkPurple[1], darkPurple[2]);
  doc.rect(0, 0, leftColumnWidth, pageHeight, 'F');
  
  // Draw right column background (light beige)
  doc.setFillColor(lightBeige[0], lightBeige[1], lightBeige[2]);
  doc.rect(leftColumnWidth, 0, rightColumnWidth, pageHeight, 'F');
  
  // LEFT COLUMN CONTENT
  
  // Profile Picture
  const profileX = leftColumnWidth / 2;
  const profileY = 30;
  const profileRadius = 25;
  const profileSize = 50; // mm
  
  // Try to load and add the actual profile picture
  const profileImg = document.getElementById('profileImg');
  if (profileImg && profileImg.complete && profileImg.naturalWidth !== 0) {
    try {
      // Convert image to base64 and add to PDF
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = profileImg.naturalWidth;
      canvas.height = profileImg.naturalHeight;
      ctx.drawImage(profileImg, 0, 0);
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // Add circular clipping by creating a mask
      // Draw white circle first for background
      doc.setFillColor(white[0], white[1], white[2]);
      doc.circle(profileX, profileY, profileRadius, 'F');
      
      // Add image as circle (jsPDF doesn't support direct clipping, so we approximate)
      doc.addImage(imgData, 'JPEG', profileX - profileRadius, profileY - profileRadius, profileSize, profileSize, undefined, 'FAST', 0);
      
      // Draw border circle
      doc.setDrawColor(darkPurple[0], darkPurple[1], darkPurple[2]);
      doc.setLineWidth(2);
      doc.circle(profileX, profileY, profileRadius, 'D');
    } catch (e) {
      console.error('Error adding profile image:', e);
      // Fallback to circle with initials
      doc.setFillColor(white[0], white[1], white[2]);
      doc.circle(profileX, profileY, profileRadius, 'F');
      doc.setDrawColor(darkPurple[0], darkPurple[1], darkPurple[2]);
      doc.setLineWidth(2);
      doc.circle(profileX, profileY, profileRadius, 'D');
      doc.setTextColor(darkPurple[0], darkPurple[1], darkPurple[2]);
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('AAM', profileX, profileY + 3, { align: 'center' });
    }
  } else {
    // Fallback: Draw circle with initials
    doc.setFillColor(white[0], white[1], white[2]);
    doc.circle(profileX, profileY, profileRadius, 'F');
    doc.setDrawColor(darkPurple[0], darkPurple[1], darkPurple[2]);
    doc.setLineWidth(2);
    doc.circle(profileX, profileY, profileRadius, 'D');
    doc.setTextColor(darkPurple[0], darkPurple[1], darkPurple[2]);
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('AAM', profileX, profileY + 3, { align: 'center' });
  }
  
  // About Me Section
  let yPos = 85;
  doc.setTextColor(white[0], white[1], white[2]);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('About Me', leftColumnWidth / 2, yPos, { align: 'center' });
  
  yPos += 8;
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  const aboutText = doc.splitTextToSize(
    'Curious and forward-thinking Educational Technology and Engineering student passionate about innovative learning. Skilled in blending creativity, technology, and education for impactful learning experiences. Driven to build a future where technology empowers learners.',
    leftColumnWidth - 10
  );
  doc.text(aboutText, leftColumnWidth / 2, yPos, { align: 'center', maxWidth: leftColumnWidth - 10 });
  yPos += aboutText.length * 4 + 12;
  
  // Contact Section
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Contact', leftColumnWidth / 2, yPos, { align: 'center' });
  
  yPos += 8;
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  
  // Phone
  doc.text('📞 01841024795', leftColumnWidth / 2, yPos, { align: 'center' });
  yPos += 6;
  
  // Email
  doc.text('✉ arzumansea@gmail.com', leftColumnWidth / 2, yPos, { align: 'center' });
  yPos += 6;
  
  // Location
  doc.text('📍 Gazipur, Dhaka', leftColumnWidth / 2, yPos, { align: 'center' });
  
  // RIGHT COLUMN CONTENT
  
  let rightX = leftColumnWidth + 15;
  let rightY = 30;
  
  // Name
  doc.setTextColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  doc.setFontSize(22);
  doc.setFont(undefined, 'bold');
  doc.text('Arzuman Ara Mukta', rightX, rightY);
  
  rightY += 8;
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text('Student', rightX, rightY);
  
  rightY += 18;
  
  // Education Section
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('Education', rightX, rightY);
  
  rightY += 8;
  
  // Vertical line for Education
  doc.setDrawColor(darkBrown[0], darkBrown[1], darkBrown[2]);
  doc.setLineWidth(1);
  doc.line(rightX - 5, rightY - 8, rightX - 5, rightY + 30);
  
  // University
  doc.setFontSize(9);
  doc.setFont(undefined, 'bold');
  doc.text('UNIVERSITY OF FRONTIER TECHNOLOGY, BANGLADESH', rightX, rightY);
  rightY += 5;
  doc.setFont(undefined, 'normal');
  doc.text('Educational technology and engineering', rightX, rightY);
  rightY += 12;
  
  // College
  doc.setFont(undefined, 'bold');
  doc.text('CHANDINA MOHILLA COLLEGE', rightX, rightY);
  rightY += 5;
  doc.setFont(undefined, 'normal');
  doc.text('2020-21', rightX, rightY);
  rightY += 18;
  
  // Skills Section
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('skills', rightX, rightY);
  
  rightY += 8;
  
  // Vertical line for Skills
  doc.line(rightX - 5, rightY - 8, rightX - 5, rightY + 18);
  
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('• Web Design.', rightX, rightY);
  rightY += 5;
  doc.text('• Basic Programming.', rightX, rightY);
  rightY += 5;
  doc.text('• Team work.', rightX, rightY);
  rightY += 18;
  
  // Language Section
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.text('LANGUAGE', rightX, rightY);
  
  rightY += 8;
  
  // Vertical line for Language
  doc.line(rightX - 5, rightY - 8, rightX - 5, rightY + 12);
  
  doc.setFontSize(9);
  doc.setFont(undefined, 'normal');
  doc.text('• English.', rightX, rightY);
  rightY += 5;
  doc.text('• Bangla.', rightX, rightY);
  
  // Save the PDF
  doc.save('Arzuman_Ara_Mukta_CV.pdf');
}