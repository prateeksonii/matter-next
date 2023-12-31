import { workspaces } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const insertWorkspaceSchema = createInsertSchema(workspaces, {
  name: z.string().refine(
    async (name) => {
      const res = await fetch(`/api/workspaces/${name}`);
      return res.status === 404;
    },
    (name) => ({
      message: `The name ${name} already exists. Please use a different name`,
    })
  ),
  ownerId: z.string().optional(),
});

export const selectWorkspaceSchema = createSelectSchema(workspaces);

export type Workspace = z.infer<typeof selectWorkspaceSchema>;
