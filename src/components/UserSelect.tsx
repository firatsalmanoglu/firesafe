// components/UserSelect.tsx
"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  userName: string;
  firstName: string | null;
  lastName: string | null;
}

interface UserSelectProps {
  label: string;
  name: string;
  defaultValue?: string;
  register: any;
  error?: any;
  isLoading?: boolean;
}

const UserSelect = ({ label, name, defaultValue, register, error, isLoading = false }: UserSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // API endpoint'i düzeltildi
        const response = await fetch('/api/users/list');
        const data = await response.json();
        console.log('Fetched users:', data); // Debug için log ekledik
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <label className="text-xs text-gray-500">{label}</label>
        <select disabled className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100">
          <option>Yükleniyor...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-1/3">
      <label className="text-xs text-gray-500">{label}</label>
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register(name)}
        defaultValue={defaultValue || ""}
      >
        <option value="">Kullanıcı Seçiniz</option>
        {users && users.length > 0 ? (
          users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}`
                : user.userName}
            </option>
          ))
        ) : (
          <option value="" disabled>Kullanıcı bulunamadı</option>
        )}
      </select>
      {error?.message && (
        <p className="text-xs text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default UserSelect;