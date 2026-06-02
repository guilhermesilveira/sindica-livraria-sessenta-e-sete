import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { getCartDetails } from "@/lib/cart";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCartDetails();

  return (
    <Box minHeight="100vh" sx={{ bgcolor: "#f6f1e8" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Stack spacing={3}>
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{ alignSelf: "flex-start" }}
          >
            Continuar comprando
          </Button>

          <Stack spacing={1}>
            <Typography component="h1" fontWeight={950} variant="h3">
              Carrinho
            </Typography>
            <Typography color="text.secondary">
              Os valores ficam fixos nesta versão: ainda não há edição de
              quantidade, cupom ou checkout.
            </Typography>
          </Stack>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                {cart.items.length === 0 ? (
                  <Paper sx={{ p: 4 }} variant="outlined">
                    <Typography fontWeight={800}>Seu carrinho está vazio.</Typography>
                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                      Escolha um livro no catálogo para começar uma compra demo.
                    </Typography>
                  </Paper>
                ) : null}

                {cart.items.map((item) => (
                  <Paper key={item.product.id} sx={{ p: 2.5 }} variant="outlined">
                    <Grid alignItems="center" container spacing={2}>
                      <Grid size={{ xs: 4, sm: 2 }}>
                        <Box
                          alt=""
                          component="img"
                          src={item.product.imageUrl}
                          sx={{
                            borderRadius: 1,
                            maxHeight: 120,
                            objectFit: "contain",
                            width: "100%"
                          }}
                        />
                      </Grid>
                      <Grid size={{ xs: 8, sm: 6 }}>
                        <Typography fontWeight={900}>{item.product.title}</Typography>
                        <Typography color="text.secondary" variant="body2">
                          {item.product.author}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 2 }}>
                        <Typography color="text.secondary" variant="body2">
                          Quantidade
                        </Typography>
                        <Typography fontWeight={800}>{item.quantity}</Typography>
                      </Grid>
                      <Grid size={{ xs: 6, sm: 2 }}>
                        <Typography color="text.secondary" variant="body2">
                          Subtotal
                        </Typography>
                        <Typography fontWeight={900}>
                          {formatPrice(item.subtotalInCents)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, position: { md: "sticky" }, top: 24 }} variant="outlined">
                <Stack spacing={2}>
                  <Typography fontWeight={950} variant="h6">
                    Resumo do pedido
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="text.secondary">Itens</Typography>
                    <Typography>{cart.totalQuantity}</Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight={900}>Total</Typography>
                    <Typography color="primary" fontWeight={950} variant="h5">
                      {formatPrice(cart.totalInCents)}
                    </Typography>
                  </Stack>
                  <Button disabled fullWidth startIcon={<LockIcon />} variant="contained">
                    Checkout indisponível
                  </Button>
                  <Typography color="text.secondary" variant="body2">
                    Esta tela é apenas uma prévia fixa para aula. Nenhum estoque ou
                    pagamento é alterado aqui.
                  </Typography>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
}
