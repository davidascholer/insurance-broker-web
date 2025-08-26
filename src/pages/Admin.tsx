import { adminEmailPassword, getHits } from "@/api/api";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminTokenForm from "@/components/admin/AdminTokenForm";
import HitsDataTable from "@/components/datatables/HitsDataTable";
import LinksClickedDataTable from "@/components/datatables/LinksClickedDataTable";
import UserInfoDataTable from "@/components/datatables/UserInfoDataTable";
import Loader from "@/components/Loader";
import PageContainer from "@/components/PageContainer";
import type { HitsDataType } from "@/lib/types";
import { useEffect, useState } from "react";

const Admin = () => {
  const [hitsData, setHitsData] = useState<HitsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailResponse, setEmailResponse] = useState<string>("");

  const fetchHitsData = async () => {
    try {
      const token = localStorage.getItem("pipa-data-token");
      if (!token) return;
      const fetchedHits = await getHits(token);
      if (fetchedHits && Array.isArray(fetchedHits)) {
        setHitsData(fetchedHits);
      }
    } catch (error) {
      console.error("Failed to fetch hits data:", error);
    }
  };

  useEffect(() => {
    fetchHitsData();
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const handleEmailSubmit = async ({ email }: { email: string }) => {
    const response = await adminEmailPassword(email);
    setEmailResponse(response);
    setTimeout(() => {
      setEmailResponse("");
    }, 5000);
  };

  const handleTokenSubmit = ({ token }: { token: string }) => {
    localStorage.setItem("pipa-data-token", token);
    fetchHitsData();
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

  if (hitsData.length === 0) {
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
      <HitsDataTable data={hitsData} />
      <LinksClickedDataTable data={hitsData} />
      <UserInfoDataTable data={hitsData} />
    </PageContainer>
  );
};

export default Admin;
