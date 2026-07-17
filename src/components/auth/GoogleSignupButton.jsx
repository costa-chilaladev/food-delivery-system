import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function GoogleSignupButton({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        onSuccess(jwtDecode(credentialResponse.credential));
      }}
      onError={() => console.log("Login Failed")}
      auto_select={false}
      theme="filled_black"
    />
  );
}