import { useEffect, useMemo, useState } from "react";
import { getLinksClicked, getUserObjects, getUTMData, deleteUTMData } from "@/api/api";
import { zipToState } from "@/api/admin/util";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import Loader from "@/components/Loader";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
// } from "react-simple-maps";
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
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type PaginationState,
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

type UTMData = {
  id: string;
  ipAddress: string | null;
  location: string | null;
  date: string;
  type: string;
  origin: string;
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

const linksColumnHelper = createColumnHelper<LinkClickedData>();
const usersColumnHelper = createColumnHelper<UserObjectData>();
const utmColumnHelper = createColumnHelper<UTMData>();

const AnalyticsCharts = () => {
  useRequireAuth();

  const [linksData, setLinksData] = useState<LinkClickedData[]>([]);
  const [userObjectsData, setUserObjectsData] = useState<UserObjectData[]>([]);
  const [utmData, setUtmData] = useState<UTMData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [linksSorting, setLinksSorting] = useState<SortingState>([]);
  const [usersSorting, setUsersSorting] = useState<SortingState>([]);
  const [utmSorting, setUtmSorting] = useState<SortingState>([]);
  const [linksPagination, setLinksPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [usersPagination, setUsersPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [utmPagination, setUtmPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  // const [tooltipContent, setTooltipContent] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("pipaAdminAccessToken") || "";

        const [links, userObjects] = await Promise.all([
          getLinksClicked(token),
          getUserObjects(token),
        ]);

        let utm = [];
        try {
          utm = (await getUTMData(token)) || [];
        } catch (utmError) {
          console.warn("Failed to fetch UTM data", utmError);
        }

        setLinksData(links || []);
        setUserObjectsData(userObjects || []);
        setUtmData(utm || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete UTM record
  const handleDeleteUTM = async (id: string) => {
    if (!confirm("Are you sure you want to delete this UTM record?")) {
      return;
    }

    try {
      const token = localStorage.getItem("pipaAdminAccessToken") || "";
      await deleteUTMData(id, token);
      // Refresh the UTM data after deletion
      const updatedUtm = await getUTMData(token);
      setUtmData(updatedUtm || []);
    } catch (err) {
      alert(
        `Failed to delete record: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  };

  // Links table columns
  const linksColumns = [
    linksColumnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    linksColumnHelper.accessor("provider", {
      header: "Provider",
      cell: (info) => info.getValue(),
    }),
    linksColumnHelper.accessor("planName", {
      header: "Plan Name",
      cell: (info) => info.getValue(),
    }),
    linksColumnHelper.accessor("planDeductible", {
      header: "Deductible",
      cell: (info) => `$${info.getValue()}`,
    }),
    linksColumnHelper.accessor("planReimbursementPercentage", {
      header: "Reimbursement %",
      cell: (info) => `${info.getValue()}%`,
    }),
    linksColumnHelper.accessor("planReimbursementLimit", {
      header: "Reimbursement Limit",
      cell: (info) => `$${info.getValue()}`,
    }),
    linksColumnHelper.accessor("planMonthlyPrice", {
      header: "Monthly Price",
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    linksColumnHelper.accessor("createdAt", {
      header: "Date Clicked",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
  ];

  // Users table columns
  const usersColumns = [
    usersColumnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("zip", {
      header: "ZIP Code",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("petName", {
      header: "Pet Name",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("animal", {
      header: "Pet Type",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("breed", {
      header: "Breed",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("petBreed", {
      header: "Pet Breed",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("age", {
      header: "Pet Age",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("petGender", {
      header: "Pet Gender",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("petWeight", {
      header: "Pet Weight",
      cell: (info) => info.getValue(),
    }),
    usersColumnHelper.accessor("reference", {
      header: "Reference",
      cell: (info) => info.getValue() || "-",
    }),
    usersColumnHelper.accessor("createdAt", {
      header: "Created At",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
  ];

  const utmColumns = [
    utmColumnHelper.accessor("origin", {
      header: "Origin",
      cell: (info) => info.getValue() || "-",
    }),
    utmColumnHelper.accessor("type", {
      header: "Type",
      cell: (info) => info.getValue() || "-",
    }),
    utmColumnHelper.accessor("date", {
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleString(),
    }),
    utmColumnHelper.accessor("id", {
      header: "Actions",
      cell: (info) => (
        <button
          onClick={() => handleDeleteUTM(info.getValue())}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      ),
    }),
  ];

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

  const stateDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    userObjectsData.forEach((user) => {
      if (user.zip) {
        console.log("Processing ZIP code:", user.zip);
        const state = zipToState(user.zip);
        console.log("from state:", state);
        if (state !== "Unknown") {
          counts[state] = (counts[state] || 0) + 1;
        }
      }
    });
    // Convert to array format for charts and sort by count descending
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [userObjectsData]);

  // Create tables
  const linksTable = useReactTable({
    data: linksData,
    columns: linksColumns,
    state: {
      sorting: linksSorting,
      pagination: linksPagination,
    },
    onSortingChange: setLinksSorting,
    onPaginationChange: setLinksPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const usersTable = useReactTable({
    data: userObjectsData,
    columns: usersColumns,
    state: {
      sorting: usersSorting,
      pagination: usersPagination,
    },
    onSortingChange: setUsersSorting,
    onPaginationChange: setUsersPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const utmTable = useReactTable({
    data: utmData,
    columns: utmColumns,
    state: {
      sorting: utmSorting,
      pagination: utmPagination,
    },
    onSortingChange: setUtmSorting,
    onPaginationChange: setUtmPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // // Map state abbreviations to full names for the map
  // const stateAbbrToName: Record<string, string> = {
  //   AL: "Alabama",
  //   AK: "Alaska",
  //   AZ: "Arizona",
  //   AR: "Arkansas",
  //   CA: "California",
  //   CO: "Colorado",
  //   CT: "Connecticut",
  //   DE: "Delaware",
  //   FL: "Florida",
  //   GA: "Georgia",
  //   HI: "Hawaii",
  //   ID: "Idaho",
  //   IL: "Illinois",
  //   IN: "Indiana",
  //   IA: "Iowa",
  //   KS: "Kansas",
  //   KY: "Kentucky",
  //   LA: "Louisiana",
  //   ME: "Maine",
  //   MD: "Maryland",
  //   MA: "Massachusetts",
  //   MI: "Michigan",
  //   MN: "Minnesota",
  //   MS: "Mississippi",
  //   MO: "Missouri",
  //   MT: "Montana",
  //   NE: "Nebraska",
  //   NV: "Nevada",
  //   NH: "New Hampshire",
  //   NJ: "New Jersey",
  //   NM: "New Mexico",
  //   NY: "New York",
  //   NC: "North Carolina",
  //   ND: "North Dakota",
  //   OH: "Ohio",
  //   OK: "Oklahoma",
  //   OR: "Oregon",
  //   PA: "Pennsylvania",
  //   RI: "Rhode Island",
  //   SC: "South Carolina",
  //   SD: "South Dakota",
  //   TN: "Tennessee",
  //   TX: "Texas",
  //   UT: "Utah",
  //   VT: "Vermont",
  //   VA: "Virginia",
  //   WA: "Washington",
  //   WV: "West Virginia",
  //   WI: "Wisconsin",
  //   WY: "Wyoming",
  //   DC: "District of Columbia",
  // };

  // // Create reverse lookup: state name -> count
  // const stateNameDistribution = useMemo(() => {
  //   const nameCounts: Record<string, number> = {};
  //   Object.entries(stateDistribution).forEach(([abbr, count]) => {
  //     const name = stateAbbrToName[abbr];
  //     if (name) {
  //       nameCounts[name] = count;
  //     }
  //   });
  //   return nameCounts;
  // }, [stateDistribution]);

  const downloadLinksCSV = () => {
    const headers = [
      "Email",
      "Provider",
      "Plan Name",
      "Deductible",
      "Reimbursement %",
      "Reimbursement Limit",
      "Monthly Price",
      "Date Clicked",
    ];

    const rows = linksData.map((row) => [
      row.email,
      row.provider,
      row.planName,
      row.planDeductible,
      row.planReimbursementPercentage,
      row.planReimbursementLimit,
      row.planMonthlyPrice.toFixed(2),
      new Date(row.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `analytics-links-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadUsersCSV = () => {
    const headers = [
      "Email",
      "First Name",
      "Last Name",
      "ZIP Code",
      "Pet Name",
      "Pet Type",
      "Breed",
      "Pet Breed",
      "Pet Age (in days)",
      "Pet Gender",
      "Pet Weight",
      "Reference",
      "Created At",
    ];

    const rows = userObjectsData.map((row) => [
      row.email,
      row.firstName,
      row.lastName,
      row.zip,
      row.petName,
      row.animal,
      row.breed,
      row.petBreed,
      row.age,
      row.petGender,
      row.petWeight,
      row.reference || "",
      new Date(row.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `analytics-users-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      {/* Links Clicked Table */}
      <div className="mb-12 bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-(--primary-teal-dark)">
            Links Clicked ({linksData.length} total)
          </h2>
          <button
            onClick={downloadLinksCSV}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary-teal) text-white rounded-lg hover:bg-(--primary-teal-dark) transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-(--light-pink)">
              {linksTable.getHeaderGroups().map((headerGroup) => (
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
              {linksTable.getRowModel().rows.map((row) => (
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
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-(--text-light)">
            <span>
              Showing {linksTable.getState().pagination.pageIndex * 20 + 1} to{" "}
              {Math.min(
                (linksTable.getState().pagination.pageIndex + 1) * 20,
                linksData.length,
              )}{" "}
              of {linksData.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => linksTable.previousPage()}
                disabled={!linksTable.getCanPreviousPage()}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {linksTable.getState().pagination.pageIndex + 1} of{" "}
                {linksTable.getPageCount()}
              </span>
              <button
                onClick={() => linksTable.nextPage()}
                disabled={!linksTable.getCanNextPage()}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Submissions Table */}
      <div className="mb-12 bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-(--primary-teal-dark)">
            Form Submissions (unique) ({userObjectsData.length} total)
          </h2>
          <button
            onClick={downloadUsersCSV}
            className="flex items-center gap-2 px-4 py-2 bg-(--primary-teal) text-white rounded-lg hover:bg-(--primary-teal-dark) transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-(--light-pink)">
              {usersTable.getHeaderGroups().map((headerGroup) => (
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
              {usersTable.getRowModel().rows.map((row) => (
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
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-(--text-light)">
            <span>
              Showing {usersTable.getState().pagination.pageIndex * 20 + 1} to{" "}
              {Math.min(
                (usersTable.getState().pagination.pageIndex + 1) * 20,
                userObjectsData.length,
              )}{" "}
              of {userObjectsData.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => usersTable.previousPage()}
                disabled={!usersTable.getCanPreviousPage()}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {usersTable.getState().pagination.pageIndex + 1} of{" "}
                {usersTable.getPageCount()}
              </span>
              <button
                onClick={() => usersTable.nextPage()}
                disabled={!usersTable.getCanNextPage()}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UTM Data Table */}
      <div className="mb-12 bg-white rounded-lg shadow overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-(--primary-teal-dark)">
            UTM Data ({utmData.length} total)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-(--light-pink)">
              {utmTable.getHeaderGroups().map((headerGroup) => (
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
              {utmTable.getRowModel().rows.map((row) => (
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
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-(--text-light)">
            <span>
              Showing {utmTable.getState().pagination.pageIndex * 20 + 1} to{" "}
              {Math.min(
                (utmTable.getState().pagination.pageIndex + 1) * 20,
                utmData.length,
              )}{" "}
              of {utmData.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => utmTable.previousPage()}
                disabled={!utmTable.getCanPreviousPage()}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {utmTable.getState().pagination.pageIndex + 1} of{" "}
                {utmTable.getPageCount()}
              </span>
              <button
                onClick={() => utmTable.nextPage()}
                disabled={!utmTable.getCanNextPage()}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
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
                {providerDistribution.map((_, index) => (
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
                {animalDistribution.map((_, index) => (
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

      {/* State Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-xl font-semibold mb-4 text-(--primary-teal-dark)">
          User Distribution by State
        </h2>
        <div className="overflow-x-auto">
          <div
            style={{
              minWidth: `${Math.max(800, stateDistribution.length * 60)}px`,
              height: "400px",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend align="left" />
                <Bar dataKey="value" fill="#2d6a7b" name="Number of Users" />
              </BarChart>
            </ResponsiveContainer>
          </div>
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

      {/* US Map */}
      {/* <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-(--primary-teal-dark)">
          Geographic Distribution (by State)
        </h2>
        <div className="relative w-full max-w-4xl mx-auto">
          <ComposableMap projection="geoAlbersUsa">
            <ZoomableGroup>
              <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;
                    const count = stateNameDistribution[stateName] || 0;
                    const maxCount = Math.max(
                      ...Object.values(stateNameDistribution),
                      1,
                    );
                    const opacity =
                      count > 0 ? 0.3 + (count / maxCount) * 0.7 : 0.1;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          count > 0
                            ? `rgba(237, 150, 144, ${opacity})`
                            : "#e0e0e0"
                        }
                        stroke="#fff"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (count > 0) {
                            setTooltipContent(
                              `${stateName}: ${count} user${count !== 1 ? "s" : ""}`,
                            );
                          }
                        }}
                        onMouseLeave={() => {
                          setTooltipContent("");
                        }}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            fill: count > 0 ? "#2d6a7b" : "#e0e0e0",
                            outline: "none",
                            cursor: count > 0 ? "pointer" : "default",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          {tooltipContent && (
            <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 pointer-events-none">
              <p className="text-sm font-semibold text-(--primary-teal-dark)">
                {tooltipContent}
              </p>
            </div>
          )}
        </div>
      </div> */}
    </div>
  );
};

export default AnalyticsCharts;
