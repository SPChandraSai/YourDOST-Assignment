import { Mail } from "lucide-react";

export default function UserTable({ users }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-400 bg-gray">
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            User Id
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Email
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                            Name
                        </th>
                        <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold">
                            Avatar
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr
                            key={user.id}
                            className="border-b border-gray-300 hover:bg-gray-700 transition-colors"
                        >
                            {/* User Icon */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    {user.id}
                                </div>
                            </td>

                            {/* Email */}
                            <td className="px-6 py-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                    <span className="truncate">{user.email}</span>
                                </div>
                            </td>

                            {/* Name */}
                            <td className="px-6 py-4 text-sm font-medium">
                                {user.first_name} {user.last_name}
                            </td>

                            {/* Avatar */}
                            <td className="hidden md:table-cell px-6 py-4">
                                <img
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={`${user.first_name} ${user.last_name}`}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}