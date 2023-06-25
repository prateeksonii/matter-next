"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { insertWorkspaceSchema } from "@/models/workspace";
import { useEffect, useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { SheetClose } from "./ui/sheet";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

export default function WorkspaceForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasErrors, setHasErrors] = useState<boolean>(true);
  const form = useForm<z.infer<typeof insertWorkspaceSchema>>({
    resolver: zodResolver(insertWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const [, startTransition] = useTransition();

  async function onSubmit(values: z.infer<typeof insertWorkspaceSchema>) {
    setLoading(true);
    const res = await fetch(`/api/workspaces`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    setLoading(false);

    startTransition(() => {
      toast({
        title: values.name,
        description: "Workspace created successfully",
      });
      router.refresh();
    });
  }

  useEffect(() => {
    console.log(form.formState);

    if (form.formState.isDirty && !form.formState.errors.name) {
      setHasErrors(false);
    } else {
      setHasErrors(true);
    }
  }, [form.formState]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My workspace" {...field} />
              </FormControl>
              <FormDescription>
                Should be unique and not contain special characters
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading || hasErrors}
        >
          {!loading && "Create"}
          {loading && (
            <>
              Creating <Loader2 size={20} className="animate-spin ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
