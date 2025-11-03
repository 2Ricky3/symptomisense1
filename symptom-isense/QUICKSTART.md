# 🚀 Quick Start - Deploy SymptomSense in 5 Minutes

## Prerequisites
- Node.js installed (v18 or higher)
- Firebase account
- OpenAI API key

## Step 1: Environment Setup (2 minutes)

1. Copy the example environment file:
```powershell
cp .env.example .env
```

2. Edit `.env` and add your API keys:
   - Get Firebase config from [Firebase Console](https://console.firebase.google.com)
   - Get OpenAI key from [OpenAI Platform](https://platform.openai.com/api-keys)

## Step 2: Install Dependencies (1 minute)

```powershell
npm install --legacy-peer-deps
```

## Step 3: Test Locally (30 seconds)

```powershell
npm run dev
```

Visit: http://localhost:5173

## Step 4: Build for Production (30 seconds)

```powershell
npm run build
```

## Step 5: Deploy to Firebase (1 minute)

### First Time Setup
```powershell
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (choose existing project)
firebase init hosting
# Select: dist as public directory
# Select: Yes for SPA
```

### Deploy
```powershell
firebase deploy --only hosting
```

## ✅ Done!

Your app is now live at: `https://YOUR-PROJECT-ID.web.app`

## Alternative: Deploy to Vercel

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Go to production
vercel --prod
```

## Alternative: Deploy to Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
npm run build
netlify deploy --prod --dir=dist
```

## Troubleshooting

### Build fails?
```powershell
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Environment variables not working?
- Ensure they start with `VITE_`
- Restart the dev server
- For production, rebuild: `npm run build`

### Firebase deployment fails?
```powershell
firebase use --add  # Select your project
firebase deploy --only hosting
```

## Next Steps

1. ✅ Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
2. ⚠️ Read [SECURITY.md](./SECURITY.md) for production security
3. 📖 Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide

## Need Help?

- Check the Issues tab
- Review documentation files
- Test locally first with `npm run dev`

---

**Estimated Total Time**: ~5 minutes (after obtaining API keys)
