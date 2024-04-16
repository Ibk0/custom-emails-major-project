const nodemailer = require("nodemailer");

function sendEmail(userData) {
  console.log("userdata: ", userData);
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    // html templates for email design.
    let html;
    if (userData.template === "promotional") {
      html = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exclusive Offer from ${userData.companyName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
          }
      
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
      
          .header h1 {
            color: #ff5851;
            font-size: 24px;
            margin-top: 0;
          }
      
          .offer-image {
            width: 100%;
            max-width: 100%;
            height: auto;
            display: block;
            margin: 20px auto;
          }
      
          .cta-button {
            display: block;
            background-color: #ff5851;
            color: #ffffff;
            text-decoration: none;
            padding: 15px 20px;
            border-radius: 5px;
            text-align: center;
            margin: 20px auto;
            font-size: 18px;
          }
      
          .footer {
            text-align: center;
            margin-top: 40px;
          }
      
          .footer p {
            color: #666666;
          }
        </style>
      </head>
      
      <body>
        <div class="container">
          <div class="header">
            <img src=${userData.companyLogo} alt="Zomato Logo" style="max-width: 150px;">
            <h1>Get ${userData.offPercentage} % Off on Your Next Purchase!</h1>
            <p>Use code ${userData.couponCode} at checkout</p>
          </div>
          <img class="offer-image" src=${userData.offerImage} alt="Food Offer">
          <a class="cta-button" href="https://www.google.com/">Get Now</a>
          <div class="footer">
            <p>${userData.message}</p>
            <p>&copy; 2024 ${userData.companyName}. All rights reserved.</p>
          </div>
        </div>
      </body>
      
      </html>
      `;
    } else if (userData.template === "educational") {
      html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unlock Your Potential with ${userData.companyName}!</title>
          <style>
              /* Styles for email */
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f7f7f7;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header h1 {
                  color: #4a90e2;
                  font-size: 24px;
                  margin-top: 0;
              }
              .course-image {
                  width: 100%;
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 20px auto;
              }
              .cta-button {
                  display: block;
                  background-color: #4a90e2;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 15px 20px;
                  border-radius: 5px;
                  text-align: center;
                  margin: 20px auto;
                  font-size: 18px;
              }
              .footer {
                  text-align: center;
                  margin-top: 40px;
              }
              .footer p {
                  color: #666666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="${userData.companyLogo}" alt="${
        userData.companyName
      } Logo" style="max-width: 150px;">
                  <h1>Advance Your Career with ${userData.companyName}!</h1>
                  <p>Explore our industry-relevant courses.</p>
              </div>
              <img class="course-image" src="${
                userData.offerImage
              }" alt="Course Offer">
              <a class="cta-button" href="https://www.${userData.companyName.toLowerCase()}.com/">Discover Courses</a>
              <div class="footer">
                  <p>${userData.message}</p>
                  <p>&copy; 2024 ${
                    userData.companyName
                  }. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>      
      `;
    } else if (userData.template === "marketing") {
      html = `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${userData.emailTitle}</title>
          <style>
              /* Styles for email */
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f9f9f9;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .header h1 {
                  color: #333333;
                  font-size: 24px;
                  margin-top: 0;
              }
              .product-image {
                  width: 100%;
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 20px auto;
              }
              .cta-button {
                  display: block;
                  background-color: #ff3c6c;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 15px 20px;
                  border-radius: 5px;
                  text-align: center;
                  margin: 20px auto;
                  font-size: 18px;
              }
              .footer {
                  text-align: center;
                  margin-top: 40px;
              }
              .footer p {
                  color: #666666;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="${userData.companyLogo}" alt="${userData.companyName} Logo" style="max-width: 150px;">
                  <h1>${userData.emailHeading}</h1>
                  <p>${userData.emailMessage}</p>
              </div>
              <img class="product-image" src="${userData.productImage}" alt="Featured Product">
              <a class="cta-button" href="${userData.shopLink}">Shop Now</a>
              <div class="footer">
                  <p>${userData.footerMessage}</p>
                  <p>&copy; 2024 ${userData.companyName}. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
      `;
    }

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: userData.to,
      subject: userData.subject,
      text: userData.text,
      html: html,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error: ", error);
        reject(error);
      } else {
        console.log("mailer response: ", info.response);
        resolve(info.response);
      }
    });
  });
}

module.exports = sendEmail;
