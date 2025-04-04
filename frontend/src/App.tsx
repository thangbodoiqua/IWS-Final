import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallBackPage";
import { axiosInstance } from "./lib/axios";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
export default function App() {
  const getSomeData = async () => {
    await axiosInstance.get("/")
  }
  return (
    <>
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route
          path="/sso-callback" element={<AuthenticateWithRedirectCallback
            signUpForceRedirectUrl={"/auth-callback"}
        />} />
        <Route path = "/auth-callback" element = {<AuthCallbackPage />} />
      </Routes>
    </>
  );
}