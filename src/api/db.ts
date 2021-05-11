import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

// export interface User {
//   id: number;
//   email: string;
//   name: string;
// }
// export interface Db {
//   users: User[];
// }
// export const db: Db = {
//   users: [{ id: 1, email: "Nexus", name: "Test" }],
// };
