import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallBackPage";
import { axiosInstance } from "./lib/axios";
export default function App() {
  const getSomeData = async () => {
    await axiosInstance.get("/")
  }
  return (
    <>
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/auth-callback" element = {<AuthCallbackPage />} />
      </Routes>
    </>
  );
}