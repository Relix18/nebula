"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onError: (error) => {
        toast.error(`Error creating project: ${error.message}`);
      },
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
    })
  );
  const messages = useQuery(trpc.messages.getMany.queryOptions());

  return (
    <>
      <div className="flex p-6 gap-2 items-center">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          disabled={createProject.isPending}
          onClick={() => createProject.mutate({ value })}
        >
          Submit
        </Button>
      </div>
      <p>{JSON.stringify(messages.data)}</p>
    </>
  );
}
