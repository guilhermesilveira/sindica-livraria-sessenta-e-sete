"use client";

import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <Button
      color="inherit"
      size="small"
      startIcon={<LogoutIcon />}
      onClick={() => void signOut({ callbackUrl: "/login" })}
    >
      Sair
    </Button>
  );
}
