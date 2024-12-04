// components/InstitutionSelect.tsx
"use client";

import { useEffect, useState } from "react";

interface Institution {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

interface InstitutionSelectProps {
  label: string;
  name: string;
  defaultValue?: string;
  register: any;
  error?: any;
  isLoading?: boolean;
  userId?: string; // Yeni prop: seçilen kullanıcının ID'si
}

const InstitutionSelect = ({ 
  label,
  name,
  defaultValue, 
  register, 
  error, 
  isLoading = false,
  userId 
}: InstitutionSelectProps) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        setLoading(true);
        let url = '/api/institutions';
        if (userId) {
          url += `?userId=${userId}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        setInstitutions(data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, [userId]); // userId değiştiğinde useEffect tetiklenecek

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs text-gray-500">{label}</label>
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register(name)}
        defaultValue={defaultValue || ""}
        disabled={loading || isLoading}
      >
        <option value="">Kurum Seçiniz</option>
        {institutions.map((institution) => (
          <option key={institution.id} value={institution.id}>
            {institution.name}
          </option>
        ))}
      </select>
      {error?.message && (
        <p className="text-xs text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default InstitutionSelect;