"use client";
import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignIn() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <div>用户信息：{JSON.stringify(session.user)}</div>
        <button onClick={() => signOut()}>退出登录</button>
      </>
    );
  }
  
  return (
    <button onClick={() => signIn('github')}>点击登录 GitHub</button>
  );
}