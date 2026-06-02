import LocalMallIcon from "@mui/icons-material/LocalMall";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCartDetails } from "@/lib/cart";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, cart] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { title: "asc" }]
    }),
    getCartDetails()
  ]);

  const categories = Array.from(new Set(products.map((product) => product.category)));
  const heroBooks = products.slice(0, 3);

  return (
    <Box minHeight="100vh" sx={{ bgcolor: "#f6f1e8" }}>
      <Box
        component="header"
        sx={{
          bgcolor: "rgba(246, 241, 232, 0.92)",
          borderBottom: "1px solid rgba(51, 41, 31, 0.12)",
          position: "sticky",
          top: 0,
          zIndex: 10
        }}
      >
        <Container maxWidth="xl">
          <Stack
            alignItems="center"
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            spacing={2}
            sx={{ py: 2 }}
          >
            <Stack alignItems="center" direction="row" spacing={1.2}>
              <MenuBookIcon color="primary" fontSize="large" />
              <Box>
                <Typography fontWeight={950} lineHeight={1}>
                  Livraria 67
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  tecnologia, produto e dados
                </Typography>
              </Box>
            </Stack>

            <TextField
              placeholder="Busque por tema, autor ou tecnologia"
              size="small"
              sx={{
                maxWidth: 520,
                width: { xs: "100%", md: "42%" },
                "& .MuiOutlinedInput-root": { bgcolor: "white" }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />

            <Stack direction="row" spacing={1}>
              <Button component={Link} href="/login" variant="outlined">
                Admin
              </Button>
              <Button
                component={Link}
                href="/carrinho"
                startIcon={<LocalMallIcon />}
                variant="contained"
              >
                Carrinho ({cart.totalQuantity})
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 7 } }}>
        <Stack spacing={6}>
          <Paper
            sx={{
              bgcolor: "#1f2933",
              color: "white",
              overflow: "hidden",
              p: { xs: 3, md: 6 },
              position: "relative"
            }}
          >
            <Grid alignItems="center" container spacing={4}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                  <Chip
                    label="Curadoria Casa do Codigo"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: "#f59e0b",
                      color: "#1f2933",
                      fontWeight: 900
                    }}
                  />
                  <Typography component="h1" fontWeight={950} variant="h2">
                    Livros para quem constroi software de verdade.
                  </Typography>
                  <Typography color="rgba(255,255,255,0.78)" fontSize={20}>
                    Uma seleção para estudar programação, arquitetura, dados e
                    inteligência artificial com autores técnicos e exemplos
                    práticos.
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                    <Button
                      component={Link}
                      href="#catalogo"
                      size="large"
                      sx={{ bgcolor: "white", color: "#1f2933" }}
                      variant="contained"
                    >
                      Ver catálogo
                    </Button>
                    <Button
                      component={Link}
                      href="/carrinho"
                      size="large"
                      sx={{ borderColor: "rgba(255,255,255,0.5)", color: "white" }}
                      variant="outlined"
                    >
                      Revisar carrinho
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack
                  direction="row"
                  justifyContent={{ xs: "center", md: "flex-end" }}
                  spacing={{ xs: -5, md: -7 }}
                  sx={{ minHeight: 320 }}
                >
                  {heroBooks.map((product, index) => (
                    <Box
                      key={product.id}
                      alt=""
                      component="img"
                      src={product.imageUrl}
                      sx={{
                        alignSelf: index === 1 ? "flex-start" : "flex-end",
                        borderRadius: 1.5,
                        boxShadow: "0 26px 54px rgba(0,0,0,0.38)",
                        height: { xs: 230, sm: 280, md: 330 },
                        objectFit: "contain",
                        transform: `rotate(${[-7, 4, 9][index]}deg)`,
                        zIndex: 3 - index
                      }}
                    />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          <Stack spacing={2}>
            <Typography color="text.secondary" fontWeight={800} variant="overline">
              Trilhas de leitura
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {categories.map((category) => (
                <Chip key={category} label={category} sx={{ bgcolor: "white" }} />
              ))}
            </Stack>
          </Stack>

          <Stack id="catalogo" spacing={3}>
            <Stack
              alignItems={{ xs: "flex-start", md: "flex-end" }}
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              spacing={1}
            >
              <Box>
                <Typography component="h2" fontWeight={950} variant="h4">
                  Catálogo
                </Typography>
                <Typography color="text.secondary">
                  {products.length} livros selecionados para montar uma prateleira
                  técnica completa.
                </Typography>
              </Box>
              <Typography color="text.secondary" variant="body2">
                Compra demo: os itens entram no carrinho, mas o checkout ainda
                não altera estoque.
              </Typography>
            </Stack>

            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, lg: 4, xl: 3 }}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
