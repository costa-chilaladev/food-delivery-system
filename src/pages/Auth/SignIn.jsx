import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "/src/components/ui/Inputs.jsx";
import { IoArrowBack } from "react-icons/io5";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import GoogleSignupButton from "/src/components/auth/GoogleSignupButton.jsx";
import { isValidEmail } from "/src/features/auth/validators.js";
import { login, getUserInfo } from "/src/services/apiClient.js";

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [hasLoggedWithGoogle, setHasLoggedWithGoogle] = useState(false);

  const [hasUserTried, setHasUserTried] = useState(false);

  const [messageError, setMessageError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleForm(e) {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      setHasUserTried(true);
      setMessageError("Confirme que digitou bem o seu email");
      return;
    }

    if (form.password == "") {
      setHasUserTried(true);
      setMessageError("Campo Vazio");
      return;
    }

    const data = await login(form)

    localStorage.setItem("token", data.token)

    console.log(data)

    const test = await getUserInfo()
    console.log("teste de rota protegida:", test)
  }

  function handleSignUpWithGoogle(user) {
    setForm((prev) => ({
      ...prev,
      email: user.email,
    }));

    setHasLoggedWithGoogle(true);
  }

  return (
    <section>
      <section>
        <div className="cursor-pointer relative m-2 w-20 p-2 rounded-2xl">
          <span className="absolute top-1/2 -translate-y-1/2">
            <IoArrowBack />
          </span>

          <span className="pl-5" onClick={() => navigate("/")}>
            Back
          </span>
        </div>
      </section>
      <section className="w-[40%] m-auto text-center">
        <h1 className="">Signin</h1>

        {hasUserTried ? (
          <>
            {" "}
            <ErrorPopup
              message={messageError}
              onProceed={() => setHasUserTried(false)}
            />{" "}
          </>
        ) : (
          ""
        )}

        <form className="grid gap-y-4 w-full" onSubmit={handleForm}>
          {!hasLoggedWithGoogle ? (
            <>
              <InputForm
                type="email"
                name="email"
                placeholder="joao@email.com"
                onChange={(e) => handleChange(e)}
              />
            </>
          ) : (
            ""
          )}

          <LoginPasswordInput handleChange={handleChange} />

          {!hasLoggedWithGoogle ? (
            <>
              <GoogleSignupButton onSuccess={handleSignUpWithGoogle} />
            </>
          ) : (
            ""
          )}

          <button className="bg-blue-500 p-2 rounded-md" type="submit">
            Signin
          </button>
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

function LoginPasswordInput({ handleChange }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <div className="relative w-full">
      <InputForm
        type={isPasswordHidden ? "password" : "text"}
        name="password"
        placeholder="password"
        onChange={(e) => handleChange(e)}
      />

      <button
        className="absolute top-1/2 -translate-y-1/2 right-3"
        type="button"
        onClick={() => setIsPasswordHidden(!isPasswordHidden)}
      >
        {isPasswordHidden ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
      </button>
    </div>
  );
}

function ErrorPopup({ message, onProceed }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <p className="mb-4 text-lg font-semibold text-gray-800">{message}</p>
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
          onClick={onProceed}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
