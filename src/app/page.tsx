"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(
    trpc.invoke.mutationOptions({
      onSuccess: () => {
        toast.success("Background job started");
      },
    })
  );

  return (
    <div className="flex p-6 gap-2 items-center">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => invoke.mutate({ value })}>Invoke Inngest</Button>
    </div>
  );
}
