import { getHits } from "@/api/api";
// import AdminLoginForm from "@/components/AdminLoginForm";
import HitsDataTable from "@/components/datatables/HitsDataTable";
import Loader from "@/components/Loader";
import PageContainer from "@/components/PageContainer";
import type { HitsDataType } from "@/lib/types";
import { useEffect, useState } from "react";

const Admin = () => {
  const [hitsData, setHitsData] = useState<HitsDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHitsData = async () => {
    try {
      //   const token = localStorage.getItem("pipa-data-token");
      //   if (!token) return;
      const fetchedHits = await getHits(
        "G3WFtOTY5Kt3kpEYOCiWZbbZVMKIibsXIc4jGjJsKKIzELfVOLmrG9HUl4qHwHdB"
      );

      console.log("Fetched hits data:", fetchedHits);
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

//   const handleSubmit = async ({ email }: { email: string }) => {
//     console.log(email);
//     const response = await adminEmailPassword(email);
//     console.log(response);
//   };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      </PageContainer>
    );
  }

//   if (hitsData.length === 0) {
//     return (
//       <PageContainer className="flex flex-col items-center justify-center">
//         <AdminLoginForm onSubmit={handleSubmit} />
//       </PageContainer>
//     );
//   }

  return (
    <PageContainer>
      <HitsDataTable data={hitsData} />
    </PageContainer>
  );
};

export default Admin;
