import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import loginImg from "../assets/login.jpg";
import { login } from "../services/apiService";

interface IFormInput {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(schema) });

  let userToken = "";
  const [message, setMessage] = useState("");

  const onSubmit = async (data: IFormInput) => {
    try {
      userToken = await login(data.username, data.password);

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
      <div className="container-xxl login-page">
        <form
          className="col-lg-8 col-md-6 col-sm-8 col-8 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="login-image mb-3">
            <img src={loginImg} alt="Image" />
          </div>

          <div className="flex-grow-1 mb-3">
            <label htmlFor="username" className="form-label">
              Username (mor_2314)
            </label>
            <input
              type="username"
              className="form-control"
              id="username"
              {...register("username")}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div className="flex-grow-1 mb-3">
            <label htmlFor="password" className="form-label">
              Password (83r5^_)
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password")}
            />{" "}
            {errors.password && (
              <p className="error">{errors.password.message}</p>
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
    </>
  );
};

export default LoginPage;
