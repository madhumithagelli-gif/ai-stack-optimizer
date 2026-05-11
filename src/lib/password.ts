export function passwordStrength(pw: string): { score: 0|1|2|3|4; label: string; color: string } {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw) && pw.length >= 12) s++;
  const map = [
    { label: "Too short", color: "oklch(0.6 0.2 25)" },
    { label: "Weak",      color: "oklch(0.7 0.2 40)" },
    { label: "Okay",      color: "oklch(0.78 0.18 80)" },
    { label: "Strong",    color: "oklch(0.78 0.16 160)" },
    { label: "Excellent", color: "oklch(0.78 0.16 200)" },
  ] as const;
  return { score: s as 0|1|2|3|4, ...map[s] };
}

export const isEmail = (e: string) => /^\S+@\S+\.\S+$/.test(e);
