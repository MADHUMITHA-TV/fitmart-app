import AuthLayout from "../../components/auth/AuthLayout";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue shopping on FitMart"
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;