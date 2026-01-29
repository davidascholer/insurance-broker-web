import { useState } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import { PIPA_API_URL } from "@/api/constants";

const TestServer = () => {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const testServer = async () => {
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const url = `${PIPA_API_URL}test`;
      const res = await fetch(url);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-(--primary-teal-dark) sansita-bold mb-6">
            Server Test
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            <div>
              <p className="text-(--text-dark) nunito-sans mb-4">
                Test the connection to the server by clicking the button below.
              </p>
              <p className="text-sm text-gray-600 nunito-sans mb-4">
                Server URL: <code className="bg-gray-100 px-2 py-1 rounded">{PIPA_API_URL}test</code>
              </p>
            </div>

            <button
              onClick={testServer}
              disabled={loading}
              className="w-full px-6 py-3 bg-(--primary-teal) text-white font-semibold rounded-lg hover:bg-(--primary-teal-dark) disabled:opacity-50 disabled:cursor-not-allowed transition-colors sansita-regular"
            >
              {loading ? "Testing..." : "Test Server"}
            </button>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <h3 className="text-red-700 font-semibold mb-2 sansita-regular">
                  Error
                </h3>
                <p className="text-red-600 nunito-sans text-sm">{error}</p>
              </div>
            )}

            {response && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="text-green-700 font-semibold mb-2 sansita-regular">
                  Success! Server Response:
                </h3>
                <pre className="bg-white border border-gray-300 rounded p-4 overflow-x-auto text-sm nunito-sans">
                  {response}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestServer;
