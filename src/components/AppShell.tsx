import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/LogoutButton";

export function AppShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <Box minHeight="100vh">
      <Box component="header" sx={{ bgcolor: "primary.main", color: "white" }}>
        <Container maxWidth="lg">
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ minHeight: 64 }}
          >
            <Stack alignItems="center" direction="row" spacing={1.5}>
              <AutoStoriesIcon />
              <Typography fontWeight={800}>Livraria 67</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button
                color="inherit"
                component={Link}
                href="/dashboard"
                size="small"
              >
                Painel
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/produtos"
                size="small"
                startIcon={<Inventory2Icon />}
              >
                Produtos
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/usuarios"
                size="small"
                startIcon={<PeopleIcon />}
              >
                Usuarios
              </Button>
              <LogoutButton />
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography component="h1" fontWeight={800} variant="h4">
            {title}
          </Typography>
          <Typography color="text.secondary">{subtitle}</Typography>
        </Box>
        {children}
      </Container>
    </Box>
  );
}
