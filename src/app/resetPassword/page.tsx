"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ email: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    if (urlToken) {
      getEmail(urlToken);
    }
  }, []);

  const getEmail = async (temptoken: string) => {
    try {
      const response = await axios.post("/api/users/getUserbyTempToken", { token: temptoken });
      setUser({ email: response.data.data.email });
    } catch (error: any) {
      console.log("Get email failed", error.message);
      toast.error("Failed to fetch email");
    }
  };

  const onResetEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/resetPassword", user);
      console.log("Reset email success", response.data);
      toast.success("Reset Password Email Sent");
      setEmailSent(true);

    } catch (error:any) {
      console.log("Reset email failed", error.message);
      toast.error("Failed to send reset password email");
      setEmailError(true);
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePassword = async () => {
    try {
      if (password !== confirmPassword) {
        setPassError(true);
        return;
      }
      const response = await axios.post("/api/users/updatePassword", { token, password });
      console.log("Update password success", response.data);
      toast.success("Password Reset Successfully");
      router.push("/");
    } catch (error:any) {
      console.log("Update password failed", error.message);
      toast.error("Failed to update password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Reset Password"}</h1>
      <h1>{token ? 'Reset Password' : 'Enter Registered Email'}</h1>
      <hr />
      {!token && (
        <>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <hr />
          <button
            onClick={onResetEmail}
            disabled={emailSent}
            className="p-2 border bg-blue-400  border-blue-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Sent Email
          </button>
          {emailSent && user && user.email && (
  <p>Email has been sent to your email id {user.email}. Please check your email inbox.</p>
)}

          {emailError && <p className="text-red-500">Incorrect Email {emailError}</p>}
        </>
        
      )}
      {token && (
        <>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <hr />
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
          <hr />
          {passError && <label>Passwords do not match</label>}
          <button
            onClick={onUpdatePassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          >
            Reset
          </button>
        </>
      )}
      
    </div>
  );
}
