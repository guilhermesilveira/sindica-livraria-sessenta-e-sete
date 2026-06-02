import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleIcon from "@mui/icons-material/People";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  await requireAdmin();
  const [products, users, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.product.count({ where: { stock: { lte: 3 } } })
  ]);

  return (
    <AppShell
      subtitle="Resumo rapido para administradores da loja."
      title="Painel administrativo"
    >
      <Grid container spacing={2}>
        <Metric title="Produtos cadastrados" value={products} />
        <Metric title="Usuarios cadastrados" value={users} />
        <Metric title="Produtos com estoque baixo" value={lowStock} />
      </Grid>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
        <Button
          component={Link}
          href="/produtos"
          startIcon={<Inventory2Icon />}
          variant="contained"
        >
          Cadastrar produtos
        </Button>
        <Button
          component={Link}
          href="/usuarios"
          startIcon={<PeopleIcon />}
          variant="outlined"
        >
          Cadastrar usuarios
        </Button>
      </Stack>
    </AppShell>
  );
}

function Metric({ title, value }: { title: string; value: number }) {
  return (
    <Grid size={{ xs: 12, md: 4 }}>
      <Paper sx={{ p: 3 }} variant="outlined">
        <Box>
          <Typography color="text.secondary">{title}</Typography>
          <Typography fontWeight={900} variant="h3">
            {value}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}
