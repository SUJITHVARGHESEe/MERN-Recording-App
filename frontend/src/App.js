import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import { ToastContainer } from "react-toastify";
import HomePage from "./Pages/HomePage";
import RecordingPage from "./Components/RecordingPage";
<ToastContainer position="bottom-center" limit={1} />;
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
