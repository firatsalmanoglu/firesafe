// components/DeviceFeatureSelect.tsx
"use client";

import { useEffect, useState } from "react";

interface DeviceFeature {
  id: string;
  name: string;
}

interface DeviceFeatureSelectProps {
  defaultValue?: string;
  register: any;
  error?: any;
  isLoading?: boolean;
}

const DeviceFeatureSelect = ({ defaultValue, register, error, isLoading = false }: DeviceFeatureSelectProps) => {
  const [features, setFeatures] = useState<DeviceFeature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch('/api/deviceFeatures');
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching device features:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (loading || isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        <label className="text-xs text-gray-500">Cihaz Özelliği</label>
        <select disabled className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full bg-gray-100">
          <option>Yükleniyor...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full md:w-1/3">
      <label className="text-xs text-gray-500">Cihaz Özelliği</label>
      <select
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...register("featureId")}
        defaultValue={defaultValue || ""}
      >
        <option value="">Özellik Seçiniz</option>
        {features.map((feature) => (
          <option key={feature.id} value={feature.id}>{feature.name}</option>
        ))}
      </select>
      {error?.message && (
        <p className="text-xs text-red-400">{error.message}</p>
      )}
    </div>
  );
};

export default DeviceFeatureSelect;