import bcrypt from "bcryptjs";

export async function isHashCodeEqual(code: string, codeToCompare: string): Promise<boolean> {
  return bcrypt.compare(code, codeToCompare);
}

// (opcional) versión síncrona
export function isHashCodeEqualSync(code: string, codeToCompare: string): boolean {
  return bcrypt.compareSync(code, codeToCompare);
}
