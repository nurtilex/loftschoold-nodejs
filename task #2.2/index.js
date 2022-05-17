require('dotenv').config();

const { STEP } = process.env;

const myFunction = (from, to, bool) => {
  const step = +STEP;
  let start = from;
  const end = to;
  const getUTC = () => new Date().toUTCString();
  return new Promise((resolve, reject) => {
    const intervalID = setInterval(() => {
      if (start === from) { console.log('start'); }
      if (start > end) {
        console.log(getUTC());
        start -= step;
        return;
      }

      console.log('end');
      clearInterval(intervalID);
      resolve(getUTC());
    }, step);
  });
};

myFunction(10000, 0).then(() => console.log('Success'));
