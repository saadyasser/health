export interface UserResponse {
    doc: {
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string
        username: string;
        fullName: string;
        phone: string;
        email: string;
        id: string; // MongoDB ObjectId or similar
        loginAttempts: number;
    };
    message: string;
}