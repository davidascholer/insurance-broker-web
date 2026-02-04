import { useEffect, useMemo, useState } from "react";
import { getLinksClicked, getUserObjects } from "@/api/api";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Loader from "@/components/Loader";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
} from "@tanstack/react-table";

type LinkClickedData = {
  id: string;
  email: string;
  provider: string;
  planName: string;
  planDeductible: number;
  planReimbursementPercentage: number;
  planReimbursementLimit: number;
  planMonthlyPrice: number;
  createdAt: string;
  updatedAt: string;
};

type UserObjectData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  zip: string;
  animal: string;
  breed: string;
  age: number;
  petGender: string;
  petName: string;
  petWeight: string;
  petBreed: string;
  reference: string | null;
  createdAt: string;
  updatedAt: string;
};

type CombinedData = LinkClickedData & {
  firstName?: string;
  lastName?: string;
  petName?: string;
  animal?: string;
  petBreed?: string;
};

const COLORS = [
  "#2d6a7b", // primary-teal
  "#ed9690", // primary-coral
  "#0c5163", // primary-teal-dark
  "#f5b5af", // coral-light
  "#f4c2c2", // coral-pink
  "#5d8a9a", // lighter teal
  "#d88781", // darker coral
  "#89a6b2", // light teal
];

const columnHelper = createColumnHelper<CombinedData>();

const AnalyticsCharts = () => {
  useRequireAuth();

  const [linksData, setLinksData] = useState<LinkClickedData[]>([]);
  const [userObjectsData, setUserObjectsData] = useState<UserObjectData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("pipaAdminAccessToken") || "";

        const [links, userObjects] = await Promise.all([
          getLinksClicked(token),
          getUserObjects(token),
        ]);

        setLinksData(links || []);
        setUserObjectsData(userObjects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const combinedData = useMemo(() => {
    return linksData.map((link) => {
      const user = userObjectsData.find((u) => u.email === link.email);
      return {
        ...link,
        firstName: user?.firstName,
        lastName: user?.lastName,
        petName: user?.petName,
        animal: user?.animal,
        petBreed: user?.petBreed,
      };
    });
  }, [linksData, userObjectsData]);

  const providerDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    linksData.forEach((link) => {
      const provider = link.provider.toLowerCase();
      counts[provider] = (counts[provider] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [linksData]);

  const animalDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    userObjectsData.forEach((user) => {
      const animal = user.animal;
      counts[animal] = (counts[animal] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [userObjectsData]);

  const priceRangeDistribution = useMemo(() => {
    const ranges = {
      "$0-$25": 0,
      "$25-$50": 0,
      "$50-$75": 0,
      "$75-$100": 0,
      "$100+": 0,
    };
    linksData.forEach((link) => {
      const price = link.planMonthlyPrice;
      if (price < 25) ranges["$0-$25"]++;
      else if (price < 50) ranges["$25-$50"]++;
      else if (price < 75) ranges["$50-$75"]++;
      else if (price < 100) ranges["$75-$100"]++;
      else ranges["$100+"]++;
    });
    return Object.entries(ranges).map(([name, value]) => ({ name, value }));
  }, [linksData]);

  const deductibleDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    linksData.forEach((link) => {
      const deductible = `$${link.planDeductible}`;
      counts[deductible] = (counts[deductible] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [linksData]);

  const columns = [
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("petName", {
      header: "Pet Name",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("animal", {
      header: "Pet Type",
      cell: (info) => info.getValue() || "-",
    }),
    columnHelper.accessor("provider", {
      header: "Provider",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("planName", {
      header: "Plan Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("planDeductible", {
      header: "Deductible",
      cell: (info) => `$${info.getValue()}`,
    }),
    columnHelper.accessor("planReimbursementPercentage", {
      header: "Reimbursement %",
      cell: (info) => `${info.getValue()}%`,
    }),
    columnHelper.accessor("planMonthlyPrice", {
      header: "Monthly Price",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor("createdAt", {
      header: "Date Clicked",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
  ];

  const table = useReactTable({
    data: combinedData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

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
    <div className="p-8 max-w-[1800px] mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-(--primary-teal-dark)">
        Analytics Dashboard
      </h1>

      {/* Sortable Table */}
      <div className="mb-12 bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-2xl font-semibold p-6 border-b text-(--primary-teal-dark)">
          Links Clicked ({combinedData.length} total)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-(--light-pink)">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-(--primary-teal-dark) uppercase tracking-wider cursor-pointer hover:bg-(--coral-pink)"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-(--background-light)">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 whitespace-nowrap text-sm text-(--text-dark)"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Provider Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-(--primary-teal-dark)">
            Clicks by Provider
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={providerDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {providerDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Animal Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-(--primary-teal-dark)">
            Pet Type Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={animalDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#82ca9d"
                dataKey="value"
              >
                {animalDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Price Range Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-(--primary-teal-dark)">
            Monthly Price Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={priceRangeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#ed9690" name="Number of Plans" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Deductible Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-(--primary-teal-dark)">
            Deductible Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deductibleDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2d6a7b" name="Number of Plans" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-(--text-light) text-sm font-medium">
            Total Clicks
          </h3>
          <p className="text-3xl font-bold mt-2 text-(--primary-coral)">
            {linksData.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-(--text-light) text-sm font-medium">
            Total Users
          </h3>
          <p className="text-3xl font-bold mt-2 text-(--primary-coral)">
            {userObjectsData.length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-(--text-light) text-sm font-medium">
            Avg Monthly Price
          </h3>
          <p className="text-3xl font-bold mt-2 text-(--primary-coral)">
            $
            {linksData.length > 0
              ? (
                  linksData.reduce((sum, l) => sum + l.planMonthlyPrice, 0) /
                  linksData.length
                ).toFixed(2)
              : "0.00"}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-(--text-light) text-sm font-medium">
            Unique Providers
          </h3>
          <p className="text-3xl font-bold mt-2 text-(--primary-coral)">
            {new Set(linksData.map((l) => l.provider.toLowerCase())).size}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
