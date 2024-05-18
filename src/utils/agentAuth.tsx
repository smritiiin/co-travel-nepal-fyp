// components/withAuth.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Image, Button, Spacer } from "@nextui-org/react";
import { useToken } from "./token";

const agentAuth = (WrappedComponent: React.ComponentType) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const { isTokenAvailableAndNotExpired, getUsernameAndRoleFromToken } =
      useToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState("");

    useEffect(() => {
      const isTokenValid = isTokenAvailableAndNotExpired("x-access-token");
      const userRole = getUsernameAndRoleFromToken("x-access-token").role;

      setIsAuthenticated(isTokenValid);
      setRole(userRole);

      if (!isTokenValid || userRole !== "AGENT") {
        setIsAuthenticated(false);
        setRole("");
      }
    }, [isTokenAvailableAndNotExpired, getUsernameAndRoleFromToken, router]);

    const handleLoginRedirect = () => {
      router.push("/auth/login");
    };

    if (!isAuthenticated || role !== "AGENT") {
      return (
        <div className="flex h-screen justify-center items-center">
          <Card className="w-96 p-8 items-center flex">
            <Image
              alt="Not authenticated"
              height={150}
              width={150}
              className=" self-center"
              src="/images/admin/unauthorized.jpg"
            />
            <Spacer y={1} />
            <h3 className="font-bold text-lg"> You are not authenticated!</h3>
            <Spacer y={1} />
            <p>Please login to continue.</p>
            <Spacer y={1} />
            <Button color="primary" onPress={handleLoginRedirect}>
              Login
            </Button>
          </Card>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default agentAuth;
