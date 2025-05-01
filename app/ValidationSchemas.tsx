import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Descriptio is required"),
});
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Descriptio is required")
    .max(65535)
    .optional(),
  assigneToUserId: z
    .string()
    .min(1, "assigneeToUserId is requerid")
    .max(255)
    .optional()
    .nullable(),
});
