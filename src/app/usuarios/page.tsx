import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { createUser, deleteUser } from "./actions";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await requireAdmin();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <AppShell
      subtitle="Gerencie os usuarios que podem acessar o admin."
      title="Usuarios"
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3 }} variant="outlined">
            <Typography fontWeight={800} gutterBottom variant="h6">
              Novo usuario
            </Typography>
            <Stack action={createUser} component="form" spacing={2}>
              <TextField label="Nome" name="name" required />
              <TextField label="Email" name="email" required type="email" />
              <TextField label="Senha" name="password" required type="password" />
              <FormControl>
                <InputLabel id="role-label">Perfil</InputLabel>
                <Select
                  defaultValue="USER"
                  label="Perfil"
                  labelId="role-label"
                  name="role"
                >
                  <MenuItem value="USER">Usuario</MenuItem>
                  <MenuItem value="ADMIN">Admin</MenuItem>
                </Select>
              </FormControl>
              <Button startIcon={<AddIcon />} type="submit" variant="contained">
                Adicionar usuario
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2}>
            {users.map((user) => (
              <Paper key={user.id} sx={{ p: 3 }} variant="outlined">
                <Stack
                  alignItems={{ xs: "stretch", sm: "center" }}
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Stack>
                    <Typography fontWeight={800}>{user.name}</Typography>
                    <Typography color="text.secondary">{user.email}</Typography>
                    <Typography color="primary" fontWeight={700} variant="body2">
                      {user.role}
                    </Typography>
                  </Stack>
                  <form action={deleteUser}>
                    <input name="id" type="hidden" value={user.id} />
                    <Button color="error" startIcon={<DeleteIcon />} type="submit">
                      Remover
                    </Button>
                  </form>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </AppShell>
  );
}
