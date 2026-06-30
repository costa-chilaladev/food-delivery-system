import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import InputForm from "/src/components/ui/Inputs.jsx";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { IoArrowBack } from "react-icons/io5";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  function handleLogout() {
    googleLogout();
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleForm(e) {
    e.preventDefault();
    console.log(form);
  }

  return (
    <section>
      <section>
        <div className="cursor-pointer relative m-2 w-20 p-2 rounded-2xl">
          <span className="absolute top-1/2 -translate-y-1/2">
            <IoArrowBack />
          </span>

          <span
            className="pl-5"
            onClick={() => navigate("/")}
          >
            Back
          </span>
        </div>
      </section>
      <section className="w-[40%] m-auto text-center">
        <h1 className="">Signin</h1>
        <form className="grid gap-y-4 w-full" onSubmit={handleForm}>
          <InputForm
            type="email"
            name="email"
            placeholder="joao@email.com"
            onChange={(e) => handleChange(e)}
          />

          <div className="relative">
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            >
              {isPasswordHidden ? (
                <LuEyeClosed size={24} />
              ) : (
                <LuEye size={24} />
              )}
            </button>
            <InputForm
              name="password"
              placeholder="****"
              type={isPasswordHidden ? "password" : "text"}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="bg-blue-500 p-2 rounded-md" type="button">
            Signin
          </button>

          <div className="w-full">
            <GoogleLogin
              className="w-full"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                console.log(jwtDecode(credentialResponse.credential));
              }}
              onError={() => console.log("Login Failed")}
              auto_select={true}
              theme="filled_black"
            />
          </div>
        </form>
        <p>
          Não tem uma conta?{" "}
          <button
            className="cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
        </p>
      </section>
    </section>
  );
}
