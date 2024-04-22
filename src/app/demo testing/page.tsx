"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn,useSession,signOut } from "next-auth/react";





export default function LoginPage() {
    const { data: session } = useSession();
    
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

   
    const googleHandler = async () => {
      try {
          const response = await signIn('google', { callbackUrl: '/profile' });
          console.log('Google signIn response:', response);
          // Handle the response here
      } catch (error) {
          console.error('Google signIn error:', error);
          // Handle the error here
      } finally {
          // Redirect to profile page after the signIn operation
          window.location.href = '/profile';
      }
  };
  
    
    

    const gitHubHandler = async () => {
        try {
            const response = await signIn("github", { callbackUrl: "/profile" });
            console.log("GitHub login success", response);
        } catch (error:any) {
            console.log("GitHub login failed", error.message);
        }

       
    }
    // if(session) {
    //     router.push("/profile");
    // }
     console.log("session =>",session?.user?.email);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
        console.log("Sign out success");
    }


    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1>{loading ? "Processing" : "Login"}</h1>
          <hr />
    
          <label htmlFor="email">email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <label htmlFor="password">password</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            disabled={buttonDisabled}
          >
            Login here
          </button>
          <Link href="/resetPassword">Forgot Password</Link>
          <Link href="/signup">Visit Signup page</Link>

          {/* Conditionally render sign-out button if user is logged in */}
      {!loading && session && (
        <button
          onClick={handleSignOut}
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        >
          Sign Out
        </button>
      )}



    
          <h1 className="py-10"> or</h1>
          
    
          {/* Conditionally render third-party authentication options only if user has not logged in manually */}
          {!loading && !session && (
            <>
              <button
                onClick={googleHandler}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                Login with Google
              </button>
              <button
                onClick={gitHubHandler}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
              >
                Login with GitHub
              </button>
            </>
          )}
        </div>
      );
    }