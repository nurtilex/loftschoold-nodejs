const express = require('express');
require('dotenv').config();

const app = express();
const PORT = 3334;
const { STEP, INTERVAL } = process.env;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  let [interval, step] = [+INTERVAL, +STEP];
  const getUTC = () => new Date().toUTCString();

  console.log('start');
  const intervalID = setInterval(() => {
    if (interval > 0) {
      console.log(getUTC());
      interval -= step;
      return;
    }

    console.log('end');
    clearInterval(intervalID);
    res.send(getUTC());
  }, step);
});

app.listen(PORT, () => {
  console.log('Application listening on port 3334!');
});
