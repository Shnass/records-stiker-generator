// src/server.js
import app from './app.js';

const PORT = process.env.PORT || 3833;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});