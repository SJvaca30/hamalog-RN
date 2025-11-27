export const authKeys = {
  all: ['auth'] as const,
  emailCheck: (email: string) =>
    [...authKeys.all, 'email-check', email] as const,
} as const;
