import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface AuthButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant: "default" | "outline";
}

const AuthButton = ({ onClick, children, variant }: AuthButtonProps) => {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
};

export const LogInButton = () => {
  return (
    <AuthButton onClick={() => signIn()} variant={"default"}>
      Log In
    </AuthButton>
  );
};

export const LogOutButton = () => {
  return (
    <AuthButton onClick={() => signOut()} variant={"outline"}>
      Log Out
    </AuthButton>
  );
};