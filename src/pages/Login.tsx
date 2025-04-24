
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="rounded-lg bg-prologix-blue p-2">
            <Package className="h-12 w-12 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          ProLogiX
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Intelligent supply chain management system
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
