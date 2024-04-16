import { useState } from "react";
import "./promoStyle.css";

const Promotional = () => {
  const [addModal, setModal] = useState(false);
  const userData = {
    to: "user1@gmail.com, user2@gmail.com",
    subject: "Promotional Email",
    template: "promotional",
    companyName: "Ajio",
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0gCG_O00ICjLvp7HugnNFRWk1puwBvvLZ6MR94P15w&s",
    offPercentage: 60,
    couponCode: "AJIO55",
    message: "Enjoy Shopping with Ajio.",
    offerImage:
      "https://assets.ajio.com/medias/sys_master/images/images/h20/hdb/63666038702110/M-UHP-topbanner-1024x672-NowEnds20thNov.jpg",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModal(true);
  };

  const [formData, setFormData] = useState({
    to: "user1@gmail.com, user2@gmail.com",
    subject: "Promotional Email",
    template: "promotional",
    companyName: "Ajio",
    companyLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl0gCG_O00ICjLvp7HugnNFRWk1puwBvvLZ6MR94P15w&s",
    offPercentage: 60,
    couponCode: "AJIO55",
    message: "Enjoy Shopping with Ajio.",
    offerImage:
      "https://assets.ajio.com/medias/sys_master/images/images/h20/hdb/63666038702110/M-UHP-topbanner-1024x672-NowEnds20thNov.jpg",
  });

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
            template: "promotional",
            companyName: formData.companyName,
            companyLogo: formData.companyLogo,
            offPercentage: formData.offPercentage,
            couponCode: formData.couponCode,
            message: formData.message,
            offerImage: formData.offerImage,
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
    <div className="email-template-container" id="educational-email-template">
      <h2>Promotional Email Form</h2>
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

        <label className="form-label textarea" htmlFor="message">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          cols="50"
          value={formData.message}
          onChange={handleChange}
          className="form-input"
        ></textarea>
        <br />

        <label className="form-label" htmlFor="offerImage">
          Offer Image:
        </label>
        <input
          type="text"
          id="offerImage"
          name="offerImage"
          value={formData.offerImage}
          onChange={handleChange}
          className="form-input"
        />
        <br />

        <input type="submit" value="Send Email" className="submit-btn" />
      </form>
    </div>
  ) : (
    <div className="promo-container">
      <div className="promo-header">
        <h1 className="promo-template">Promotional Template.</h1>
        <img
          src={userData.companyLogo}
          alt={`${userData.companyName} Logo`}
          style={{
            maxWidth: "40px",
            maxHeight: "40px",
            borderRadius: "50%",
          }}
        />
        <h1>Get {userData.offPercentage}% Off on Your Next Purchase!</h1>
        <p>Use code {userData.couponCode} at checkout</p>
      </div>
      <img
        className="promo-offer-image"
        src={userData.offerImage}
        alt="Food Offer"
      />
      <button className="promo-cta-button" disabled="true">
        Get Now
      </button>
      <div className="promo-footer">
        <p>{userData.message}</p>
        <p>&copy; 2024 {userData.companyName}. All rights reserved.</p>
      </div>
      <button className="promo-sendemail-button" onClick={handleSubmit}>
        Send Email.
      </button>
    </div>
  );
};

export default Promotional;
