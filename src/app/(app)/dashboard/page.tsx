"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";

const Dashboard = () => {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {session ? (
        <>
          <h1 className="text-4xl font-bold">Welcome, {user?.username}</h1>
          <h2 className="text-3xl font-bold">
            This is our authentication system, please test this.
          </h2>
          <button
            onClick={() => signOut()}
            className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Sign Out
          </button>
        </>
      ) : (
        <Link href="signIn">
          <button
            onClick={() => signIn()}
            className="mt-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Sign Out
          </button>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
