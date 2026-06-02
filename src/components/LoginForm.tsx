"use client";

import LockIcon from "@mui/icons-material/Lock";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState(searchParams.get("error") ?? "");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "/dashboard"
    });

    setLoading(false);

    if (!result?.ok) {
      setError("Email ou senha invalidos.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Stack action={handleSubmit} component="form" spacing={2}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField
        autoComplete="email"
        defaultValue="admin@livraria67.local"
        label="Email"
        name="email"
        required
        type="email"
      />
      <TextField
        autoComplete="current-password"
        defaultValue="admin123"
        label="Senha"
        name="password"
        required
        type="password"
      />
      <Button
        disabled={loading}
        size="large"
        startIcon={<LockIcon />}
        type="submit"
        variant="contained"
      >
        Entrar
      </Button>
    </Stack>
  );
}
