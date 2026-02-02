import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminEmailPassword } from "@/api/api";
import Loader from "@/components/Loader";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import AdminTokenForm from "@/components/admin/AdminTokenForm";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminBlogForm from "@/components/admin/AdminBlogForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

/* deprecated admin page - see Admin.tsx for new version */
const Admin = () => {
  const navigate = useNavigate();
  const [loading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [emailResponse, setEmailResponse] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    // Redirect to home page if in production build
    if (import.meta.env.PROD) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Simple authentication check - you should replace this with actual API call
    // For now, using hardcoded credentials (CHANGE THIS IN PRODUCTION)
    if (username === "admin" && password === "admin123") {
      setAuthenticated(true);
    } else {
      setLoginError("Invalid username or password");
      setPassword("");
    }
  };

  const handleEmailSubmit = async ({ email }: { email: string }) => {
    const response = await adminEmailPassword(email);
    setEmailResponse(response);
    setTimeout(() => {
      setEmailResponse("");
    }, 5000);
  };

  const handleTokenSubmit = ({ token }: { token: string }) => {
    localStorage.setItem("pipa-data-token", token);
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      </PageContainer>
    );
  }

  if (!authenticated) {
    return (
      <PageContainer className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Tabs defaultValue="blog">
        <TabsList className="w-full flex justify-center text-center  mb-8">
          <TabsTrigger value="blog" className="cursor-pointer">
            Blog
          </TabsTrigger>
          <TabsTrigger value="other" className="cursor-pointer">
            Other
          </TabsTrigger>
        </TabsList>
        <TabsContent value="blog">
          <AdminBlogForm onSubmit={(data) => console.log(data)} />
        </TabsContent>
        <TabsContent value="other">
          <div>No content. Implemented for future use.</div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Admin;
