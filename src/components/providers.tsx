"use client";

import { Session } from "@supabase/supabase-js";
import { createContext, useState } from "react";

//? 始祖のプロバイダ //////////////////////////////////////////////////
const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;

//? セッション監視のプロバイダ /////////////////////////////////////////
type SessionType = {
  session: Session | null;
  setSession: (session: Session | null) => void;
};

export const SessionContext = createContext<SessionType>({
  session: null,
  setSession: () => {},
});

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);
  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};
