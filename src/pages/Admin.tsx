import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminEmailPassword } from "@/api/api";
import Loader from "@/components/Loader";
import PageContainer from "@/components/PageContainer";
import { useState } from "react";
import AdminTokenForm from "@/components/admin/AdminTokenForm";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminBlogForm from "@/components/admin/AdminBlogForm";

/* deprecated admin page - see Admin.tsx for new version */
const Admin = () => {
  const [loading] = useState<boolean>(false);
  const [authenticated] = useState<boolean>(true);
  const [emailResponse, setEmailResponse] = useState<string>("");

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

  if (authenticated === false) {
    return (
      <PageContainer className="flex flex-col items-center justify-start gap-0">
        <AdminTokenForm onSubmit={handleTokenSubmit} className="text-center" />
        <span className="w-full text-center">Don't have a token?</span>
        <AdminLoginForm onSubmit={handleEmailSubmit} className="text-center" />
        <p className="w-full text-center">{emailResponse}</p>
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
