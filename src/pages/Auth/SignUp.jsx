import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FaCheckSquare } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import InputForm from "/src/components/ui/Inputs.jsx";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { getProvinces } from "../../services/apiClient.js";
import { isPasswordAuth } from "../../features/auth/passwordAuth.js";
import { registerUser } from "../../services/apiClient.js";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    whatsapp_phone_number: "",
    province: "",
  });

  const [isFirstFormCompleted, setIsFirstFormCompleted] = useState(false);
  const [hasUserTried, setHasUserTried] = useState(false);
  const [hasLoggedWithGoogle, setHasLoggedWithGoogle] = useState(false);
  const [onSignupSuccess, setOnSignupSuccess] = useState({
    show: false,
    message: "",
  });
  const [onSignupFailed, setOnSignupFailed] = useState({
    show: false,
    message: "",
  });

  function handleLogout() {
    googleLogout();
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleForm(e) {
    e.preventDefault();

    if (
      form.phone_number === "" ||
      form.whatsapp_phone_number === "" ||
      form.province === ""
    ) {
      setHasUserTried(true);
      return;
    }

    setOnSignupSuccess({ show: false, message: "" });
    setOnSignupFailed({ show: false, message: "" });

    try {
      const response = await registerUser(form);

      if (response?.onSuccess) {
        setOnSignupSuccess({
          show: true,
          message: response.message || "Cadastro realizado com sucesso.",
        });
      } else {
        setOnSignupFailed({
          show: true,
          message: response?.message || "Não foi possível concluir o cadastro.",
        });
      }
    } catch (error) {
      setOnSignupFailed({
        show: true,
        message: "Não foi possível conectar ao servidor. Tente novamente.",
      });
    }
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

  if (onSignupSuccess.show) {
    return (
      <section className="fixed inset-0 flex items-center justify-center">
        <div className="shadow-lg bg-white p-6 rounded-lg">
          <h1 className="text-xl font-bold text-center">
            Cadastro realizado com sucesso
          </h1>
          <p>{onSignupSuccess.message}</p>
          <button
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/signin")}
          >
            Ir para o login
          </button>
        </div>
      </section>
    );
  }

  if (onSignupFailed.show) {
    return (
      <section className="fixed inset-0 flex items-center justify-center">
        <div className="shadow-lg bg-white p-6 rounded-lg">
          <h1 className="text-xl font-bold text-center">Falha no cadastro</h1>
          <p>{onSignupFailed.message}</p>
          <button
            className="cursor-pointer hover:underline"
            onClick={() => setOnSignupFailed({ show: false, message: "" })}
          >
            Tentar outra vez
          </button>
        </div>
      </section>
    );
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
            <SignupStepOne
              form={form}
              handleChange={handleChange}
              hasUserTried={hasUserTried}
              setHasUserTried={setHasUserTried}
              handleFormStep={handleFormStep}
              handleSignUpWithGoogle={handleSignUpWithGoogle}
            />
          ) : (
            <>
              {hasLoggedWithGoogle ? (
                <>
                  <PasswordInput form={form} handleChange={handleChange} />
                </>
              ) : (
                ""
              )}
              <SignupStepTwo
                form={form}
                hasLoggedWithGoogle={hasLoggedWithGoogle}
                handleChange={handleChange}
                hasUserTried={hasUserTried}
                setForm={setForm}
                handleFormStep={handleFormStep}
              />
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

function SignupStepOne({
  form,
  handleChange,
  hasUserTried,
  setHasUserTried,
  handleFormStep,
  handleSignUpWithGoogle,
}) {
  return (
    <section>
      <InputForm
        type="text"
        name="name"
        className={hasUserTried && form.name == "" ? "border-red-500" : ""}
        placeholder="joao"
        onChange={(e) => handleChange(e)}
      />

      <InputForm
        type="email"
        name="email"
        className={hasUserTried && form.email == "" ? "border-red-500" : ""}
        placeholder="joao@email.com"
        onChange={(e) => handleChange(e)}
      />

      <PasswordInput
        form={form}
        handleChange={handleChange}
        hasUserTried={hasUserTried}
      />

      <button
        onClick={() => {
          if (form.name == "" || form.email == "" || form.password == "") {
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

      <ButtonGoogleSignup handleSignUpWithGoogle={handleSignUpWithGoogle} />
    </section>
  );
}

function SignupStepTwo({
  form,
  hasLoggedWithGoogle,
  handleChange,
  hasUserTried,
  setForm,
  handleFormStep,
}) {

  const provinces = getProvinces();

  const [samePhone, setSamePhone] = useState(false);

  return (
    <section>
      {hasLoggedWithGoogle ? (
        <>
          <PasswordInput form={form} handleChange={handleChange} />
        </>
      ) : (
        ""
      )}
      
      <PhoneFields form={form} setForm={setForm} samePhone={samePhone} setSamePhone={setSamePhone} hasUserTried={hasUserTried} />

      <select
        name="province"
        className={hasUserTried && form.province == "" ? "border-red-600" : ""}
        onChange={(e) => handleChange(e)}
      >
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>

      <button type="button" onClick={() => handleFormStep()}>
        Back
      </button>
      <button type="submit">Signup</button>
    </section>
  );
}

function PhoneFields({form, setForm, samePhone, setSamePhone, hasUserTried}) {
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(?=\d)/g, "$1 ")
      .trim();
  };
  
  return (
    <div>
      <label htmlFor="">
          Digite o seu número de telefone (podemos usa-lo para contacta-lo)
        </label>
        <InputForm
          name="phone_number"
          placeholder="999 999 999"
          type="text"
          inputMode="numeric"
          value={form.phone_number}
          className={
            hasUserTried && form.phone_number == "" ? "border-red-600" : ""
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
    </div>
  )
}

function ButtonGoogleSignup({ handleSignUpWithGoogle }) {
  return (
    <div className="w-full">
      <GoogleLogin
        className="w-full"
        onSuccess={(credentialResponse) => {
          handleSignUpWithGoogle(jwtDecode(credentialResponse.credential));
        }}
        onError={() => console.log("Login Failed")}
        auto_select={false}
        theme="filled_black"
      />
    </div>
  );
}

function PasswordInput({ form, handleChange, hasUserTried }) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  return (
    <section>
      crie uma nova password:
      <div className="relative">
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
        >
          {isPasswordHidden ? <LuEyeClosed size={24} /> : <LuEye size={24} />}
        </button>
        <InputForm
          name="password"
          placeholder="######"
          type={isPasswordHidden ? "password" : "text"}
          className={
            hasUserTried && form.password == "" ? "border-red-500" : ""
          }
          onFocus={() => setShowPasswordRequirements(true)}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <div className="text-left">
        {showPasswordRequirements && !isPasswordAuth(form.password).result ? (
          <>
            {Object.entries(isPasswordAuth(form.password).data).map(
              ([, value]) => {
                return (
                  <p key={value.label} className="relative">
                    <span>{value.label}</span>{" "}
                    <span className="absolute top-1/2 -translate-y-1/2">
                      {value.value ? <FaCheckSquare /> : <IoMdClose />}
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
    </section>
  );
}
