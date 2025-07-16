# Chatbot Admin Interface Guide

## 🔐 Access

**URL:** `https://yoursite.com/admin/chatbot`
**Password:** `marrickville2024`

## 📋 Features Overview

### Quick Questions Management
- **Purpose:** Manage the preloaded question buttons that appear when users first open the chatbot
- **Features:**
  - Add/remove quick question buttons
  - Edit button text (what users see)
  - Edit the actual question sent to the chatbot
  - Changes apply immediately to the live chatbot

### Knowledge Base Management
- **Purpose:** Manage the AI's responses to different types of questions
- **Features:**
  - Organize responses by category
  - Manage keywords that trigger each response
  - Edit response text with markdown formatting support
  - Add/remove follow-up questions
  - Full CRUD operations (Create, Read, Update, Delete)

## 🚀 How to Use

### Adding a Quick Question
1. Go to "Quick Questions" tab
2. Click "Add Question"
3. Enter button text (e.g., "💰 Pricing Info")
4. Enter the question text (e.g., "What are your pricing options?")
5. Click "Save Changes"

### Managing Knowledge Base Entries
1. Go to "Knowledge Base" tab
2. Click "Add Entry" for new responses
3. For each entry:
   - **Category:** Organize responses (e.g., "Pricing", "Schedule")
   - **Keywords:** Words that trigger this response
   - **Response:** The chatbot's answer (supports formatting)
   - **Follow-up:** Optional questions to continue conversation

### Adding Keywords
1. In any knowledge base entry
2. Type keyword in the input field
3. Press Enter or click "+" button
4. Click on any keyword badge to remove it

### Follow-up Questions
1. Use the follow-up section to add conversation starters
2. These appear randomly after the main response
3. Helps keep conversations flowing naturally

## 💾 Backup & Migration

### Export Data
- Click "Export" to download your configuration as JSON
- Includes all quick questions and knowledge base entries
- Use for backups or moving between environments

### Import Data
- Click "Import" to restore from a JSON file
- Overwrites current configuration
- Useful for restoring backups or deploying updates

## ⚡ Live Updates

- All changes apply **immediately** to the live chatbot
- No server restart required
- Users will see new questions and responses right away
- Test changes by opening the chatbot after saving

## 🛡️ Security

- Password-protected interface
- Data stored in browser localStorage
- Admin access persists until logout
- Always logout when finished editing

## 📝 Best Practices

### Quick Questions
- Keep button text short and descriptive
- Use emojis to make buttons more appealing
- Cover the most common user questions
- Limit to 6-8 questions for best UX

### Knowledge Base
- Use descriptive category names
- Include variations of keywords (singular/plural, synonyms)
- Write responses in a friendly, helpful tone
- Test responses by asking the chatbot questions
- Include formatting with **bold** and bullet points for readability

### Keywords Strategy
- Include common misspellings
- Add both formal and casual terms
- Think about how users actually ask questions
- Test with real user questions

## 🔧 Troubleshooting

**Changes not appearing:**
- Make sure you clicked "Save Changes"
- Refresh the chatbot to see updates
- Check browser console for errors

**Login issues:**
- Verify password: `marrickville2024`
- Clear browser cache if needed
- Check URL is correct: `/admin/chatbot`

**Lost data:**
- Check if you have an export backup
- Data is stored in browser localStorage
- Clearing browser data will reset configuration

## 📞 Support

For technical issues or questions about the admin interface, the system automatically falls back to default responses if there are any errors with the configuration.
