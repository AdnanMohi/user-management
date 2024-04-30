"use client";

import { Button } from "antd";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Table from "@/components/tables/table";


const Profile = () => {
  // Access session data and status
  const { data: session, status } = useSession();
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();



 

  

  // Handle signout
  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Sign out without redirect
    router.push("/"); // Redirect to the home page after signout
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
    <div className="w-full h-screen ">
      <div className="flex items-center w-full h-auto bg-white ">
        <span className="text-4xl tracking-wide font-semibold capitalize text-[#5D7DF3]">
          welcome to the Dashboard
        </span>
        <h1 className="text-2xl tracking-normal py-10 font-semibold mx-3">
          {loading ? "Processing" : session?.user?.name}
        </h1>

        <Button type="primary" onClick={handleSignOut} className=" mx-3">
          Logout
        </Button>
      </div>

      <div>
<Table/>
      </div>
     
    </div>
  );
};

export default Profile;
