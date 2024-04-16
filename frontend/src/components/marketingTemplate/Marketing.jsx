import { useState } from "react";
import "./marketingStyle.css";

const Marketing = () => {
  const [addModal, setModal] = useState(false);
  const userData = {
    to: "user1@gmail.com, user2@gmail.com",
    subject: "Marketing email",
    companyName: "Zomato",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
    offPercentage: 25,
    couponCode: "ZOM25",
    footerMessage: "Savor Every Bite with Zomato.",
    productImage:
      "https://static.startuptalky.com/2021/07/Zomato-on-time-or-free-StartupTalky.jpg",
    emailTitle: "Taste the Excitement: Exclusive Offer Inside!",
    emailHeading: "Delectable Deals Await You!",
    emailMessage:
      "Dear Foodie, Your cravings are about to be rewarded! Indulge in a world of flavors with Zomato's exclusive offer. Use code ZOM25 to enjoy a mouthwatering 25% off on your next order. Hurry, satisfy your hunger now!",
    shopLink: "https://www.zomato.com/",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const initialFormData = {
    to: "user1@gmail.com, user2@gmail.com",
    subject: "Marketing email",
    companyName: "Zomato",
    companyLogo:
      "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
    offPercentage: 25,
    couponCode: "ZOM25",
    footerMessage: "Savor Every Bite with Zomato.",
    productImage:
      "https://static.startuptalky.com/2021/07/Zomato-on-time-or-free-StartupTalky.jpg",
    emailTitle: "Taste the Excitement: Exclusive Offer Inside!",
    emailHeading: "Delectable Deals Await You!",
    emailMessage:
      "Dear Foodie, Your cravings are about to be rewarded! Indulge in a world of flavors with Zomato's exclusive offer. Use code ZOM25 to enjoy a mouthwatering 25% off on your next order. Hurry, satisfy your hunger now!",
    shopLink: "https://www.zomato.com/",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    let recipients = [];
    if (Array.isArray(formData.to)) {
      recipients = formData.to.flatMap((recipient) => recipient.split(","));
    } else if (typeof formData.to === "string") {
      recipients = formData.to.split(",");
    } else {
      console.error("Invalid formData.to format. Expected array or string.");
      return;
    }
    console.log("recipients: ", recipients);
    try {
      await Promise.all(
        recipients.map(async (recipient, index) => {
          const emailData = {
            to: recipient,
            subject: formData.subject,
            template: "marketing",
            companyName: formData.companyName,
            companyLogo: formData.companyLogo,
            offPercentage: formData.offPercentage,
            couponCode: formData.couponCode,
            footerMessage: "Savor Every Bite with Zomato.",
            productImage: formData.productImage,
            emailTitle: formData.emailTitle,
            emailHeading: formData.emailHeading,
            emailMessage: formData.emailMessage,
            shopLink: formData.shopLink,
          };
          console.log("emailData: ", emailData);
          const response = await fetch("http://localhost:8000/send-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(emailData),
          });
          if (response.ok) {
            console.log(
              `Email ${index + 1} sent to ${recipient} successfully!`
            );
          } else {
            console.error(`Error sending email ${index + 1} to ${recipient}`);
          }
        })
      );
    } catch (error) {
      console.error(`Error sending emails:`, error);
    }
  };

  return addModal ? (
    <div className="email-template-container" id="promotional-email-template">
      <h2>Marketing Email Form</h2>
      <form id="email-form" className="email-form" onSubmit={sendEmail}>
        <label className="form-label textarea" htmlFor="to">
          To:
        </label>
        <textarea
          id="to"
          name="to"
          rows="4"
          cols="50"
          value={formData.to}
          onChange={handleChange}
          className="form-input"
        ></textarea>
        <br />

        <label className="form-label" htmlFor="subject">
          Subject:
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label" htmlFor="companyName">
          Company Name:
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label" htmlFor="companyLogo">
          Company Logo:
        </label>
        <input
          type="text"
          id="companyLogo"
          name="companyLogo"
          value={formData.companyLogo}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label" htmlFor="offPercentage">
          Offer Percentage:
        </label>
        <input
          type="number"
          id="offPercentage"
          name="offPercentage"
          value={formData.offPercentage}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label" htmlFor="couponCode">
          Coupon Code:
        </label>
        <input
          type="text"
          id="couponCode"
          name="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label textarea" htmlFor="footerMessage">
          Footer Message:
        </label>
        <textarea
          id="footerMessage"
          name="footerMessage"
          rows="4"
          cols="50"
          value={formData.footerMessage}
          onChange={handleChange}
          className="form-input"
        ></textarea>
        <br />

        <label className="form-label" htmlFor="productImage">
          Product Image:
        </label>
        <input
          type="text"
          id="productImage"
          name="productImage"
          value={formData.productImage}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label" htmlFor="emailTitle">
          Email Title:
        </label>
        <input
          type="text"
          id="emailTitle"
          name="emailTitle"
          value={formData.emailTitle}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label" htmlFor="emailHeading">
          Email Heading:
        </label>
        <input
          type="text"
          id="emailHeading"
          name="emailHeading"
          value={formData.emailHeading}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <label className="form-label textarea" htmlFor="emailMessage">
          Email Message:
        </label>
        <textarea
          id="emailMessage"
          name="emailMessage"
          rows="4"
          cols="50"
          value={formData.emailMessage}
          onChange={handleChange}
          className="form-input"
        ></textarea>
        <br />

        <label className="form-label" htmlFor="shopLink">
          Shop Link:
        </label>
        <input
          type="text"
          id="shopLink"
          name="shopLink"
          value={formData.shopLink}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <input type="submit" value="Send Email" className="submit-btn" />
      </form>
    </div>
  ) : (
    <div className="marketing-container">
      <div className="marketing-header">
        <h1>Marketing Template</h1>
        <img
          src={userData.companyLogo}
          alt={`${userData.companyName} Logo`}
          style={{ maxWidth: 40, maxHeight: 40, borderRadius: "50%" }}
        />
        <h1>{userData.emailHeading}</h1>
        <p>{userData.emailMessage}</p>
      </div>
      <img
        className="marketing-product-image"
        src={userData.productImage}
        alt="Featured Product"
      />
      <button className="marketing-cta-button">Shop Now</button>
      <div className="marketing-footer">
        <p>{userData.footerMessage}</p>
        <p>&copy; 2024 {userData.companyName}. All rights reserved.</p>
      </div>
      <button className="send-email-button" onClick={handleSubmit}>
        Send Email.
      </button>
    </div>
  );
};

export default Marketing;
