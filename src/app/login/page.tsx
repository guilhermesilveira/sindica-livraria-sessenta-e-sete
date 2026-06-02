import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/LoginForm";
import { authOptions } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <Box minHeight="100vh" sx={{ alignItems: "center", display: "flex" }}>
      <Container maxWidth="xs">
        <Paper sx={{ p: 4 }} variant="outlined">
          <Stack spacing={3}>
            <Stack alignItems="center" spacing={1}>
              <AutoStoriesIcon color="primary" fontSize="large" />
              <Typography component="h1" fontWeight={900} variant="h5">
                Livraria 67
              </Typography>
              <Typography color="text.secondary" textAlign="center">
                Acesse com o usuario admin seedado.
              </Typography>
            </Stack>
            <LoginForm />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
