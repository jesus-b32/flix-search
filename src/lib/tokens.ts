import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { v4 as uuid } from "uuid";
import { db } from "@/server/db";
import { verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000); //expires in 1 hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, existingToken.id));
  }

  const verificationToken = await db.insert(verificationTokens).values({
    email,
    token,
    expires,
  });

  return verificationToken;
};
