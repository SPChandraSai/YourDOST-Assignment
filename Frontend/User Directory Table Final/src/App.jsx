import { Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import useSWR from "swr";
import UserTable from "./components/user-table";

const fetcher = (url) =>
  fetch(url, {
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  }).then((r) => r.json());

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("firstName");
  const [filterDomain, setFilterDomain] = useState("");
  const [filterLetter, setFilterLetter] = useState("");

  const { data, error, isLoading } = useSWR(
    `https://reqres.in/api/users?page=${currentPage}`,
    fetcher,
    { revalidateOnFocus: false }
  );

  // Filter + Sort logic
  const filteredUsers = useMemo(() => {
    if (!data?.data) return [];

    let users = [...data.data];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      users = users.filter(
        (u) =>
          u.first_name.toLowerCase().includes(q) ||
          u.last_name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }

    // Filter domain
    if (filterDomain) {
      users = users.filter((u) => u.email.includes(filterDomain.toLowerCase()));
    }

    // Filter letter
    if (filterLetter) {
      users = users.filter((u) =>
        u.first_name.toLowerCase().startsWith(filterLetter.toLowerCase())
      );
    }

    // Sort
    users.sort((a, b) => {
      if (sortBy === "firstName") {
        return a.first_name.localeCompare(b.first_name);
      } else if (sortBy === "User_Id") {
        // numeric sort by id (ascending)
        return Number(a.id) - Number(b.id);
      } else {
        return a.email.localeCompare(b.email);
      }
    });

    return users;
  }, [data?.data, searchQuery, sortBy, filterDomain, filterLetter]);

  const totalPages = data?.total_pages ?? 1;

  return (
    <main className="min-h-screen w-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">User Directory</h1>
          <p className="text-gray-300">
            Browse and search through {data?.total ?? 0} users
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 shadow p-6 rounded mb-6">
          <div className="space-y-4">
            {/* Search + Sort */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Search by name or email
                </label>
                <input
                  className="w-full border p-2 rounded"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="firstName">First Name</option>
                  <option value="email">Email</option>
                  <option value="User_Id">User Id</option>
                </select>
              </div>
            </div>

            {/* Filters */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {/* Domain Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Filter by email domain
                </label>
                <input
                  className="w-full border p-2 rounded"
                  placeholder="e.g., gmail.com"
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                />
              </div>

              {/* First Letter Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Filter by first letter
                </label>
                <input
                  className="w-full border p-2 rounded"
                  placeholder="A"
                  maxLength={1}
                  value={filterLetter}
                  onChange={(e) => setFilterLetter(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="bg-gray-800 p-12 rounded shadow flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
            <p className="text-gray-500">Loading users...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-gray-800 p-6 rounded shadow text-red-600">
            Failed to load users. Please try again.
          </div>
        )}

        {/* Table */}
        {data && !isLoading && (
          <>
            <div className="bg-gray-800 rounded shadow overflow-hidden">
              <UserTable users={filteredUsers} />
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="bg-gray-800 p-12 rounded shadow text-center">
                <p className="text-gray-500">
                  No users found matching your filters
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-300">
                Page <strong>{currentPage}</strong> of{" "}
                <strong>{totalPages}</strong>
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="px-4 py-2 border rounded bg-gray-800 disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || isLoading}
                  className="px-4 py-2 border rounded bg-gray-800 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}