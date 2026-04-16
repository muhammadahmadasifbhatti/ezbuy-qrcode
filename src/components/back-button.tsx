"use client";

import { ArrowLeftIcon } from "lucide-react";

export function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="cursor-pointer absolute -left-12 top-0 text-gray-600 hover:text-black print:hidden"
    >
      <ArrowLeftIcon className="size-6" />
    </button>
  );
}
