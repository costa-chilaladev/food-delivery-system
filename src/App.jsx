import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
}

export default App;