// src/pages/Login.tsx
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await axios.post(
        "https://user-registration-app-1.onrender.com/user/login",
        // "http://localhost:3000/user/login",
        data
      );
      alert("Login successful");
      navigate("/"); // Redirect to Home or Dashboard page on success
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    // <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div>
    //       <label>Email</label>
    //       <input
    //         type="email"
    //         {...register("email", { required: "Email is required" })}
    //       />
    //       {errors.email && <span>{errors.email.message}</span>}
    //     </div>

    //     <div style={{ marginTop: "1rem" }}>
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         {...register("password", { required: "Password is required" })}
    //       />
    //       {errors.password && <span>{errors.password.message}</span>}
    //     </div>

    //     <button type="submit" style={{ marginTop: "1rem" }}>
    //       Login
    //     </button>
    //   </form>
    // </div>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
