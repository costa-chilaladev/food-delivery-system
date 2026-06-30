import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = "274668332648-ghhbi3ad6b4j9k8pajat7nbqq0heb8ul.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>,
);
