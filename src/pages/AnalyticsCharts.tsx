import { useEffect, useState } from "react";
import { getLinksClicked, getUserObjects } from "@/api/api";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Loader from "@/components/Loader";

const AnalyticsCharts = () => {
  useRequireAuth();

  const [linksData, setLinksData] = useState<unknown>(null);
  const [userObjectsData, setUserObjectsData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("pipaAdminAccessToken") || "";

        const [links, userObjects] = await Promise.all([
          getLinksClicked(token),
          getUserObjects(token),
        ]);

        setLinksData(links);
        setUserObjectsData(userObjects);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Analytics Charts</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Links Clicked Data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(linksData, null, 2)}
        </pre>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Pet Objects Data</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
          {JSON.stringify(userObjectsData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
