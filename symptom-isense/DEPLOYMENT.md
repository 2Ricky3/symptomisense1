# SymptomSense - Deployment Guide

## Pre-Deployment Checklist ✅

### 1. Environment Setup
- ✅ `.env.example` created with template values
- ⚠️ Ensure your `.env` file has valid API keys
- ✅ `.env` is in `.gitignore` (API keys not committed)

### 2. Code Quality
- ✅ All inline styles replaced with Tailwind classes
- ✅ Debug console.log statements removed
- ✅ ESLint errors fixed
- ✅ TypeScript compilation checked

### 3. Build Configuration
- ✅ Vite config optimized for production
- ✅ Code splitting configured for better performance
- ✅ Firebase hosting config updated
- ✅ SEO meta tags added to index.html

## Deployment Steps

### Option 1: Firebase Hosting (Recommended)

#### Initial Setup
```powershell
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init hosting
# Select your Firebase project
# Set public directory to: dist
# Configure as SPA: Yes
# Set up automatic builds: No
```

#### Deploy
```powershell
# Navigate to project directory
cd symptom-isense

# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

### Option 2: Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 3: Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy
netlify deploy

# For production
netlify deploy --prod
```

## Environment Variables Setup

### For Firebase Hosting
1. Add environment variables in Firebase Console
2. Or use `.env` file during build (variables are baked into the build)

### For Vercel/Netlify
1. Add environment variables in their respective dashboards
2. Use the same variable names from `.env.example`

## Required Environment Variables
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_OPENAI_API_KEY
```

## Build Commands

### Development
```powershell
npm run dev
```

### Production Build
```powershell
npm run build
```

### Preview Production Build
```powershell
npm run preview
```

### Linting
```powershell
npm run lint
```

## Post-Deployment Checklist

- [ ] Test all main features (login, symptom checker, profile)
- [ ] Verify Firebase authentication works
- [ ] Test OpenAI API integration
- [ ] Check responsive design on mobile devices
- [ ] Test PDF download functionality
- [ ] Verify all routes work correctly (SPA routing)
- [ ] Check browser console for errors
- [ ] Test performance with Lighthouse

## Performance Optimization

The build is optimized with:
- ✅ Code splitting (React, Firebase, UI vendors)
- ✅ Minification with Terser
- ✅ Cache headers for static assets
- ✅ Lazy loading for pages
- ✅ Tree shaking for unused code

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit `.env` file to version control
- Use Firebase Security Rules to protect your database
- Implement rate limiting for OpenAI API calls
- The OpenAI key is exposed in the client (consider using a backend proxy for production)

## Troubleshooting

### Build Fails
```powershell
# Clean install dependencies
rm -r node_modules
rm package-lock.json
npm install
npm run build
```

### Environment Variables Not Working
- Ensure variable names start with `VITE_`
- Restart dev server after changing `.env`
- For production, rebuild the project

### Firebase Deployment Issues
```powershell
# Check Firebase project
firebase projects:list

# Switch project if needed
firebase use [project-id]

# Clear cache and redeploy
firebase deploy --only hosting --force
```

## Support

For issues or questions, please check the repository issues or create a new one.

---

**Note**: This application is for educational purposes. Always consult healthcare professionals for medical advice.
