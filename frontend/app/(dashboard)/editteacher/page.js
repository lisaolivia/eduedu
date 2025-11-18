"use client";
import React, { Suspense } from "react";
import FormContainer from "../../components/userPage/FormContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

function PageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("id");

  const teacherFields = [
    { id: "teacherName", label: "Nama", type: "text", placeholder: "Select" },
    { id: "teacherEmail", label: "Email", type: "text", placeholder: "Select" },
    { id: "teacherPassword", label: "Password", type: "password", placeholder: "Select" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accountId) {
      alert("ID akun tidak ditemukan di URL");
      return;
    }

    const values = {};
    teacherFields.forEach((f) => {
      const el = document.getElementById(f.id);
      values[f.id] = el ? el.value : "";
    });

    try {
      await apiFetch(`/api/users/${accountId}`, {
        method: "PUT",
        body: JSON.stringify({
          role: "teacher",
          name: values.teacherName,
          email: values.teacherEmail,
          password: values.teacherPassword || undefined,
        }),
      });
      

      alert("Akun guru berhasil diupdate");
      router.push("/admin/users");
    } catch (err) {
      console.error(err);
      alert(err.message || "Gagal menyimpan perubahan akun guru");
    }
  };

  return <FormContainer title="Edit Akun Guru" fields={teacherFields} onSubmit={handleSubmit} />;
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0D58AB] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat halaman...</p>
        </div>
      </div>
    }>
      <PageContent />
    </Suspense>
  );
}
