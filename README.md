# 🎓 Academic Portal Assistant - University Information System

A sophisticated, professional web-based chatbot UI designed specifically for educational institutions. Features an elegant academic theme with comprehensive functionality and responsive design inspired by traditional university aesthetics.

## ✨ Features

### 🎨 Design
- **Professional Academic UI/UX**: Refined, sophisticated, and timeless academic design
- **University Color Palette**: 
  - Oxford Navy (#002147) - Primary brand color
  - Academic Burgundy (#8B1538) - Accent color
  - Academic Gold (#C5A572) - Highlight color
  - Professional Teal & Slate for complementary elements
- **Premium Effects**: Elegant shadows, refined borders, and sophisticated gradients
- **Typography**: 
  - Inter font family for body text and UI elements
  - Crimson Pro serif font for headings (traditional academic feel)
  - Optimized for readability with proper line-height and letter-spacing

### 🌓 Dark Mode
- Toggle between light and dark themes
- Persistent theme preference saved in localStorage
- Smooth transitions between modes

### 💬 Chat Interface
- Real-time chat simulation with typing indicators
- User and bot message bubbles with distinct styling
- Smooth animations for message appearance
- Pre-built responses for common queries:
  - Admission Process
  - Course Details
  - Fee Structure
  - Exam Schedule
  - Faculty Information
  - Placement Details

### 🎤 Voice Input
- Speech recognition support (Chrome/Edge)
- Voice-to-text input for accessibility

### 📱 Responsive Design
- Fully responsive for mobile, tablet, and desktop
- Mobile-friendly navigation menu
- Optimized layouts for all screen sizes

### 🎯 Quick Suggestions
- 6 quick action buttons for common queries
- One-click access to frequently asked questions

### 📊 Sidebar Features
- Student Dashboard
- Announcements with badges
- Upcoming Events calendar
- Academic Calendar link
- FAQs section

### 🔗 Navigation
- Sticky header with smooth scroll
- Active link highlighting
- Mobile hamburger menu

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- No server setup required - runs locally

### Installation

1. Clone or download the project files
2. Ensure you have these files in the same directory:
   - `index.html`
   - `styles.css`
   - `script.js`

3. Open `index.html` in your web browser

That's it! No build process or dependencies required.

## 📁 File Structure

```
chatbot/
│
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and responsive design
├── script.js       # Chat functionality and interactions
└── README.md       # Documentation
```

## 🎮 Usage

### Starting a Conversation
1. Click on any quick suggestion button, or
2. Type your question in the input box
3. Press Enter or click the send button

### Using Voice Input
1. Click the microphone icon
2. Allow microphone access
3. Speak your query
4. The text will appear in the input box

### Switching Themes
- Click the moon/sun icon in the header to toggle dark mode

### Mobile Navigation
- On mobile devices, tap the hamburger menu to access navigation links

## 🎨 Customization

### Colors
Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-blue: #1E3A8A;
    --primary-blue-light: #2563EB;
    --accent-blue: #3B82F6;
    /* Add your custom colors */
}
```

### Bot Responses
Modify the `botResponses` object in `script.js`:

```javascript
const botResponses = {
    yourCategory: {
        keywords: ['keyword1', 'keyword2'],
        response: 'Your custom response here'
    }
};
```

### College Information
Update the footer section in `index.html` with your institution's details:
- Contact email
- Phone number
- Address
- Social media links

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox, grid, and animations
- **Vanilla JavaScript**: No frameworks required
- **Font Awesome 6**: Icons
- **Google Fonts**: Inter font family

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ⚠️ Voice input requires Chrome or Edge

## 🔧 Features Breakdown

### Implemented
- ✅ Modern, clean UI
- ✅ Dark mode toggle
- ✅ Responsive design
- ✅ Chat functionality with typing indicator
- ✅ Quick suggestion buttons
- ✅ Voice input support
- ✅ Smooth animations
- ✅ Mobile navigation
- ✅ Pre-built knowledge base

### Future Enhancements
- 🔄 Backend integration for real AI responses
- 🔄 User authentication
- 🔄 Chat history persistence
- 🔄 File upload support
- 🔄 Multi-language support
- 🔄 Advanced analytics

## 📝 License

This project is open source and available for educational purposes.

## 👥 Contributing

Feel free to fork this project and customize it for your institution's needs!

## 📧 Support

For questions or issues, refer to the FAQ section in the sidebar or contact the development team.

---

**Built with ❤️ for educational excellence**
