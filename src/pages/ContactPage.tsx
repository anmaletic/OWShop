import { FormEvent, useState } from "react";
import contactImg from "../assets/contact.jpeg";

const ContactPage = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setMessage("Message sent!");
    } catch (error) {
      console.error("Error while sending a message:", error);
    }
  };

  return (
    <>
      <div className="contact-page">
        <form
          className="col-lg-8 col-md-6 col-sm-8 col-8 "
          onSubmit={handleSubmit}
        >
          <div className="contact-image mb-3">
            <img src={contactImg} alt="Image" />
          </div>

          <div className="contact-user mb-3 d-flex gap-3">
            <div className="flex-grow-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="flex-grow-1">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="name" className="form-control" id="name" />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea className="form-control" id="message" />
          </div>

          <div className="mb-3 d-flex">
            <button type="submit" className="btn btn-success flex-grow-1">
              Submit
            </button>
          </div>
        </form>
        <p>{message}</p>
      </div>

      <div className="footer">
        <div>
          <p>OWShop © 2024 OWShop. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
