const express = require('express');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
  try {
    const message = {
      ...req.body,
      timestamp: new Date().toISOString()
    };
    
    let messages = [];
    try {
      const data = await fs.readFile('messages.json', 'utf8');
      messages = JSON.parse(data);
    } catch (err) {
      // File doesn't exist yet
    }
    
    messages.push(message);
    await fs.writeFile('messages.json', JSON.stringify(messages, null, 2));
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
