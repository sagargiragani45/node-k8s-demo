const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello from Node.js app running on Kubernetes 🚀</h1>');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

