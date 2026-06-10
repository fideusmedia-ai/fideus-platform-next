"use client";

import { useState, type ReactNode } from "react";
import LeadFormModal from "@/components/modals/LeadFormModal";

/**
 * Wrapper que abre el LeadFormModal al click en su children.
 * Útil en páginas server-rendered (caso de estudio) que necesitan
 * disparar el modal sin pasar a client-component completa.
 */
export default function LeadFormTrigger({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="inline-block bg-transparent border-0 p-0">
        {children}
      </button>
      <LeadFormModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
