// ============================================
// Global Variables
// ============================================
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const voiceBtn = document.getElementById('voiceBtn');
const typingIndicator = document.getElementById('typingIndicator');
const chatContainer = document.getElementById('chatContainer');
const welcomeSection = document.querySelector('.welcome-section');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');
const themeToggle = document.getElementById('themeToggle');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

// ============================================
// Chat Functionality
// ============================================

// Sample bot responses for demonstration
const botResponses = {
    admission: {
        keywords: ['admission', 'apply', 'application', 'join', 'enroll', 'registration'],
        response: 'Our admission process is simple! You can apply online through our student portal. Key requirements include:\n\n• High school diploma or equivalent\n• Completed application form\n• Academic transcripts\n• Letter of recommendation\n• Application fee ($50)\n\nAdmission deadlines:\n- Fall semester: July 1st\n- Spring semester: December 1st\n\nWould you like more details about specific programs?'
    },
    courses: {
        keywords: ['course', 'program', 'degree', 'major', 'study', 'curriculum'],
        response: 'We offer a wide range of programs across multiple disciplines:\n\n📚 Engineering: CS, Mechanical, Electrical, Civil\n💼 Business: MBA, Finance, Marketing\n🔬 Sciences: Biology, Chemistry, Physics\n🎨 Arts: Design, Fine Arts, Media Studies\n👨‍⚕️ Healthcare: Nursing, Pharmacy, Medicine\n\nEach program is designed with modern curriculum and industry partnerships. Which field interests you?'
    },
    fees: {
        keywords: ['fee', 'cost', 'tuition', 'payment', 'price', 'afford', 'scholarship'],
        response: 'Our fee structure for 2026:\n\n💰 Undergraduate: $8,000/semester\n💰 Graduate: $12,000/semester\n\nFinancial Aid Options:\n• Merit-based scholarships (up to 50% off)\n• Need-based financial aid\n• Student loans\n• Work-study programs\n• Payment plans available\n\nOver 60% of our students receive some form of financial assistance. Would you like to learn about scholarship opportunities?'
    },
    exam: {
        keywords: ['exam', 'test', 'schedule', 'midterm', 'final', 'assessment'],
        response: 'Exam Schedule for Current Semester:\n\n📅 Mid-term Exams: March 15-22, 2026\n📅 Final Exams: June 1-12, 2026\n\nImportant Information:\n• Exam schedules posted 4 weeks in advance\n• Make-up exams available with valid reason\n• Results published within 2 weeks\n• Grade appeals can be submitted within 1 week\n\nYou can view detailed schedules on the student portal. Need help accessing it?'
    },
    faculty: {
        keywords: ['faculty', 'professor', 'teacher', 'instructor', 'staff', 'department head'],
        response: 'Our distinguished faculty includes:\n\n👨‍🏫 200+ full-time professors\n🎓 85% hold PhD degrees\n🏆 Multiple award winners and researchers\n🌍 International faculty from 20+ countries\n\nFaculty Highlights:\n• Research publications in top journals\n• Industry experience\n• Student mentorship programs\n• Office hours for one-on-one guidance\n\nWould you like to know about faculty in a specific department?'
    },
    placement: {
        keywords: ['placement', 'job', 'career', 'recruit', 'company', 'internship', 'employment'],
        response: 'Excellent placement record:\n\n📊 Placement Statistics 2025:\n• 92% placement rate\n• Average package: $65,000/year\n• Top package: $180,000/year\n• 150+ recruiting companies\n\n🏢 Top Recruiters:\nGoogle, Microsoft, Amazon, Apple, Tesla, Goldman Sachs, McKinsey, and more\n\n💼 Career Services:\n• Resume building workshops\n• Mock interviews\n• Career counseling\n• Internship programs\n• Alumni networking\n\nOur placement cell works year-round to connect students with opportunities!'
    },
    default: {
        keywords: [],
        response: 'Thank you for your question! I can help you with:\n\n• Admission Process\n• Course Details\n• Fee Structure\n• Exam Schedules\n• Faculty Information\n• Placement Statistics\n\nPlease ask me about any of these topics, or contact our admissions office at info@college.edu for personalized assistance.'
    }
};

// Initialize chat
function initChat() {
    // Event listeners
    sendBtn.addEventListener('click', handleSendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            if (query) {
                chatInput.value = query;
                handleSendMessage();
            }
        });
    });

    // Voice button (placeholder functionality)
    voiceBtn.addEventListener('click', handleVoiceInput);
}

// Handle send message
function handleSendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Hide welcome section and show chat
    if (!chatContainer.classList.contains('active')) {
        chatContainer.classList.add('active');
        welcomeSection.style.display = 'none';
    }
    
    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getBotResponse(message);
        addMessage(response, 'bot');
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const avatar = document.createElement('div');
    avatar.classList.add('message-avatar');
    avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = text;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(bubble);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Get bot response based on keywords
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check each category
    for (const category in botResponses) {
        if (category === 'default') continue;
        
        const { keywords, response } = botResponses[category];
        
        // Check if any keyword matches
        if (keywords.some(keyword => message.includes(keyword))) {
            return response;
        }
    }
    
    // Return default response if no match found
    return botResponses.default.response;
}

// Show typing indicator
function showTypingIndicator() {
    typingIndicator.classList.add('active');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    typingIndicator.classList.remove('active');
}

// Voice input (placeholder)
function handleVoiceInput() {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
            voiceBtn.style.color = '#EF4444'; // Red to indicate recording
            voiceBtn.innerHTML = '<i class="fas fa-microphone-slash"></i>';
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            alert('Could not recognize speech. Please try again.');
        };
        
        recognition.onend = () => {
            voiceBtn.style.color = '';
            voiceBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        };
        
        recognition.start();
    } else {
        alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
    }
}

// ============================================
// Dark Mode Toggle
// ============================================
function initThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// ============================================
// Mobile Menu Toggle
// ============================================
function initMobileMenu() {
    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        // Update icon
        const icon = mobileMenuToggle.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ============================================
// Smooth Scroll for Navigation
// ============================================
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only smooth scroll for anchor links
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    const icon = mobileMenuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                link.classList.add('active');
                
                // Smooth scroll to section
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        const sections = ['home', 'about', 'departments', 'contact'];
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
}

// ============================================
// Login Modal Functionality
// ============================================
function initLoginModal() {
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('loginModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const loginForm = document.querySelector('.login-form');
    
    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    // Close all modals on X click
    closeModals.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
    
    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentId = document.getElementById('loginStudentId').value;
        const password = document.getElementById('password').value;
        
        // Simulate login (replace with actual authentication)
        if (studentId && password) {
            // Update student info in dashboard
            document.getElementById('studentName').textContent = 'John Doe';
            document.getElementById('studentId').textContent = `ID: ${studentId}`;
            
            alert(`Welcome back, ${studentId}! Login successful.`);
            loginModal.classList.remove('active');
            loginForm.reset();
        }
    });
}

// ============================================
// Event Modal Functionality
// ============================================
function initEventModals() {
    const eventItems = document.querySelectorAll('.event-item.clickable');
    const eventModal = document.getElementById('eventModal');
    
    eventItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.getAttribute('data-event-title');
            const date = item.getAttribute('data-event-date');
            const time = item.getAttribute('data-event-time');
            const location = item.getAttribute('data-event-location');
            const description = item.getAttribute('data-event-description');
            
            // Populate modal
            document.getElementById('eventModalTitle').textContent = title;
            document.getElementById('eventModalDate').textContent = date;
            document.getElementById('eventModalTime').textContent = time;
            document.getElementById('eventModalLocation').textContent = location;
            document.getElementById('eventModalDescription').textContent = description;
            
            // Show modal
            eventModal.classList.add('active');
        });
    });
    
    // Event action buttons
    const registerBtn = document.querySelector('.event-action-btn.primary');
    const addToCalendarBtn = document.querySelector('.event-action-btn.secondary');
    
    registerBtn.addEventListener('click', () => {
        const eventTitle = document.getElementById('eventModalTitle').textContent;
        alert(`You have successfully registered for ${eventTitle}!`);
        eventModal.classList.remove('active');
    });
    
    addToCalendarBtn.addEventListener('click', () => {
        const eventTitle = document.getElementById('eventModalTitle').textContent;
        alert(`${eventTitle} has been added to your calendar!`);
    });
}

// ============================================
// Announcement Modal Functionality
// ============================================
function initAnnouncementModals() {
    const announcementItems = document.querySelectorAll('.announcement-item.clickable');
    const announcementModal = document.getElementById('announcementModal');
    
    announcementItems.forEach(item => {
        item.addEventListener('click', () => {
            const text = item.getAttribute('data-announcement');
            
            // Populate modal
            document.getElementById('announcementModalText').textContent = text;
            
            // Show modal
            announcementModal.classList.add('active');
        });
    });
}

// ============================================
// Academic Calendar Functionality
// ============================================
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Calendar events data (holidays, exams, events)
const calendarEvents = {
    '2026-01-01': { type: 'holiday', name: 'New Year\'s Day' },
    '2026-01-10': { type: 'event', name: 'Career Fair' },
    '2026-01-25': { type: 'event', name: 'Alumni Networking Night' },
    '2026-02-14': { type: 'holiday', name: 'Valentine\'s Day' },
    '2026-03-15': { type: 'exam', name: 'Mid-term Exams Start' },
    '2026-03-22': { type: 'exam', name: 'Mid-term Exams End' },
    '2026-04-01': { type: 'holiday', name: 'Spring Break' },
    '2026-05-01': { type: 'holiday', name: 'Labor Day' },
    '2026-06-01': { type: 'exam', name: 'Final Exams Start' },
    '2026-06-12': { type: 'exam', name: 'Final Exams End' },
    '2026-07-04': { type: 'holiday', name: 'Independence Day' },
    '2026-09-01': { type: 'event', name: 'Fall Semester Begins' },
    '2026-10-31': { type: 'event', name: 'Halloween Festival' },
    '2026-11-26': { type: 'holiday', name: 'Thanksgiving' },
    '2026-12-01': { type: 'event', name: 'Winter Registration Opens' },
    '2026-12-15': { type: 'event', name: 'Tech Fest 2026' },
    '2026-12-25': { type: 'holiday', name: 'Christmas' },
    '2026-12-31': { type: 'holiday', name: 'New Year\'s Eve' },
};

function initCalendar() {
    const viewCalendarBtn = document.getElementById('viewCalendarBtn');
    const calendarModal = document.getElementById('calendarModal');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    viewCalendarBtn.addEventListener('click', () => {
        renderCalendar(currentMonth, currentYear);
        calendarModal.classList.add('active');
    });
    
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
}

function renderCalendar(month, year) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    // Update header
    document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    const calendarDates = document.getElementById('calendarDates');
    calendarDates.innerHTML = '';
    
    const today = new Date();
    const isCurrentMonth = month === today.getMonth() && year === today.getFullYear();
    const todayDate = today.getDate();
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const dateDiv = createDateElement(daysInPrevMonth - i, 'other-month');
        calendarDates.appendChild(dateDiv);
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasEvent = calendarEvents[dateKey];
        
        let classes = '';
        if (isCurrentMonth && day === todayDate) {
            classes = 'today';
        }
        if (hasEvent) {
            classes += ` has-${hasEvent.type}`;
        }
        
        const dateDiv = createDateElement(day, classes);
        calendarDates.appendChild(dateDiv);
    }
    
    // Next month days
    const totalCells = calendarDates.children.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 days
    for (let i = 1; i <= remainingCells; i++) {
        const dateDiv = createDateElement(i, 'other-month');
        calendarDates.appendChild(dateDiv);
    }
    
    // Update events list
    updateEventsList(month, year);
}

function createDateElement(day, classes) {
    const dateDiv = document.createElement('div');
    dateDiv.className = `calendar-date ${classes}`;
    dateDiv.textContent = day;
    return dateDiv;
}

function updateEventsList(month, year) {
    const eventsList = document.getElementById('calendarEventsList');
    eventsList.innerHTML = '';
    
    // Get events for current month
    const monthEvents = [];
    Object.keys(calendarEvents).forEach(dateKey => {
        const [eventYear, eventMonth] = dateKey.split('-');
        if (parseInt(eventYear) === year && parseInt(eventMonth) === month + 1) {
            monthEvents.push({
                date: dateKey,
                ...calendarEvents[dateKey]
            });
        }
    });
    
    // Sort by date
    monthEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (monthEvents.length === 0) {
        eventsList.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">No events this month</p>';
        return;
    }
    
    // Render events
    monthEvents.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = `calendar-event-item ${event.type}`;
        
        const date = new Date(event.date);
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        eventDiv.innerHTML = `
            <div class="calendar-event-item-header">
                <h4>${event.name}</h4>
                <span class="calendar-event-type ${event.type}">${event.type}</span>
            </div>
            <p>${dateStr}</p>
        `;
        
        eventsList.appendChild(eventDiv);
    });
}

// ============================================
// Contact Form Handler
// ============================================
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
            const message = contactForm.querySelector('textarea').value;
            
            if (name && email && subject && message) {
                alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email} soon.`);
                contactForm.reset();
            }
        });
    }
}

// ============================================
// Newsletter Form Handler
// ============================================
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const email = input.value.trim();
            
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate subscription
            alert('Thank you for subscribing! You will receive updates at ' + email);
            input.value = '';
        });
    }
}

// ============================================
// Animations on Scroll
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.sidebar-section, .footer-section');
    animateElements.forEach(el => observer.observe(el));
}

// ============================================
// Auto-resize Chat Input
// ============================================
function initAutoResizeInput() {
    chatInput.addEventListener('input', () => {
        // Enable multi-line for longer messages (optional enhancement)
        if (chatInput.value.length > 100) {
            chatInput.style.height = 'auto';
            chatInput.style.height = chatInput.scrollHeight + 'px';
        }
    });
}

// ============================================
// Initialize All Functions
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initChat();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initLoginModal();
    initEventModals();
    initAnnouncementModals();
    initCalendar();
    initContactForm();
    initNewsletterForm();
    initScrollAnimations();
    initAutoResizeInput();
    
    // Add welcome message to console
    console.log('%c🤖 AI Campus Assistant', 'font-size: 20px; color: #1E3A8A; font-weight: bold;');
    console.log('%cWelcome to the Intelligent College Chatbot!', 'font-size: 14px; color: #2563EB;');
});

// ============================================
// Utility Functions
// ============================================

// Format timestamp
function getCurrentTimestamp() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

// Detect if user is on mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Show notification (optional enhancement)
function showNotification(message, type = 'info') {
    // This can be enhanced with a toast notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// ============================================
// Enhanced Features (Optional)
// ============================================

// Add quick reply buttons to bot messages (optional enhancement)
function addQuickReplyButtons(messageElement, options) {
    const quickReplies = document.createElement('div');
    quickReplies.classList.add('quick-replies');
    
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.classList.add('quick-reply-btn');
        btn.textContent = option;
        btn.addEventListener('click', () => {
            chatInput.value = option;
            handleSendMessage();
        });
        quickReplies.appendChild(btn);
    });
    
    messageElement.appendChild(quickReplies);
}

// Export for potential future enhancements
window.chatApp = {
    addMessage,
    getBotResponse,
    showTypingIndicator,
    hideTypingIndicator
};
