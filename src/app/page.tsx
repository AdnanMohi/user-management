"use client";
import Image from "next/image";
import { Mail, Lock } from "react-feather";
import { useState } from "react";
import { useRouter } from "next/navigation";
import google from "../../public/google.png";

import { signIn } from "next-auth/react";

import { SessionProvider, useSession } from "next-auth/react";
import { Button, Input } from "antd";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    return setUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/profile" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }
      const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
      if (!emailRegex.test(user.email)) {
        setError("invalid email id");
        return;
      }

      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        setError("error");
      }

      setError("");
      router.push("/profile");
    } catch (error) {
      console.log(error);
      setError("");
    } finally {
      setLoading(false);

      setUser({
        email: "",
        password: "",
      });
    }
  };

  return (
    
    <div
    className="min-h-screen"
    style={{
      backgroundImage: `url(${"/pexels-felixmittermeier-956999.jpg"})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
  >
    <div className="grid place-items-center mx-auto max-w-4xl w-full py-10 min-h-screen">
      <div className="flex justify-center items-center lg:flex-row flex-col gap-6 lg:gap-0 w-full shadow-md rounded-2xl">
     
        <div className="lg:w-1/2 w-full sm:w-1/2 flex rounded-2xl bg-gray-500 flex-col justify-center items-center py-6 bg-white ">
         
          <div className="text-slate-900 font- font-medium text-3xl mt-8 mb-8 ">
            Hello! Welcome Back
          </div>

          <form
            className="w-full px-5 py-6 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col  w-full lg:px-5">
              <label className="font-inter ml-2 text-lg mb-2">Email</label>
              <div className="">
               
                <Input
                  type={"email"}
                  placeholder="example@123.com"
                  name="email"
                  className="outline-none rounded-2xl w-full py-4 px-4"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col w-full lg:px-5">
              <label className="font-inter ml-2  text-lg mb-2">Password</label>
              <div className="">
          
                <Input
                  type={"password"}
                  placeholder="**********"
                  name="password"
                  className="outline-none rounded-2xl w-full py-4 px-4"
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>

              <div className="text-red-500 text-sm">{error}</div>

              <div className="flex justify-end mt-2 ">
                <a
                  href="/resetPassword"
                  className="text-[#5D7DF3] hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              <div className="flex justify-center mt-6 w-full ">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-[#5D7DF3] h-12 font-inter text-lg text-white text-lg w-2/3 py-3 rounded-2xl uppercase font-semibold"
                >
                  Login
                </Button>
              </div>
              <div className="flex justify-center w-full items-center gap-3 py-3">
                <div className="border-b border-gray-800 py-2 w-full px-6" />
                <div className="mt-3">or</div>
                <div className="border-b border-gray-800 py-2 w-full px-6" />
              </div>
              <div className="flex justify-center items-center w-full gap-8 pb-8">

                <div onClick={handleGoogleSignIn} className="rounded px-6 py-2 shadow cursor-pointer bg-gray-50 grid place-items-center mx-auto mb-4">
                  <Image src={google} alt="google" width={100} height={100} />
                </div>{" "}

              </div>
              <div className="text-lg text-slate-900 font-medium">
              <span>Don&apos;t have an account?</span>

                <a
                  href="/signup"
                  className="text-[#5D7DF3] pl-3 hover:underline"
                >
                  Create an account
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;