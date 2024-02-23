const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.post("/upload", function (req, res) {
    console.log('req.body', req.body);
  const params = new URLSearchParams({
    secret: "6Lcmr3spAAAAAGgMPFelCgj7pJlpWZoT8zWB64bd",
    response: req.body["g-recaptcha-response"],
    remoteip: req.ip,
  });

  fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        res.json({ captchaSuccess: true });
      } else {
        res.json({ captchaSuccess: false });
      }
    })
    .catch((err) => console.log("err", err));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
