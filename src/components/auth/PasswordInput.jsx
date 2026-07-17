import { useState } from "react";

import { FaCheckSquare } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuEye, LuEyeClosed } from "react-icons/lu";

import { isValidPassword } from "/src/features/auth/validators.js";

import InputForm from "/src/components/ui/Inputs.jsx";

export default function PasswordInput({ form, handleChange, hasUserTried }) {
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
        {showPasswordRequirements && !isValidPassword(form.password).result ? (
          <>
            {Object.entries(isValidPassword(form.password).data).map(
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