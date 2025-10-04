import { z } from "zod";

const teacherSchema = z.object({
    userId: z.string(),
    positions: z.array(z.string()),
    startDate: z.date(),
    endDate: z.date(),
    degree: z.array(z.object({
        level: z.string(),
        school: z.string(),
        major: z.string(),
        year: z.number(),
        isGraduated: z.boolean(),
    })),
});

export default teacherSchema;
