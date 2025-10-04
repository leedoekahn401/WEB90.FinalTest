import { z } from "zod";

const positionSchema = z.object({
    name: z.string(),
    des: z.string(),
});

export default positionSchema;
