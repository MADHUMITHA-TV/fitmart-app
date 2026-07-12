import { Button, TextField, Typography, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/authSchema";
import PasswordField from "../../components/auth/PasswordField";
import { useDispatch } from "react-redux";
import { register as registerUser } from "../../redux/slices/authSlice";
import toast from "react-hot-toast";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    // Remove confirmPassword before sending to backend
    const { confirmPassword, ...userData } = data;

    const result = await dispatch(registerUser(userData));

    if (registerUser.fulfilled.match(result)) {
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    } else {
      toast.error(result.payload || "Registration Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <TextField
        fullWidth
        label="First Name"
        margin="normal"
        {...register("firstName")}
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        fullWidth
        label="Last Name"
        margin="normal"
        {...register("lastName")}
        error={!!errors.lastName}
        helperText={errors.lastName?.message}
      />

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="Phone"
        margin="normal"
        {...register("phone")}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />

      <PasswordField
        label="Password"
        register={register}
        name="password"
        error={errors.password}
      />

      <PasswordField
        label="Confirm Password"
        register={register}
        name="confirmPassword"
        error={errors.confirmPassword}
      />

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        type="submit"
      >
        Register
      </Button>

      <Stack
        direction="row"
        justifyContent="center"
        mt={3}
      >
        <Typography>
          Already have an account?
        </Typography>

        <Link
          to="/login"
          style={{
            marginLeft: 5,
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Login
        </Link>
      </Stack>

    </form>
  );
}

export default RegisterForm;