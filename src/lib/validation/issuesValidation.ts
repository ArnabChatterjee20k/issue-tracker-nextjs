import { z } from "zod";
export default z.object({
  title: z
    .string()
    .min(1, "Title too small")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(10, "Description too small")
    .max(500, "Description should be less than 500 characters")
});
