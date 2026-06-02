import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import Link from "next/link";
import { addToCart } from "@/app/carrinho/actions";
import { formatPrice } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug }
  });

  if (!product || !product.active) {
    notFound();
  }

  return (
    <Box minHeight="100vh" sx={{ bgcolor: "#f6f1e8" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              component={Link}
              href="/"
              startIcon={<ArrowBackIcon />}
              variant="text"
            >
              Voltar para a loja
            </Button>
            <Button
              component={Link}
              href="/carrinho"
              startIcon={<LocalMallIcon />}
              variant="outlined"
            >
              Carrinho
            </Button>
          </Stack>

          <Paper sx={{ overflow: "hidden" }} variant="outlined">
            <Grid container>
              <Grid size={{ xs: 12, md: 5 }}>
                <Box
                  sx={{
                    bgcolor: "#1f2933",
                    display: "grid",
                    minHeight: { xs: 380, md: 620 },
                    placeItems: "center",
                    p: 4
                  }}
                >
                  <Box
                    alt=""
                    component="img"
                    src={product.imageUrl}
                    sx={{
                      borderRadius: 1.5,
                      boxShadow: "0 28px 56px rgba(0,0,0,0.38)",
                      maxHeight: 500,
                      maxWidth: "88%",
                      objectFit: "contain"
                    }}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Stack spacing={3} sx={{ p: { xs: 3, md: 5 } }}>
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    <Chip label={product.category} />
                    <Chip label={product.publisher} variant="outlined" />
                  </Stack>

                  <Stack spacing={1}>
                    <Typography component="h1" fontWeight={950} variant="h3">
                      {product.title}
                    </Typography>
                    <Typography color="text.secondary" fontSize={20}>
                      {product.author}
                    </Typography>
                  </Stack>

                  <Divider />

                  <Typography color="text.secondary" fontSize={18}>
                    {product.description}
                  </Typography>

                  <Paper sx={{ bgcolor: "#fff7ed", p: 3 }} variant="outlined">
                    <Stack spacing={2}>
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                      >
                        <Box>
                          <Typography color="text.secondary" variant="body2">
                            Livro digital
                          </Typography>
                          <Typography color="primary" fontWeight={950} variant="h4">
                            {formatPrice(product.priceInCents)}
                          </Typography>
                        </Box>
                        <Typography color="text.secondary">
                          {product.stock} unidades disponíveis
                        </Typography>
                      </Stack>

                      <Box action={addToCart} component="form">
                        <input name="productId" type="hidden" value={product.id} />
                        <Button
                          fullWidth
                          size="large"
                          startIcon={<AddShoppingCartIcon />}
                          type="submit"
                          variant="contained"
                        >
                          Adicionar ao carrinho
                        </Button>
                      </Box>
                    </Stack>
                  </Paper>

                  <Stack spacing={1}>
                    <Typography fontWeight={900}>Por que levar este livro?</Typography>
                    <Typography color="text.secondary">
                      Selecionado para uma estante técnica enxuta: conteúdo direto,
                      tema aplicável em projetos reais e bom encaixe para estudos
                      guiados em sala.
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
