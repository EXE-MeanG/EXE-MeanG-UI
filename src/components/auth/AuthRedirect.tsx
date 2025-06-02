import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/stores/authStore";

interface AuthRedirectProps {
  children: React.ReactNode;
  mode: "auth" | "protected";
}

export default function AuthRedirect({ children, mode }: AuthRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const authData = localStorage.getItem("auth-storage");
    const isAuthenticated = !!authData;

    if (mode === "auth" && isAuthenticated) {
      // If user is authenticated and tries to access auth pages (login/register)
      router.push("/");
    } else if (mode === "protected" && !isAuthenticated) {
      // If user is not authenticated and tries to access protected pages
      router.push("/login");
    }
  }, [mode]);

  return <>{children}</>;
}
