import { adminEmailPassword } from "@/api/api";
import Loader from "@/components/Loader";
import PageContainer from "@/components/PageContainer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, Link } from "react-router-dom";
import { PIPA_API_URL } from "@/api/constants";

/* deprecated admin page - see Admin.tsx for new version */
const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [emailResponse, setEmailResponse] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");

  useEffect(() => {
    // Check if user is already authenticated via stored token
    const storedToken = localStorage.getItem("pipaAdminAccessToken");
    if (storedToken) {
      setAuthenticated(true);
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const response = await fetch(
        PIPA_API_URL + "api/v1/analytics/auth/login",
        {
          // const response = await fetch(PIPA_AUTH_URL + "/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setLoginError(errorData.message || "Invalid email or password");
        setPassword("");
        setLoading(false);
        return;
      }

      const res = await response.json();
      const { data } = res;
      console.log("Login successful:", data);
      if (data.accessToken) {
        localStorage.setItem("pipaAdminAccessToken", data.accessToken);
        setAuthenticated(true);
      } else {
        setLoginError("Login failed: No access token received");
        setPassword("");
      }
    } catch (error) {
      setLoginError("Connection error. Please try again.");
      setPassword("");
    } finally {
      setLoading(false);
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

  const handleSignOut = () => {
    localStorage.removeItem("pipaAdminAccessToken");
    window.location.reload();
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
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6">
      <Link to="/admin/blog/creator">
        <Button className="px-6 py-2">Go to Blog Tool</Button>
      </Link>
      <Link to="/admin/analytics/charts">
        <Button className="px-6 py-2">Go to Analytics</Button>
      </Link>
      <Button
        onClick={handleSignOut}
        variant="outline"
        className="px-6 py-2 border-red-500 text-red-500 hover:bg-red-50"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Admin;
