import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "https://user-registration-app-1.onrender.com/user/register",
        // "http://localhost:3000/user/register",
        data
      );
      setSuccessMessage(response.data.message); // Show success message
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Registration failed");
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       {...register("email", {
    //         required: "Email is required",
    //         pattern: /^\S+@\S+$/i,
    //       })}
    //     />
    //     {errors.email && <span>{errors.email.message}</span>}
    //   </div>

    //   <div>
    //     <label>Password</label>
    //     <input
    //       type="password"
    //       {...register("password", { required: "Password is required" })}
    //     />
    //     {errors.password && <span>{errors.password.message}</span>}
    //   </div>

    //   <button type="submit">Register</button>
    //   {successMessage && (
    //     <div style={{ color: "green", marginBottom: "1rem" }}>
    //       {successMessage}. Redirecting to login...
    //     </div>
    //   )}
    // </form>

    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-600 text-center">
            {successMessage}. Redirecting to login...
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
          Register
        </button>
      </form>
    </div>
  );
}
