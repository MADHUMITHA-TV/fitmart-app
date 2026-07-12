import AuthLayout from "../../components/auth/AuthLayout";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join FitMart and start shopping today"
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export default Register;