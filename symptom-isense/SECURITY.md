# 🔒 Security Recommendations for Production

## Critical Security Improvements

### 1. OpenAI API Key Protection (HIGH PRIORITY)

**Current Issue**: The OpenAI API key is exposed in the client-side bundle.

**Recommended Solution**: Create a backend proxy

#### Option A: Firebase Cloud Functions (Recommended)
```javascript
// functions/index.js
const functions = require('firebase-functions');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: functions.config().openai.key
});

exports.analyzeSymptoms = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  // Rate limiting check here
  
  const { input } = data;
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: input }
      ]
    });
    
    return { response: response.choices[0].message.content };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

Setup:
```powershell
# Initialize Cloud Functions
firebase init functions

# Set API key
firebase functions:config:set openai.key="YOUR_KEY"

# Deploy
firebase deploy --only functions
```

#### Option B: Custom Backend API
Create a Node.js/Express backend that proxies OpenAI requests with:
- Authentication verification
- Rate limiting
- Request logging
- Cost tracking

### 2. Firebase Security Rules

Update your Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User prompts
      match /prompts/{promptId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
        allow create: if request.auth != null 
          && request.auth.uid == userId
          && request.resource.data.keys().hasAll(['promptText', 'responseText', 'createdAt'])
          && request.resource.data.promptText is string
          && request.resource.data.promptText.size() <= 5000;
      }
      
      // User chats
      match /chats/{chatId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

Deploy rules:
```powershell
firebase deploy --only firestore:rules
```

### 3. Rate Limiting

Implement rate limiting to prevent abuse:

**Client-side (basic)**:
```typescript
// utils/rateLimiter.ts
const RATE_LIMIT = 10; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

export function checkRateLimit(userId: string): boolean {
  const key = `rateLimit_${userId}`;
  const now = Date.now();
  const requests = JSON.parse(localStorage.getItem(key) || '[]');
  
  // Filter requests within window
  const recentRequests = requests.filter(
    (time: number) => now - time < RATE_WINDOW
  );
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  localStorage.setItem(key, JSON.stringify(recentRequests));
  return true;
}
```

**Server-side (recommended)**:
Use Firebase Cloud Functions with rate limiting middleware.

### 4. Content Security Policy (CSP)

Add CSP headers to `firebase.json`:

```json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Content-Security-Policy",
            "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://api.openai.com"
          },
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}
```

### 5. Input Validation & Sanitization

Add validation for user inputs:

```typescript
// utils/inputValidation.ts
export function sanitizeInput(input: string): string {
  // Remove potentially harmful characters
  return input
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function validateSymptomInput(input: string): boolean {
  if (!input || input.length < 10) return false;
  if (input.length > 5000) return false;
  
  // Check for spam patterns
  const spamPatterns = [
    /(.)\1{20,}/,  // Repeated characters
    /https?:\/\//gi,  // URLs
  ];
  
  return !spamPatterns.some(pattern => pattern.test(input));
}
```

### 6. Environment Variables

**Never commit**:
- `.env` file
- API keys
- Service account credentials

**Use**:
- Firebase environment config for production
- GitHub Secrets for CI/CD
- Proper `.gitignore` entries (✅ already configured)

### 7. HTTPS & Authentication

- ✅ Firebase Hosting enforces HTTPS automatically
- ✅ Firebase Authentication handles secure auth flows
- Consider enabling email verification
- Consider implementing 2FA for admin users

### 8. Error Handling

Avoid exposing sensitive information in error messages:

```typescript
// Bad
catch (error) {
  console.error("OpenAI Error:", error);
  alert(error.message); // May expose API details
}

// Good
catch (error) {
  console.error("Error analyzing symptoms");
  alert("Unable to analyze symptoms. Please try again later.");
  // Log detailed errors to a secure logging service
}
```

### 9. Monitoring & Logging

Set up monitoring:
- Firebase Performance Monitoring
- Firebase Crashlytics
- Cloud Logging for functions
- API usage alerts

### 10. Regular Security Audits

```powershell
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Update dependencies
npm update
```

## Priority Actions Before Production

1. **HIGH**: Implement backend proxy for OpenAI API
2. **HIGH**: Set up Firebase Security Rules
3. **MEDIUM**: Add rate limiting
4. **MEDIUM**: Implement input validation
5. **LOW**: Add CSP headers
6. **LOW**: Set up monitoring

## Resources

- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/safety-best-practices)
- [OWASP Security Guidelines](https://owasp.org/www-project-web-security-testing-guide/)

---

**Note**: Security is an ongoing process. Regularly review and update these measures.
