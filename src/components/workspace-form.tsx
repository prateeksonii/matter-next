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

export default function WorkspaceForm() {
  const form = useForm<z.infer<typeof insertWorkspaceSchema>>({
    resolver: zodResolver(insertWorkspaceSchema),
    defaultValues: {
      name: "",
    },
  });
  console.log(form.formState.errors);

  async function onSubmit(values: z.infer<typeof insertWorkspaceSchema>) {
    console.log("firsheret");
    const res = await fetch(`/api/workspaces`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
  }

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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
}
