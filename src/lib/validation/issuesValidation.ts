import { z } from "zod";
export default z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(10).max(500),
});