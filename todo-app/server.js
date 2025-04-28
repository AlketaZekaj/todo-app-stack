const express = require('express');
const app = express();
const port = 80;

app.use(express.static('.'));

app.listen(port, () => {
  console.log(`Todo app frontend running at http://localhost:${port}`);
});
