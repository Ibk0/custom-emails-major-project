const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const sendEmail = require("./services/email.service");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// This is test api to testing the api
app.get("/", (request, response) => {
  response.json({ status: "sucesss" });
});

app.post("/send-email", (request, response) => {
  try {
    console.log("request: ", request.body);
    sendEmail(request.body)
      .then((data) => {
        return response.status(200).json({ status: true, data: data });
      })
      .catch((error) => {
        console.log("error: ", error);
        return response
          .status(400)
          .json({ status: false, error: error.message });
      });
  } catch (error) {
    return response
      .status(412)
      .json({ status: false, message: "Something went wrong", error: error });
  }
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
