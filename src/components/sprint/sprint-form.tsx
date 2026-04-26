"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const SprintForm = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Submit logice here...
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... form fields for sprint creation ... */}
      <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? "Creando..." : "Crear Sprint"}
      </button>
    </form>
  );
};
