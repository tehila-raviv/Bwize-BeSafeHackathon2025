import express from 'express';
//import path from 'path';
//import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { parse } from 'cookie';

import { readFileSync } from 'fs';
const chatStates = JSON.parse(readFileSync('./chatFlow.json', 'utf-8'));


// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for requests from the client
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Only allow requests from the CLIENT_URL
    credentials: true, // Include cookies in CORS requests
  })
);

// Set up session management
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use secret from .env for session security
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,  // Helps to prevent client-side access to the cookie
      secure: process.env.NODE_ENV === 'production',  // Set to true in production (https)
    },
  })
);

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to protect routes
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};

// Authentication routes
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent', // Force the user to re-authenticate even if their session is still valid
  })
);


app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/home`);
  }
);

// Test route for authenticated users
app.get('/profile', isAuthenticated, (req, res) => {
  res.json(req.user); // Send user profile if authenticated
});

// Logout route (Adjusted)
app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout failed' });

    // Clear session and cookies
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // Clear session cookie

      // Important: CORS headers must be applied before redirect
      res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL); // Ensure CORS headers are set here
      res.setHeader('Access-Control-Allow-Credentials', 'true');  // Allow credentials

      // Redirect to the client app after logout
      res.status(200).json({ message: 'Logged out successfully' }).end();
    });
  });
});



// Chat route 
app.get('/chat', isAuthenticated, (req, res) => {
  res.send('<h1>Chat</h1><p>This is the chat page.</p>'); // For now, this works
});




// נתיב API
app.post('/InputHandling', (req, res) => {
    try {
        // 1. שליפת המידע מהבקשה
        const cookies = parse(req.headers.cookie || ''); // קבלת המידע מהעוגיות
        const currentState = cookies.currentState; // מצב ברירת מחדל
        const { userResponse } = req.body  ; // תגובת המשתמש מהבקשה


        // 2. מציאת המצב הבא
        let nextStateKey = currentState; // נשאר במצב הנוכחי כברירת מחדל
        const currentResponses = chatStates.states[currentState]?.responses;

        if (currentResponses) {
            for (const option in currentResponses) {
                if (currentResponses[option].userResponse === userResponse) {
                    nextStateKey = currentResponses[option].next; // שינוי המצב הבא
                    break; // עצירת הלולאה
                }
            }
        }


        // 3. שליפת המצב הבא מהנתונים
        const nextState = chatStates.states[nextStateKey];

        // אם זה מצב סיום
        if (nextState?.end) {
            return res.status(200).json({
                message: '',
                nextState: nextStateKey,
                userChoices: [],
                end: true, // אינדיקציה שהצ'אט הסתיים
            });
        }

        // 4. יצירת תגובת הבוט
        const botMessage = nextState?.message || 'Something went wrong!';
        const botEmotion = nextState?.emotion || 'no emotion';
        const clue = nextState?.clue || 'no clue';
        const userChoices = nextState?.responses
            ? Object.values(nextState.responses).map((response) => ({
                text: response.userResponse, // הטקסט של הבחירה
                score: response.score || 0   // הציון של הבחירה (ברירת מחדל 0 אם אין)
            }))
            : [];

        // 5. החזרת התגובה ללקוח
        res.status(200).json({
            message: botMessage,
            emotion: botEmotion,
            clue: clue,
            nextState: nextStateKey,
            userChoices,
        });
    } catch (error) {
        console.error('Error handling chat input:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Chat review route
app.get('/chat/review', isAuthenticated, (req, res) => {
  res.send('<h1>Chat Review</h1><p>This is the review page.</p>'); // Static response for now
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
