import { FormEvent, useState } from "react";
import loginImg from "../assets/login.jpg";

const LoginPage = () => {
  let userToken = "";
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    try {
      await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: target.username.value,
          password: target.password.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle response data
          userToken = data.token;
        });

      if (userToken != "") {
        console.log("Login successful!");
        setMessage("Login successful!");
      } else {
        console.log("Login unsuccessful!");
        setMessage("Login unsuccessful!");
      }
    } catch (error) {
      setMessage("Error while logging in!");
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="login-page">
        <form
          className="col-lg-8 col-md-6 col-sm-8 col-8 "
          onSubmit={handleSubmit}
        >
          <div className="login-image mb-3">
            <img src={loginImg} alt="Image" />
          </div>

          <div className="flex-grow-1 mb-3">
            <label htmlFor="username" className="form-label">
              Username (mor_2314)
            </label>
            <input type="text" className="form-control" id="username" />
          </div>

          <div className="flex-grow-1 mb-3">
            <label htmlFor="password" className="form-label">
              Password (83r5^_)
            </label>
            <input type="password" className="form-control" id="password" />
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

export default LoginPage;
