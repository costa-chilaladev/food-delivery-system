import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FaCheckSquare } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import InputForm from "/src/components/ui/Inputs.jsx";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getCities } from "../../services/apiClient.js";
import { isPasswordAuth } from "../../features/auth/passwordAuth.js";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    whatsapp_phone_number: "",
    city: "",
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const [isFirstFormCompleted, setIsFirstFormCompleted] = useState(false);

  const [samePhone, setSamePhone] = useState(false);

  const [hasUserTried, setHasUserTried] = useState(false);

  const [hasLoggedWithGoogle, setHasLoggedWithGoogle] = useState(false);

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const cities = getCities();

  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(?=\d)/g, "$1 ")
      .trim();
  };

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

  function handleSignUpWithGoogle(credentialResponse) {
    setForm((prev) => ({
      ...prev,
      email: credentialResponse.email,
      name: credentialResponse.name,
      //picture: credentialResponse.picture
    }));

    setHasLoggedWithGoogle(true);
    handleFormStep();
  }

  function handleFormStep() {
    setHasUserTried(false);
    setIsFirstFormCompleted(!isFirstFormCompleted);
  }

  return (
    <section>
      <section>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => navigate("/")}
        >
          Home
        </span>
      </section>
      <section className="w-[40%] m-auto text-center">
        <h1 className="">Sign up free</h1>
        <form className="grid gap-y-4 w-full" onSubmit={handleForm}>
          {!isFirstFormCompleted ? (
            <>
              <InputForm
                type="text"
                name="name"
                placeholder="joao"
                className={
                  hasUserTried && form.name == "" ? "border-red-600" : ""
                }
                onChange={(e) => handleChange(e)}
              />

              <InputForm
                type="email"
                name="email"
                placeholder="joao@email.com"
                className={
                  hasUserTried && form.email == "" ? "border-red-600" : ""
                }
                onChange={(e) => handleChange(e)}
              />

              <div>
                crie uma nova password:
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
                    className={
                      hasUserTried && form.password == ""
                        ? "border-red-600"
                        : ""
                    }
                    onFocus={() => setShowPasswordRequirements(true)}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="text-left">
                  {showPasswordRequirements &&
                  !isPasswordAuth(form.password).result ? (
                    <>
                      {Object.entries(isPasswordAuth(form.password).data).map(
                        ([key, value]) => {
                          return (
                            <p key={value.label} className="relative">
                              <span>{value.label}</span>{" "}
                              <span className="absolute top-1/2 -translate-y-1/2">
                                {value.value ? (
                                  <FaCheckSquare />
                                ) : (
                                  <IoMdClose />
                                )}
                              </span>
                            </p>
                          );
                        },
                      )}
                    </>
                  ) : (
                    <span>Password segura</span>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  if (
                    form.name == "" ||
                    form.email == "" ||
                    form.password == ""
                  ) {
                    setHasUserTried(true);
                    return;
                  }

                  const passwordValidation = isPasswordAuth(form.password);

                  if (!passwordValidation.result) {
                    return;
                  }

                  handleFormStep();
                }}
                className="bg-blue-500 p-2 rounded-md"
                type="button"
              >
                Avançar
              </button>

              <div className="w-full">
                <GoogleLogin
                  className="w-full"
                  onSuccess={(credentialResponse) => {
                    handleSignUpWithGoogle(
                      jwtDecode(credentialResponse.credential),
                    );
                  }}
                  onError={() => console.log("Login Failed")}
                  auto_select={false}
                  theme="filled_black"
                />
              </div>
            </>
          ) : (
            <>
              {hasLoggedWithGoogle ? (
                <>
                  <div>
                    crie uma nova password:
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
                        className={
                          hasUserTried && form.password == ""
                            ? "border-red-600"
                            : ""
                        }
                        onFocus={() => setShowPasswordRequirements(true)}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                    <div className="text-left">
                      {showPasswordRequirements &&
                      !isPasswordAuth(form.password).result ? (
                        <>
                          {Object.entries(
                            isPasswordAuth(form.password).data,
                          ).map(([key, value]) => {
                            return (
                              <p key={value.label} className="relative">
                                <span>{value.label}</span>{" "}
                                <span className="absolute top-1/2 -translate-y-1/2">
                                  {value.value ? (
                                    <FaCheckSquare />
                                  ) : (
                                    <IoMdClose />
                                  )}
                                </span>
                              </p>
                            );
                          })}
                        </>
                      ) : (
                        <span>Password segura</span>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              <label htmlFor="">
                Digite o seu número de telefone (podemos usa-lo para
                contacta-lo)
              </label>
              <InputForm
                name="phone_number"
                placeholder="999 999 999"
                type="text"
                inputMode="numeric"
                value={form.phone_number}
                className={
                  hasUserTried && form.phone_number == ""
                    ? "border-red-600"
                    : ""
                }
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);

                  setForm((prev) => ({
                    ...prev,
                    phone_number: formatted,
                    whatsapp_phone_number: samePhone
                      ? formatted
                      : prev.whatsapp_phone_number,
                  }));
                }}
              />

              <label htmlFor="">Digite seu número do whatsapp</label>
              <InputForm
                name="whatsapp_phone_number"
                value={form.whatsapp_phone_number}
                placeholder="999 999 999"
                type="text"
                disabled={samePhone}
                className={
                  hasUserTried && form.whatsapp_phone_number == ""
                    ? "border-red-600"
                    : ""
                }
                inputMode="numeric"
                onChange={(e) => {
                  const formatted = formatPhone(e.target.value);

                  setForm((prev) => ({
                    ...prev,
                    whatsapp_phone_number: formatted,
                  }));
                }}
              />

              <label className="flex items-center justify-end gap-2">
                <span>usar o mesmo número</span>
                <input
                  type="checkbox"
                  checked={samePhone}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSamePhone(checked);
                    setForm((prev) => ({
                      ...prev,
                      whatsapp_phone_number: checked
                        ? prev.phone_number
                        : prev.whatsapp_phone_number,
                    }));
                  }}
                />
              </label>

              <select
                name="city"
                className={
                  hasUserTried && form.city == "" ? "border-red-600" : ""
                }
                onChange={(e) => handleChange(e)}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <button type="button" onClick={() => handleFormStep()}>
                Back
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  if (
                    form.phone_number == "" ||
                    form.whatsapp_phone_number == "" ||
                    form.city == ""
                  ) {
                    setHasUserTried(true);
                    return;
                  }
                  handleForm(e);
                }}
              >
                Signup
              </button>
            </>
          )}
        </form>

        <p>
          Já tem uma conta ?{" "}
          <button
            className="cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Log in
          </button>
        </p>
      </section>
    </section>
  );
}
