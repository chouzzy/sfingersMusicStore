import { Prisma } from "@prisma/client";


interface validationResponse {
    isValid: boolean;
    isEmpty?: boolean;
    errorMessage?: string | string[] | Prisma.PrismaClientKnownRequestError;
    successMessage?: string;
    statusCode: number;
}

export {validationResponse}