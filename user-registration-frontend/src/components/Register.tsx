import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
};

interface ErrorResponse {
  message: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        data
      );
      alert(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response && axiosError.response.data) {
        alert(axiosError.response.data.message || "Registration failed");
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <span>Email is required</span>}

      <input
        type="password"
        {...register("password", { required: true })}
        placeholder="Password"
      />
      {errors.password && <span>Password is required</span>}

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
