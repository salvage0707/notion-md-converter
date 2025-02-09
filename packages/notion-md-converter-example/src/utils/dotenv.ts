import dotenv from "dotenv";

dotenv.config();

export const requiredEnvCheck = (envVars: string[]) => {
  for (const envVar of envVars) {
    if (!process.env[envVar]) {
      throw new Error(`${envVar} is not set`);
    }
  }
};
