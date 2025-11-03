# 🏥 SymptomiSense

SymptomiSense is a modern symptom tracking and health monitoring application built with TypeScript. It helps users track their health symptoms, identify patterns, and maintain a comprehensive health journal.

## 📌 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Security](#security)
- [Why SymptomiSense?](#why-symptomisense)
- [Future Improvements](#future-improvements)
- [Peer Reviews & User Tests](#peer-reviews--user-tests)
- [Author](#author)

## ✨ Features
- 📊 Track symptoms over time
- 📝 Detailed health journal entries
- 🎨 Clean, intuitive user interface
- 🔄 Real-time data syncing
- 📱 Responsive design for all devices
- 🔐 Secure user authentication
- 📈 Visualize symptom patterns and trends
- 🗓️ Date view for historical tracking
- 💾 Export your health data
- ✏️ **Full CRUD functionality** - Create, Read, Update, and Delete symptom entries

## 🛠️ Tech Stack

### Languages
- **TypeScript** (95.7%)
- **CSS** (2.3%)
- **HTML** (1.1%)
- **JavaScript** (0.9%)

### Frameworks & Libraries
- **React** - Frontend framework
- **Vite** - Build tool and development server
- **Firebase** - Backend and authentication
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation and routing
- **Chart.js / Recharts** - Data visualization

### Hosting & Deployment
- **Vercel** - Cloud hosting and continuous deployment

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/2Ricky3/symptomisense1.git
cd symptom-isense
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Firebase Setup

#### 3.1 Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Give your project a name (e.g., "SymptomiSense")

#### 3.2 Enable Authentication
1. In your Firebase project, navigate to **Authentication** in the left sidebar
2. Click "Get started"
3. Enable the following sign-in methods:
   - **Email/Password** - Toggle to enable
   - **(Optional) Google Sign-in** - For social authentication
4. Click "Save"

#### 3.3 Create Firestore Database
1. Navigate to **Firestore Database** in the left sidebar
2. Click "Create database"
3. Choose "Start in production mode" or "Test mode" (for development)
4. Select your preferred database location
5. Click "Enable"

#### 3.4 Get Firebase Configuration
1. In your Firebase project, click the **gear icon** ⚙️ next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the **Web icon** (</>)
5. Register your app with a nickname (e.g., "SymptomiSense Web")
6. Copy the Firebase configuration object

### 4. Environment Setup
Create a `.env` file in the root directory and add your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**⚠️ Important**: Never commit your `.env` file to version control. Make sure `.env` is listed in your `.gitignore` file.

### 5. Firebase Security Rules (Optional but Recommended)
Update your Firestore security rules to protect user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🏃 Running the App

### Development Mode
```bash
npm run dev
# or
yarn dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Production Build
```bash
npm run build
npm start
```

### Deploy
The app is configured for Vercel deployment. Simply push to your main branch or use:
```bash
vercel deploy
```

## 🔒 Security
- **Authentication**: Secure user login and registration via Firebase Auth
- **Data Privacy**: User health data is encrypted and protected
- **Secure Storage**: All sensitive information is stored securely in Firestore
- **HIPAA Considerations**: Built with healthcare data privacy in mind
- **Environment Variables**: Sensitive credentials stored in environment variables

## 🎯 Why SymptomiSense?
Managing your health shouldn't be complicated. SymptomiSense helps you:

- **Track patterns**: Identify triggers and patterns in your symptoms
- **Stay organized**: Keep all health information in one place
- **Share safely**: Export data to share with healthcare providers
- **Gain insights**: Visualize your health journey over time
- **Take control**: Make informed decisions about your wellbeing

## 🌐 Live Demo
Check out the live application: [https://symptomisense1.vercel.app](https://symptomisense1.vercel.app)

## 🎥 Demonstrative Video
Watch the full walkthrough and demonstration of SymptomiSense:

[📺 View Demo Video on Google Drive](https://drive.google.com/drive/folders/1gXCJxn_JgE2pg9_t2RTL-QZFVbYwkXSI?usp=sharing)

The video covers:
- User registration and authentication
- Creating and tracking symptoms
- Using the dashboard and analytics
- Editing and deleting entries
- Exporting health data

## 🙏 Acknowledgments, Highlights & Challenges

### Acknowledgments
- Online developer communities for technical support and guidance
- Healthcare professionals who provided insights into symptom tracking needs
- Beta testers who helped refine the user experience

### Highlights
- Built a fully responsive, cross-platform web application
- Implemented secure authentication and data protection
- Created an intuitive interface for health tracking
- Deployed seamlessly on Vercel with continuous integration
- TypeScript for type safety and better code quality
- Full CRUD operations for comprehensive data management

### Challenges
- **Data Privacy**: Ensuring healthcare data is handled securely and ethically
- **User Experience**: Balancing feature richness with simplicity
- **Performance**: Optimizing for fast load times and smooth interactions
- **Data Visualization**: Creating meaningful and easy-to-understand health insights
- **Accessibility**: Making the app usable for all users, including those with disabilities


### Mockups
<img width="1920" height="1440" alt="201shots_so" src="https://github.com/user-attachments/assets/b96a2101-2c9d-4fd1-9ff4-bd2b6d65d96e" />
<img width="1920" height="1440" alt="327shots_so" src="https://github.com/user-attachments/assets/4d5a0cf2-0fa8-46f3-b6d8-4cf08e991b5a" />
<img width="1920" height="1440" alt="772shots_so" src="https://github.com/user-attachments/assets/f92fc88c-1dc1-4107-b69e-f3a76415d5a2" />
<img width="1920" height="1440" alt="443shots_so" src="https://github.com/user-attachments/assets/5b542af6-726b-4153-9858-199b59a4e44f" />
<img width="1920" height="1440" alt="872shots_so" src="https://github.com/user-attachments/assets/67369cf3-8424-4456-a575-582492f4f266" />
<img width="1920" height="1440" alt="371shots_so" src="https://github.com/user-attachments/assets/9e0d4933-2aa0-44a9-bd2a-7c413e4f2d33" />


## 🚀 Future Improvements
SymptomiSense is continuously evolving. Planned enhancements include:

- 📊 **Advanced Analytics**: AI-powered insights and pattern recognition
- 📱 **Mobile App**: Native iOS and Android applications
- 🔔 **Smart Reminders**: Medication and symptom tracking reminders
- 👥 **Care Team Sharing**: Securely share data with doctors and caregivers
- 🌍 **Multi-language Support**: Accessibility for users worldwide
- 📸 **Photo Documentation**: Attach photos to symptom entries
- 🤖 **AI Assistant**: Intelligent symptom analysis and recommendations
- ⚡ **Offline Mode**: Track symptoms without internet connection

## 🧪 Peer Reviews & User Tests

### Overview
SymptomiSense underwent extensive peer review and user testing to ensure quality, usability, and effectiveness in real-world scenarios.

### Testing Methodology
- **Peer Code Reviews**: Code quality and best practices assessment
- **User Acceptance Testing (UAT)**: Real users testing core functionality
- **Usability Testing**: Interface intuitiveness and user experience evaluation
- **Performance Testing**: Load times and responsiveness checks
- **Security Audits**: Authentication and data protection verification

### Key Feedback Areas
- ✅ User interface and navigation
- ✅ Feature completeness and functionality
- ✅ Data visualization clarity
- ✅ Mobile responsiveness
- ✅ Performance and loading times
- ✅ Security and privacy concerns

### Screenshots & Results
<img width="690" height="579" alt="Screenshot 2025-11-03 162826" src="https://github.com/user-attachments/assets/5385d798-851a-4852-bcfc-90e28cb2f5c8" />
<img width="690" height="738" alt="Screenshot 2025-11-03 162859" src="https://github.com/user-attachments/assets/c3159d92-86f5-4c5c-a07e-055beec41807" />
<img width="685" height="441" alt="Screenshot 2025-11-03 162925" src="https://github.com/user-attachments/assets/ca9f2664-ef58-4e2a-b226-c90ee767ad51" />

---

**Test Participants**: 4 users participated in testing phases
**Overall Satisfaction**: 4.2 Star

## 👨‍💻 Author
Developed by **Ricard Oosthuizen** ([@2Ricky3](https://github.com/2Ricky3))

---

💙 Built with care for better health tracking

*For issues, feature requests, or contributions, please visit the [GitHub repository](https://github.com/2Ricky3/symptomisense1)*
