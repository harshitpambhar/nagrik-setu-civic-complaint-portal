# Nagrik Setu – Smart Civic Portal

Nagrik Setu is a comprehensive civic complaint management system that bridges the gap between citizens and local government authorities. The platform enables citizens to report civic issues, track their resolution, and contribute to better city governance.

## Features
- **User Registration & Login**: Citizens can register and log in to manage their complaints.
- **Complaint Submission**: Easy-to-use form for submitting civic complaints with details and photo uploads.
- **Real-time Tracking**: Track the status of complaints and receive updates on progress and resolution.
- **Email Notifications**: Get notified about complaint status changes and resolutions.
- **Analytics & Reports**: Access reports on complaint resolution times and department performance.
- **Direct Communication**: Communicate directly with government officials for faster resolution.
- **Password Reset**: Forgot password functionality for account recovery.
- **Responsive UI**: Modern, mobile-friendly design with smooth navigation and animations.

## Project Structure
```
├── about.html
├── app.py
├── connect.php
├── contact.html
├── coplaintbuttoncss.txt
├── faq.html
├── index.html
├── login.html
├── official-login.html
├── register-complaint.html
├── register.html
├── script.js
├── style.css
├── track-complaint.html
├── nakriksetuflask/
├── register-js/
│   ├── connection.js
│   └── validation.js
```

## Key Files
- `index.html` – Home page with slogan typing animation, features, and impact sections
- `register.html` – Citizen registration form
- `login.html` – Login form with "Forgot Password" option
- `forgetpassword.html` – Password reset form
- `register-complaint.html` – Submit a new complaint
- `track-complaint.html` – Track complaint status
- `script.js` – JavaScript for UI enhancements, slogan animation, validation, and notifications
- `style.css` – Main stylesheet for layout and design
- `register-js/validation.js` – Additional form validation logic
- `register-js/connection.js` – Handles API or backend connections

## How to Run
1. Place the project folder in your web server directory (e.g., `htdocs` for XAMPP).
2. Start your web server (Apache, etc.).
3. Open `index.html` in your browser: `http://localhost/nagriksetuproject/index.html`

## Customization
- Update slogans for the typing animation in `script.js`.
- Adjust styles in `style.css` for branding.
- Backend integration can be done via `connect.php` or `app.py` as needed.

## Credits
- Made with ❤️ in India
- UI inspired by modern civic engagement platforms

---
For any issues or suggestions, please open an issue or contact the project maintainer.
