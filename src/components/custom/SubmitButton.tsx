"use client"

import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

function Loader({text}: {readonly text: string}) {
  return (
    <div className="flex gap-2">
      <Loader2 className="mr-2 size-4 animate-spin" />
      <p>{text}</p>
    </div>
  )
}

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
  loading?: boolean;
}

export function SubmitButton({text, loadingText, loading, className}: Readonly<SubmitButtonProps>) {
  const status = useFormStatus();
  return (
    <Button type="submit" aria-disabled={status.pending || loading} disabled={status.pending || loading} className={cn(className)}>
      {status.pending || loading ? <Loader text={loadingText} /> : text}
    </Button>
  )
}