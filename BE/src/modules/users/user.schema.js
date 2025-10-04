import { z } from "zod";

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    identity: z.string(),
    dob: z.date(),
    role: z.string(),
    isDeleted: z.boolean(),
});

export default userSchema;
