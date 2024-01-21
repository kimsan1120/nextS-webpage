"use client";
import NavLink from "@/components/main-header/nav-link";
import { useFormStatus } from "react-dom";

export default function FormSubmit() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} href="/">
      
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
