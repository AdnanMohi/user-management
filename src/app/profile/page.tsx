"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
 

const Profile = () => {
  // Access session data and status
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
 

  // Handle signout
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Sign out without redirect
    router.push('/'); // Redirect to the home page after signout
  };


 // Update loading state based on session status
 useEffect(() => {
  if (status === "loading") {
    setLoading(true);
  } else {
    setLoading(false);
  }
}, [status]);
  

  return (
    <div
      className="min-h-screen py-20"
      style={{
        backgroundImage: `url("/background.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-2xl grid place-items-center mx-auto py-40 gap-6 bg-slate-50">
        <span className="text-4xl tracking-wide font-semibold capitalize text-[#5D7DF3]">
          welcome to the Dashboard
        </span>
        <h1 className="text-2xl tracking-normal py-10 font-semibold">
          {loading ? "Processing": session?.user?.name }</h1>
        

        <button onClick={handleSignOut} className="bg-slate-950 text-white rounded text-lg w-auto px-6 py-3 uppercase">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;