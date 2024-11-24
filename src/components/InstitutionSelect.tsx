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
  label: string;  // label prop'unu ekledik
  name: string;   // name prop'unu ekledik
  defaultValue?: string;
  register: any;
  error?: any;
  isLoading?: boolean;
}

const InstitutionSelect = ({ 
  label,
  name,
  defaultValue, 
  register, 
  error, 
  isLoading = false 
}: InstitutionSelectProps) => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch('/api/institutions');
        const data = await response.json();
        setInstitutions(data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
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
        {...register(name)}  // name prop'unu kullan
        defaultValue={defaultValue || ""}
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