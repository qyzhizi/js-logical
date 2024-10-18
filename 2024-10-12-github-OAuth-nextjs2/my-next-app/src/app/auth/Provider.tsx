// src/app/auth/Provider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
// import { ReactNode } from "react";

const AuthProvider = ({ children }: any) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;