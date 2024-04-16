import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import contactImg from "../assets/contact.jpeg";

interface IFormInput {
  email: string;
  name: string;
  message: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Email is not valid"
    ),
  name: yup.string().required("Name is required"),
  message: yup.string().required("Message is required"),
});

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  const [message, setMessage] = useState("");

  const onSubmit = async (data: IFormInput) => {
    try {
      console.log(data);
      setMessage("Message sent!");
    } catch (error) {
      setMessage("Error while sending a message!");
      console.error("Error while sending a message:", error);
    }
  };

  return (
    <>
      <div className="contact-page">
        <form
          className="col-lg-8 col-md-6 col-sm-8 col-8 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="contact-image mb-3">
            <img src={contactImg} alt="Image" />
          </div>

          <div className="contact-user mb-3 d-flex gap-3">
            <div className="flex-grow-1">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email")}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
            <div className="flex-grow-1">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="name"
                className="form-control"
                id="name"
                {...register("name")}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="message"
              {...register("message")}
            />
            {errors.message && (
              <p className="error">{errors.message.message}</p>
            )}
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
