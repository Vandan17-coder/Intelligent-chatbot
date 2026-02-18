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
    const signupModal = document.getElementById('signupModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const loginForm = document.querySelector('.login-form');
    const signupForm = document.querySelector('.signup-form');
    const showSignupLink = document.getElementById('showSignupLink');
    const showLoginLink = document.getElementById('showLoginLink');
    
    // Open login modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
    
    // Switch to signup modal
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
        loginForm.reset();
    });
    
    // Switch to login modal
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
        signupForm.reset();
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
    
    // Handle signup form submission
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('signupFirstName').value.trim();
        const lastName = document.getElementById('signupLastName').value.trim();
        const studentId = document.getElementById('signupStudentId').value.trim();
        const email = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match! Please try again.');
            return;
        }
        
        // Get existing users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || {};
        
        // Check if user already exists
        if (users[studentId]) {
            alert('This Student ID is already registered! Please login instead.');
            return;
        }
        
        // Create new user
        users[studentId] = {
            firstName: firstName,
            lastName: lastName,
            studentId: studentId,
            email: email,
            password: password, // In production, this should be hashed
            registeredDate: new Date().toISOString(),
            status: 'Active',
            phone: '',
            dob: '',
            gender: '',
            address: '',
            program: 'Computer Science',
            degree: 'Bachelor of Science',
            academicYear: 'Freshman (1st Year)',
            graduation: 'May 2029',
            enrollmentStatus: 'Full-time',
            advisor: 'Dr. Sarah Johnson',
            emergencyName: '',
            emergencyPhone: '',
            emergencyRelation: '',
            avatarIcon: 'fa-user'
        };
        
        // Save to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        
        alert(`Registration successful! Welcome ${firstName}! You can now login with your Student ID.`);
        signupModal.classList.remove('active');
        signupForm.reset();
        loginModal.classList.add('active');
    });
    
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const studentId = document.getElementById('loginStudentId').value.trim();
        const password = document.getElementById('password').value;
        
        // Get users from localStorage
        let users = JSON.parse(localStorage.getItem('users')) || {};
        
        // Validate credentials
        if (!users[studentId]) {
            alert('Student ID not found! Please check your ID or sign up.');
            return;
        }
        
        if (users[studentId].password !== password) {
            alert('Incorrect password! Please try again.');
            return;
        }
        
        // Login successful - update current user in localStorage
        const currentUser = users[studentId];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Update student info in dashboard
        updateStudentDashboard(currentUser);
        
        alert(`Welcome back, ${currentUser.firstName}! Login successful.`);
        loginModal.classList.remove('active');
        loginForm.reset();
    });
    
    // Check if user is already logged in
    checkCurrentUser();
}

// Update student dashboard with user data
function updateStudentDashboard(user) {
    document.getElementById('studentName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('studentId').textContent = `ID: ${user.studentId}`;
    document.getElementById('studentStatus').textContent = user.status;
    
    // Update global studentProfile object
    Object.assign(studentProfile, user);
}

// Check if there's a current logged-in user
function checkCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (currentUser) {
        updateStudentDashboard(currentUser);
        // Show logout button, hide login button
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) {
            logoutBtn.style.display = 'flex';
            logoutBtn.addEventListener('click', handleLogout);
        }
    } else {
        // Show login button, hide logout button
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        
        // Reset to default student info
        document.getElementById('studentName').textContent = 'Guest User';
        document.getElementById('studentId').textContent = 'ID: ---';
        document.getElementById('studentStatus').textContent = 'Not Logged In';
        
        // Show login button, hide logout button
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        if (loginBtn) loginBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        
        alert('You have been logged out successfully.');
    }
}

// ============================================
// Password Toggle Functionality
// ============================================
function initPasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const targetId = toggle.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = toggle.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                toggle.setAttribute('aria-label', 'Hide password');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                toggle.setAttribute('aria-label', 'Show password');
            }
        });
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
// Student Dashboard Functionality
// ============================================

const studentProfile = {
    firstName: 'John',
    lastName: 'Doe',
    studentId: '2026CS001',
    email: 'john.doe@college.edu',
    phone: '+1 (234) 567-8900',
    dob: '2004-05-15',
    gender: 'male',
    address: '123 Main Street, City, State 12345',
    program: 'Computer Science',
    degree: 'Bachelor of Science',
    academicYear: 'Sophomore (2nd Year)',
    graduation: 'May 2028',
    enrollmentStatus: 'Full-time',
    advisor: 'Dr. Sarah Johnson',
    status: 'Active',
    emergencyName: 'Jane Doe',
    emergencyPhone: '+1 (234) 567-8901',
    emergencyRelation: 'Mother',
    avatarIcon: 'fa-user'
};

function initStudentDashboard() {
    const studentInfoCard = document.getElementById('studentInfoCard');
    const viewProfileBtn = document.getElementById('viewProfileBtn');
    const studentProfileModal = document.getElementById('studentProfileModal');
    const coursesStatBtn = document.getElementById('coursesStatBtn');
    const gpaStatBtn = document.getElementById('gpaStatBtn');
    const attendanceStatBtn = document.getElementById('attendanceStatBtn');
    
    // Update dashboard display
    updateDashboardDisplay();
    
    // Make student info card clickable
    studentInfoCard.style.cursor = 'pointer';
    studentInfoCard.addEventListener('click', openStudentProfile);
    
    // View profile button
    viewProfileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openStudentProfile();
    });
    
    // Stats buttons
    coursesStatBtn.style.cursor = 'pointer';
    coursesStatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('courseMaterialsBtn').click();
    });
    
    gpaStatBtn.style.cursor = 'pointer';
    gpaStatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('gradesBtn').click();
    });
    
    attendanceStatBtn.style.cursor = 'pointer';
    attendanceStatBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showAttendanceDetails();
    });
    
    // Profile tabs
    const profileTabs = document.querySelectorAll('.profile-tab');
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchProfileTab(tab.getAttribute('data-tab'));
        });
    });
    
    // Edit profile functionality
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    
    editProfileBtn.addEventListener('click', enableProfileEdit);
    saveProfileBtn.addEventListener('click', saveProfileChanges);
    cancelEditBtn.addEventListener('click', cancelProfileEdit);
    
    // Change avatar
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    changeAvatarBtn.addEventListener('click', changeAvatar);
}

function updateDashboardDisplay() {
    // Calculate total courses and GPA from grades data
    const currentSemester = gradesData['spring2026'];
    const coursesCount = currentSemester.courses.length;
    
    // Calculate cumulative GPA
    let totalCredits = 0;
    let totalPoints = 0;
    
    Object.values(gradesData).forEach(semester => {
        semester.courses.forEach(course => {
            totalCredits += course.credits;
            totalPoints += course.credits * course.points;
        });
    });
    
    const cumulativeGpa = (totalPoints / totalCredits).toFixed(2);
    
    // Update dashboard
    document.getElementById('studentName').textContent = `${studentProfile.firstName} ${studentProfile.lastName}`;
    document.getElementById('studentId').textContent = `ID: ${studentProfile.studentId}`;
    document.getElementById('studentStatus').textContent = studentProfile.status;
    document.getElementById('coursesCount').textContent = coursesCount;
    document.getElementById('gpaValue').textContent = cumulativeGpa;
    
    // Update attendance
    const overallAttendance = Math.round(
        ((attendanceData.lab.attended + attendanceData.lecture.attended) / 
        (attendanceData.lab.total + attendanceData.lecture.total)) * 100
    );
    document.getElementById('attendanceValue').textContent = `${overallAttendance}%`;
    
    // Update GPA display in header if exists
    const gpaDisplayValue = document.querySelector('.gpa-value');
    if (gpaDisplayValue) {
        gpaDisplayValue.textContent = cumulativeGpa;
    }
    
    // Store for later use
    studentProfile.totalCredits = totalCredits;
    studentProfile.cumulativeGpa = cumulativeGpa;
}

function openStudentProfile() {
    const studentProfileModal = document.getElementById('studentProfileModal');
    
    // Populate profile data
    document.getElementById('profileName').textContent = `${studentProfile.firstName} ${studentProfile.lastName}`;
    document.getElementById('profileStudentId').textContent = `Student ID: ${studentProfile.studentId}`;
    document.getElementById('profileStatus').textContent = studentProfile.status;
    
    // Personal Info
    document.getElementById('firstName').value = studentProfile.firstName;
    document.getElementById('lastName').value = studentProfile.lastName;
    document.getElementById('dob').value = studentProfile.dob;
    document.getElementById('gender').value = studentProfile.gender;
    document.getElementById('address').value = studentProfile.address;
    
    // Academic Info
    document.getElementById('program').value = studentProfile.program;
    document.getElementById('degree').value = studentProfile.degree;
    document.getElementById('academicYear').value = studentProfile.academicYear;
    document.getElementById('graduation').value = studentProfile.graduation;
    document.getElementById('enrollmentStatus').value = studentProfile.enrollmentStatus;
    document.getElementById('advisor').value = studentProfile.advisor;
    
    // Academic Summary
    document.getElementById('totalCredits').textContent = studentProfile.totalCredits || 48;
    document.getElementById('cumulativeGpa').textContent = studentProfile.cumulativeGpa || '3.8';
    document.getElementById('deansListCount').textContent = '3';
    document.getElementById('creditsNeeded').textContent = (120 - (studentProfile.totalCredits || 48));
    
    // Contact Details
    document.getElementById('email').value = studentProfile.email;
    document.getElementById('phone').value = studentProfile.phone;
    document.getElementById('emergencyName').value = studentProfile.emergencyName;
    document.getElementById('emergencyPhone').value = studentProfile.emergencyPhone;
    document.getElementById('emergencyRelation').value = studentProfile.emergencyRelation;
    
    // Show modal
    studentProfileModal.classList.add('active');
    switchProfileTab('personal');
}

function switchProfileTab(tabName) {
    // Update tab buttons
    const tabs = document.querySelectorAll('.profile-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update tab panes
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    if (tabName === 'personal') {
        document.getElementById('personalTab').classList.add('active');
    } else if (tabName === 'academic') {
        document.getElementById('academicTab').classList.add('active');
    } else if (tabName === 'contact') {
        document.getElementById('contactTab').classList.add('active');
    }
}

function enableProfileEdit() {
    // Enable all input fields except student ID
    const inputs = document.querySelectorAll('.profile-form input, .profile-form select');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.removeAttribute('disabled');
    });
    
    // Show/hide buttons
    document.getElementById('editProfileBtn').style.display = 'none';
    document.getElementById('saveProfileBtn').style.display = 'inline-flex';
    document.getElementById('cancelEditBtn').style.display = 'inline-flex';
    
    // Add edit indicator
    const profileBody = document.querySelector('.student-profile-body');
    profileBody.classList.add('editing');
}

function saveProfileChanges() {
    // Get updated values
    studentProfile.firstName = document.getElementById('firstName').value;
    studentProfile.lastName = document.getElementById('lastName').value;
    studentProfile.dob = document.getElementById('dob').value;
    studentProfile.gender = document.getElementById('gender').value;
    studentProfile.address = document.getElementById('address').value;
    studentProfile.program = document.getElementById('program').value;
    studentProfile.degree = document.getElementById('degree').value;
    studentProfile.academicYear = document.getElementById('academicYear').value;
    studentProfile.graduation = document.getElementById('graduation').value;
    studentProfile.enrollmentStatus = document.getElementById('enrollmentStatus').value;
    studentProfile.advisor = document.getElementById('advisor').value;
    studentProfile.email = document.getElementById('email').value;
    studentProfile.phone = document.getElementById('phone').value;
    studentProfile.emergencyName = document.getElementById('emergencyName').value;
    studentProfile.emergencyPhone = document.getElementById('emergencyPhone').value;
    studentProfile.emergencyRelation = document.getElementById('emergencyRelation').value;
    
    // Update dashboard display
    updateDashboardDisplay();
    
    // Update profile modal display
    document.getElementById('profileName').textContent = `${studentProfile.firstName} ${studentProfile.lastName}`;
    
    // Disable editing
    disableProfileEdit();
    
    // Show success message
    alert('Profile updated successfully!');
}

function cancelProfileEdit() {
    // Reload original values
    openStudentProfile();
    
    // Disable editing
    disableProfileEdit();
}

function disableProfileEdit() {
    // Disable all input fields
    const inputs = document.querySelectorAll('.profile-form input, .profile-form select');
    inputs.forEach(input => {
        input.setAttribute('readonly', 'readonly');
        if (input.tagName === 'SELECT') {
            input.setAttribute('disabled', 'disabled');
        }
    });
    
    // Show/hide buttons
    document.getElementById('editProfileBtn').style.display = 'inline-flex';
    document.getElementById('saveProfileBtn').style.display = 'none';
    document.getElementById('cancelEditBtn').style.display = 'none';
    
    // Remove edit indicator
    const profileBody = document.querySelector('.student-profile-body');
    profileBody.classList.remove('editing');
}

function changeAvatar() {
    const avatarIcons = [
        'fa-user', 'fa-user-graduate', 'fa-user-astronaut', 'fa-user-ninja',
        'fa-user-tie', 'fa-user-secret', 'fa-smile', 'fa-laugh',
        'fa-grin-stars', 'fa-robot'
    ];
    
    const currentIndex = avatarIcons.indexOf(studentProfile.avatarIcon);
    const nextIndex = (currentIndex + 1) % avatarIcons.length;
    studentProfile.avatarIcon = avatarIcons[nextIndex];
    
    // Update all avatar displays
    document.querySelectorAll('.student-avatar i, .profile-avatar-large i').forEach(icon => {
        icon.className = `fas ${studentProfile.avatarIcon}`;
    });
}

// ============================================
// Attendance Functionality
// ============================================

const attendanceData = {
    lab: { attended: 34, total: 40 },
    lecture: { attended: 46, total: 50 }
};

function showAttendanceDetails() {
    const labPercentage = Math.round((attendanceData.lab.attended / attendanceData.lab.total) * 100);
    const lecturePercentage = Math.round((attendanceData.lecture.attended / attendanceData.lecture.total) * 100);
    const overallPercentage = Math.round(
        ((attendanceData.lab.attended + attendanceData.lecture.attended) / 
        (attendanceData.lab.total + attendanceData.lecture.total)) * 100
    );
    
    const attendanceMessage = `📊 Your Attendance Report\n\n` +
        `🧪 Lab Sessions:\n` +
        `   • Attended: ${attendanceData.lab.attended}/${attendanceData.lab.total} sessions\n` +
        `   • Percentage: ${labPercentage}%\n` +
        `   • Status: ${labPercentage >= 80 ? '✅ Good' : '⚠️ Needs Improvement'}\n\n` +
        `📚 Lecture Sessions:\n` +
        `   • Attended: ${attendanceData.lecture.attended}/${attendanceData.lecture.total} sessions\n` +
        `   • Percentage: ${lecturePercentage}%\n` +
        `   • Status: ${lecturePercentage >= 80 ? '✅ Good' : '⚠️ Needs Improvement'}\n\n` +
        `📈 Overall Attendance: ${overallPercentage}%\n` +
        `Minimum Required: 75%\n\n` +
        `${overallPercentage >= 75 ? '✅ You meet the attendance requirements!' : '⚠️ Please improve your attendance to meet minimum requirements.'}\n\n` +
        `Tip: Maintaining 80%+ attendance is recommended for academic success.`;
    
    // Add message to chat
    addMessage(attendanceMessage, 'bot');
    
    // Show chat if hidden
    if (!chatContainer.classList.contains('active')) {
        chatContainer.classList.add('active');
        welcomeSection.style.display = 'none';
    }
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ============================================
// FAQs Functionality
// ============================================

const faqsData = [
    {
        id: 1,
        category: 'Admissions',
        question: 'How do I apply for admission?',
        answer: 'You can apply online through our student portal. Visit the Admissions page, create an account, and fill out the application form. Required documents include transcripts, recommendation letters, and a personal statement. The application fee is $50.'
    },
    {
        id: 2,
        category: 'Admissions',
        question: 'What are the admission requirements?',
        answer: 'Requirements vary by program but generally include: High school diploma or equivalent, minimum GPA of 3.0, standardized test scores (SAT/ACT), letters of recommendation, and a personal essay. Some programs may have additional requirements.'
    },
    {
        id: 3,
        category: 'Admissions',
        question: 'When are the application deadlines?',
        answer: 'Fall semester deadline: July 1st. Spring semester deadline: December 1st. Early decision applications are due one month earlier. We recommend applying early as spaces fill quickly.'
    },
    {
        id: 4,
        category: 'Financial',
        question: 'What financial aid options are available?',
        answer: 'We offer merit-based scholarships (up to 50% tuition), need-based grants, federal student loans, work-study programs, and flexible payment plans. Complete the FAFSA to be considered for federal aid. Over 60% of our students receive some form of financial assistance.'
    },
    {
        id: 5,
        category: 'Financial',
        question: 'How much does tuition cost?',
        answer: 'Undergraduate tuition is $8,000 per semester. Graduate tuition is $12,000 per semester. Additional fees may include technology fee ($200), student activities fee ($150), and health services fee ($100). Books and supplies average $1,000 per year.'
    },
    {
        id: 6,
        category: 'Academic',
        question: 'How do I register for classes?',
        answer: 'Log into the student portal during your registration period. Go to Course Registration, search for courses, and add them to your schedule. Make sure you meet all prerequisites. If a class is full, you can join the waitlist. Contact your academic advisor if you need assistance.'
    },
    {
        id: 7,
        category: 'Academic',
        question: 'What is the grading system?',
        answer: 'We use a standard letter grade system: A (4.0), A- (3.7), B+ (3.3), B (3.0), B- (2.7), C+ (2.3), C (2.0), C- (1.7), D+ (1.3), D (1.0), F (0.0). A minimum GPA of 2.0 is required for good academic standing.'
    },
    {
        id: 8,
        category: 'Academic',
        question: 'Can I change my major?',
        answer: 'Yes! Students can change their major by meeting with an academic advisor and completing a Change of Major form. This is typically done during your first two years. Some competitive programs may have additional requirements or application processes.'
    },
    {
        id: 9,
        category: 'Campus Life',
        question: 'What housing options are available?',
        answer: 'We offer on-campus dormitories (double and single rooms), apartment-style housing for upperclassmen, and off-campus housing listings. All freshmen are required to live on campus. Housing applications open in March for the fall semester.'
    },
    {
        id: 10,
        category: 'Campus Life',
        question: 'What clubs and activities are available?',
        answer: 'We have over 100 student organizations including academic clubs, sports teams, cultural organizations, service groups, and special interest clubs. Visit the Student Life office or check the student portal to browse clubs and join.'
    },
    {
        id: 11,
        category: 'Technical',
        question: 'How do I access my student email?',
        answer: 'Your student email is created when you\'re admitted. Access it at mail.college.edu using your student ID and password. This is your official communication channel, so check it daily for important announcements.'
    },
    {
        id: 12,
        category: 'Technical',
        question: 'Where can I get technical support?',
        answer: 'The IT Help Desk is located in the Library, Room 101. Hours: Monday-Friday 8am-8pm, Saturday 10am-6pm. You can also submit a ticket online at helpdesk.college.edu or call (234) 567-8901.'
    },
    {
        id: 13,
        category: 'Career',
        question: 'Does the college help with job placement?',
        answer: 'Yes! Our Career Services office offers resume reviews, mock interviews, job search assistance, internship programs, and career fairs. We have partnerships with over 150 companies. Schedule an appointment through the student portal.'
    },
    {
        id: 14,
        category: 'Career',
        question: 'What is the placement rate?',
        answer: 'Our placement rate is 92% within 6 months of graduation. The average starting salary is $65,000 per year. Top companies recruiting our graduates include Google, Microsoft, Amazon, Goldman Sachs, and many more Fortune 500 companies.'
    },
    {
        id: 15,
        category: 'General',
        question: 'What are the library hours?',
        answer: 'Regular hours: Monday-Thursday 7am-11pm, Friday 7am-8pm, Saturday 9am-8pm, Sunday 10am-11pm. During finals week, the library is open 24/7. Access requires your student ID.'
    }
];

function initFAQs() {
    const faqsBtn = document.getElementById('faqsBtn');
    const faqsModal = document.getElementById('faqsModal');
    const faqsList = document.getElementById('faqsList');
    const faqSearch = document.getElementById('faqSearch');
    
    faqsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderFAQs(faqsData);
        faqsModal.classList.add('active');
    });
    
    faqSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredFAQs = faqsData.filter(faq => 
            faq.question.toLowerCase().includes(searchTerm) ||
            faq.answer.toLowerCase().includes(searchTerm) ||
            faq.category.toLowerCase().includes(searchTerm)
        );
        renderFAQs(filteredFAQs);
    });
}

function renderFAQs(faqs) {
    const faqsList = document.getElementById('faqsList');
    faqsList.innerHTML = '';
    
    if (faqs.length === 0) {
        faqsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 3rem 2rem;">No FAQs found</p>';
        return;
    }
    
    // Group FAQs by category
    const categories = [...new Set(faqs.map(faq => faq.category))];
    
    categories.forEach(category => {
        const categoryFAQs = faqs.filter(faq => faq.category === category);
        
        const categorySection = document.createElement('div');
        categorySection.className = 'faq-category-section';
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'faq-category-header';
        categoryHeader.textContent = category;
        categorySection.appendChild(categoryHeader);
        
        categoryFAQs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            faqItem.innerHTML = `
                <div class="faq-question" onclick="toggleFAQ(${faq.id})">
                    <h4>${faq.question}</h4>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="faq-answer-${faq.id}" style="display: none;">
                    <p>${faq.answer}</p>
                </div>
            `;
            
            categorySection.appendChild(faqItem);
        });
        
        faqsList.appendChild(categorySection);
    });
}

function toggleFAQ(faqId) {
    const answer = document.getElementById(`faq-answer-${faqId}`);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('i');
    
    if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        answer.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

// ============================================
// Grades Functionality
// ============================================

const gradesData = {
    spring2026: {
        semester: 'Spring 2026',
        courses: [
            { code: 'CS101', name: 'Introduction to Computer Science', credits: 4, grade: 'A', points: 4.0, instructor: 'Dr. Sarah Johnson' },
            { code: 'MATH201', name: 'Calculus II', credits: 4, grade: 'A-', points: 3.7, instructor: 'Prof. Michael Chen' },
            { code: 'ENG102', name: 'English Composition', credits: 3, grade: 'B+', points: 3.3, instructor: 'Dr. Emily Roberts' },
            { code: 'PHYS201', name: 'Physics II', credits: 4, grade: 'A', points: 4.0, instructor: 'Dr. James Wilson' },
            { code: 'BUS301', name: 'Business Management', credits: 3, grade: 'B', points: 3.0, instructor: 'Prof. Lisa Anderson' },
            { code: 'CHEM101', name: 'General Chemistry', credits: 4, grade: 'A-', points: 3.7, instructor: 'Dr. Robert Martinez' }
        ]
    },
    fall2025: {
        semester: 'Fall 2025',
        courses: [
            { code: 'CS100', name: 'Programming Fundamentals', credits: 3, grade: 'A', points: 4.0, instructor: 'Dr. Sarah Johnson' },
            { code: 'MATH101', name: 'Calculus I', credits: 4, grade: 'B+', points: 3.3, instructor: 'Prof. Michael Chen' },
            { code: 'ENG101', name: 'Writing & Rhetoric', credits: 3, grade: 'A-', points: 3.7, instructor: 'Dr. Emily Roberts' },
            { code: 'PHYS101', name: 'Physics I', credits: 4, grade: 'B+', points: 3.3, instructor: 'Dr. James Wilson' },
            { code: 'HIST201', name: 'World History', credits: 3, grade: 'A', points: 4.0, instructor: 'Prof. David Lee' }
        ]
    },
    spring2025: {
        semester: 'Spring 2025',
        courses: [
            { code: 'CS099', name: 'Intro to Computing', credits: 3, grade: 'A', points: 4.0, instructor: 'Dr. Sarah Johnson' },
            { code: 'MATH099', name: 'Pre-Calculus', credits: 3, grade: 'B+', points: 3.3, instructor: 'Prof. Michael Chen' },
            { code: 'BIO101', name: 'Biology I', credits: 4, grade: 'A-', points: 3.7, instructor: 'Dr. Susan Park' },
            { code: 'PSY101', name: 'Introduction to Psychology', credits: 3, grade: 'A', points: 4.0, instructor: 'Dr. Karen White' },
            { code: 'ART101', name: 'Art Appreciation', credits: 2, grade: 'A', points: 4.0, instructor: 'Prof. Maria Garcia' }
        ]
    }
};

function initGrades() {
    const gradesBtn = document.getElementById('gradesBtn');
    const gradesModal = document.getElementById('gradesModal');
    const semesterSelect = document.getElementById('semesterSelect');
    
    gradesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderGrades('spring2026');
        gradesModal.classList.add('active');
    });
    
    semesterSelect.addEventListener('change', (e) => {
        renderGrades(e.target.value);
    });
}

function renderGrades(semesterId) {
    const container = document.getElementById('gradesTableContainer');
    const semesterData = gradesData[semesterId];
    
    if (!semesterData) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 2rem;">No grades available</p>';
        return;
    }
    
    // Calculate semester GPA
    const totalCredits = semesterData.courses.reduce((sum, course) => sum + course.credits, 0);
    const totalPoints = semesterData.courses.reduce((sum, course) => sum + (course.credits * course.points), 0);
    const semesterGPA = (totalPoints / totalCredits).toFixed(2);
    
    container.innerHTML = `
        <div class="grades-summary">
            <div class="summary-item">
                <span class="summary-label">Total Credits:</span>
                <span class="summary-value">${totalCredits}</span>
            </div>
            <div class="summary-item">
                <span class="summary-label">Semester GPA:</span>
                <span class="summary-value highlight">${semesterGPA}</span>
            </div>
        </div>
        <table class="grades-table">
            <thead>
                <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Instructor</th>
                    <th>Credits</th>
                    <th>Grade</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                ${semesterData.courses.map(course => `
                    <tr>
                        <td><strong>${course.code}</strong></td>
                        <td>${course.name}</td>
                        <td>${course.instructor}</td>
                        <td>${course.credits}</td>
                        <td><span class="grade-badge grade-${course.grade.replace(/[+-]/g, '')}">${course.grade}</span></td>
                        <td>${course.points.toFixed(1)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ============================================
// Course Materials Functionality
// ============================================

// Sample course materials data
const courseMaterials = [
    {
        id: 1,
        code: 'CS101',
        name: 'Introduction to Computer Science',
        instructor: 'Dr. Sarah Johnson',
        semester: 'Spring 2026',
        materials: [
            { name: 'Syllabus', type: 'PDF', size: '245 KB', url: '#' },
            { name: 'Lecture 1 - Introduction', type: 'PDF', size: '1.2 MB', url: '#' },
            { name: 'Lecture 2 - Data Structures', type: 'PDF', size: '980 KB', url: '#' },
            { name: 'Lab Assignment 1', type: 'PDF', size: '450 KB', url: '#' },
            { name: 'Programming Project', type: 'ZIP', size: '3.5 MB', url: '#' }
        ]
    },
    {
        id: 2,
        code: 'MATH201',
        name: 'Calculus II',
        instructor: 'Prof. Michael Chen',
        semester: 'Spring 2026',
        materials: [
            { name: 'Course Syllabus', type: 'PDF', size: '180 KB', url: '#' },
            { name: 'Chapter 1 - Limits', type: 'PDF', size: '850 KB', url: '#' },
            { name: 'Chapter 2 - Derivatives', type: 'PDF', size: '920 KB', url: '#' },
            { name: 'Practice Problems Set 1', type: 'PDF', size: '540 KB', url: '#' },
            { name: 'Solutions Manual', type: 'PDF', size: '2.1 MB', url: '#' }
        ]
    },
    {
        id: 3,
        code: 'ENG102',
        name: 'English Composition',
        instructor: 'Dr. Emily Roberts',
        semester: 'Spring 2026',
        materials: [
            { name: 'Course Overview', type: 'PDF', size: '320 KB', url: '#' },
            { name: 'Essay Guidelines', type: 'PDF', size: '410 KB', url: '#' },
            { name: 'Reading List', type: 'PDF', size: '280 KB', url: '#' },
            { name: 'Sample Essays', type: 'PDF', size: '1.5 MB', url: '#' }
        ]
    },
    {
        id: 4,
        code: 'PHYS201',
        name: 'Physics II - Electromagnetism',
        instructor: 'Dr. James Wilson',
        semester: 'Spring 2026',
        materials: [
            { name: 'Syllabus', type: 'PDF', size: '290 KB', url: '#' },
            { name: 'Lecture Notes - Week 1', type: 'PDF', size: '1.1 MB', url: '#' },
            { name: 'Lab Manual', type: 'PDF', size: '3.2 MB', url: '#' },
            { name: 'Problem Sets', type: 'PDF', size: '760 KB', url: '#' },
            { name: 'Simulation Software', type: 'ZIP', size: '5.8 MB', url: '#' }
        ]
    },
    {
        id: 5,
        code: 'BUS301',
        name: 'Business Management',
        instructor: 'Prof. Lisa Anderson',
        semester: 'Spring 2026',
        materials: [
            { name: 'Course Guide', type: 'PDF', size: '380 KB', url: '#' },
            { name: 'Case Study 1', type: 'PDF', size: '620 KB', url: '#' },
            { name: 'Textbook Chapter 1', type: 'PDF', size: '1.8 MB', url: '#' },
            { name: 'Group Project Guidelines', type: 'PDF', size: '450 KB', url: '#' }
        ]
    },
    {
        id: 6,
        code: 'CHEM101',
        name: 'General Chemistry',
        instructor: 'Dr. Robert Martinez',
        semester: 'Spring 2026',
        materials: [
            { name: 'Syllabus', type: 'PDF', size: '310 KB', url: '#' },
            { name: 'Periodic Table Reference', type: 'PDF', size: '540 KB', url: '#' },
            { name: 'Lab Safety Procedures', type: 'PDF', size: '720 KB', url: '#' },
            { name: 'Lecture 1 - Atomic Structure', type: 'PDF', size: '1.3 MB', url: '#' },
            { name: 'Practice Quizzes', type: 'PDF', size: '890 KB', url: '#' }
        ]
    }
];

function initCourseMaterials() {
    const courseMaterialsBtn = document.getElementById('courseMaterialsBtn');
    const courseMaterialsModal = document.getElementById('courseMaterialsModal');
    const coursesList = document.getElementById('coursesList');
    const courseSearch = document.getElementById('courseSearch');
    
    // Open modal
    courseMaterialsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderCourses(courseMaterials);
        courseMaterialsModal.classList.add('active');
    });
    
    // Search functionality
    courseSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredCourses = courseMaterials.filter(course => 
            course.code.toLowerCase().includes(searchTerm) ||
            course.name.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm)
        );
        renderCourses(filteredCourses);
    });
}

function renderCourses(courses) {
    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';
    
    if (courses.length === 0) {
        coursesList.innerHTML = '<p style=\"text-align: center; color: var(--text-secondary); padding: 2rem;\">No courses found</p>';
        return;
    }
    
    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        
        courseCard.innerHTML = `
            <div class=\"course-card-header\">
                <div class=\"course-info\">
                    <h3>${course.code}: ${course.name}</h3>
                    <p class=\"course-instructor\"><i class=\"fas fa-user-tie\"></i> ${course.instructor}</p>
                    <p class=\"course-semester\"><i class=\"fas fa-calendar\"></i> ${course.semester}</p>
                </div>
                <button class=\"toggle-materials-btn\" onclick=\"toggleCourseMaterials(${course.id})\">
                    <i class=\"fas fa-chevron-down\"></i>
                </button>
            </div>
            <div class=\"course-materials-list\" id=\"materials-${course.id}\" style=\"display: none;\">
                ${course.materials.map(material => `
                    <div class=\"material-item\">
                        <div class=\"material-info\">
                            <i class=\"fas fa-file-${getMaterialIcon(material.type)}\"></i>
                            <div class=\"material-details\">
                                <span class=\"material-name\">${material.name}</span>
                                <span class=\"material-meta\">${material.type} • ${material.size}</span>
                            </div>
                        </div>
                        <button class=\"download-btn\" onclick=\"downloadMaterial('${material.name}', '${course.code}')\">
                            <i class=\"fas fa-download\"></i>
                            Download
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        
        coursesList.appendChild(courseCard);
    });
}

function toggleCourseMaterials(courseId) {
    const materialsList = document.getElementById(`materials-${courseId}`);
    const toggleBtn = event.target.closest('.toggle-materials-btn');
    const icon = toggleBtn.querySelector('i');
    
    if (materialsList.style.display === 'none') {
        materialsList.style.display = 'block';
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
    } else {
        materialsList.style.display = 'none';
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
    }
}

function getMaterialIcon(type) {
    const icons = {
        'PDF': 'pdf',
        'ZIP': 'archive',
        'DOC': 'word',
        'DOCX': 'word',
        'PPT': 'powerpoint',
        'PPTX': 'powerpoint',
        'XLS': 'excel',
        'XLSX': 'excel'
    };
    return icons[type] || 'alt';
}

function downloadMaterial(materialName, courseCode) {
    // Simulate download
    alert(`Downloading: ${materialName} from ${courseCode}\n\nIn a real application, this would download the file.`);
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
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Add animation class based on position
                const rect = entry.target.getBoundingClientRect();
                if (rect.left < window.innerWidth / 2) {
                    entry.target.style.animation = 'fadeInLeft 0.6s ease-out forwards';
                } else {
                    entry.target.style.animation = 'fadeInRight 0.6s ease-out forwards';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.sidebar-section, .footer-section, .department-card, .team-member');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // Animate on scroll for specific sections
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.welcome-section');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
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
// Department Section Functionality
// ============================================
function initDepartments() {
    const expandButtons = document.querySelectorAll('.expand-btn');
    const searchInput = document.getElementById('departmentSearch');
    const filterSelect = document.getElementById('departmentFilter');
    const departmentCards = document.querySelectorAll('.department-card-enhanced');

    // Expand/Collapse functionality with smooth animation
    expandButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.department-card-enhanced');
            const isExpanding = !card.classList.contains('expanded');
            
            // Toggle expanded class
            card.classList.toggle('expanded');
            
            // Update button text and icon with animation
            const icon = this.querySelector('i');
            
            if (isExpanding) {
                // Expanding - update content
                icon.style.transform = 'rotate(180deg)';
                this.innerHTML = '<i class="fas fa-chevron-down" style="transform: rotate(180deg);"></i> Hide Details';
                this.setAttribute('aria-expanded', 'true');
                
                // Add expanding animation
                card.style.animation = 'expandCard 0.5s ease-out';
            } else {
                // Collapsing - update content
                this.innerHTML = '<i class="fas fa-chevron-down"></i> View Details';
                this.setAttribute('aria-expanded', 'false');
                
                // Add collapsing animation
                card.style.animation = 'collapseCard 0.5s ease-out';
                
                // Smooth scroll to card top when collapsing
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                card.style.animation = '';
            }, 500);
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterDepartments(searchTerm, filterSelect ? filterSelect.value : 'all');
        });
    }

    // Filter functionality
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterDepartments(searchTerm, this.value);
        });
    }

    function filterDepartments(searchTerm, category) {
        let visibleCount = 0;
        
        departmentCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardText = card.textContent.toLowerCase();
            
            const matchesSearch = cardText.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCategory === category;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'flex';
                visibleCount++;
                // Add fade-in animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, visibleCount * 50); // Stagger animation
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });

        // Show message if no results found
        const visibleCards = Array.from(departmentCards).filter(card => 
            card.style.display !== 'none'
        );
        
        if (visibleCards.length === 0) {
            showNoResultsMessage();
        } else {
            removeNoResultsMessage();
        }
    }

    function showNoResultsMessage() {
        removeNoResultsMessage(); // Remove existing message first
        const grid = document.querySelector('.departments-grid');
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <i class="fas fa-search" style="font-size: 3rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">No departments found</h3>
            <p style="color: var(--text-secondary);">Try adjusting your search or filter criteria</p>
        `;
        message.style.cssText = `
            grid-column: 1 / -1;
            text-align: center;
            padding: 3rem;
            background: var(--bg-secondary);
            border-radius: 16px;
            border: 2px dashed var(--border-color);
        `;
        grid.appendChild(message);
    }

    function removeNoResultsMessage() {
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    // Add transition styles for smooth filtering
    departmentCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // Animate cards on page load
    departmentCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
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
    initPasswordToggle();
    initEventModals();
    initAnnouncementModals();
    initCalendar();
    initCourseMaterials();
    initFAQs();
    initGrades();
    initStudentDashboard();
    initContactForm();
    initNewsletterForm();
    initScrollAnimations();
    initAutoResizeInput();
    initEnhancedAnimations();
    initDepartments();
    
    // Add welcome message to console
    console.log('%c🤖 AI Campus Assistant', 'font-size: 20px; color: #1E3A8A; font-weight: bold;');
    console.log('%cWelcome to the Intelligent College Chatbot!', 'font-size: 14px; color: #2563EB;');
});

// ============================================
// Enhanced Animation Features
// ============================================
function initEnhancedAnimations() {
    // Add staggered animation to cards on page load
    const cards = document.querySelectorAll('.event-item, .announcement-item, .sidebar-section');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('button, .clickable, a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
    
    // Add click ripple effect to all buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Smooth appearance for modal windows
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const originalDisplay = modal.style.display;
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Add floating animation to icons
    const icons = document.querySelectorAll('.sidebar-section .fa, .event-icon, .stat-icon i');
    icons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
    
    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = Math.max(0.5, 1 - scrolled / 500);
        }
    });
    
    // Add smooth transitions for theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.style.transition = 'all 0.5s ease';
        });
    }
}

// Add floating animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

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
    hideTypingIndicator,
    toggleFAQ,
    toggleCourseMaterials
};

