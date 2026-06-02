import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { addToCart } from "@/app/carrinho/actions";
import { formatPrice } from "@/lib/format";

type ProductCardProps = {
  product: {
    id: string;
    slug: string;
    title: string;
    author: string;
    category: string;
    description: string;
    imageUrl: string;
    priceInCents: number;
    stock: number;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Paper
      component="article"
      sx={{
        borderColor: "rgba(15, 23, 42, 0.08)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden"
      }}
      variant="outlined"
    >
      <Box
        component={Link}
        href={`/livros/${product.slug}`}
        sx={{
          bgcolor: "#f1f5f9",
          display: "grid",
          minHeight: 270,
          placeItems: "center",
          textDecoration: "none"
        }}
      >
        <Box
          alt=""
          component="img"
          src={product.imageUrl}
          sx={{
            borderRadius: 1,
            boxShadow: "0 18px 34px rgba(15, 23, 42, 0.22)",
            height: 220,
            maxWidth: "78%",
            objectFit: "contain"
          }}
        />
      </Box>

      <Stack spacing={2} sx={{ flex: 1, p: 2.5 }}>
        <Stack spacing={1}>
          <Chip
            label={product.category}
            size="small"
            sx={{ alignSelf: "flex-start", fontWeight: 700 }}
          />
          <Typography
            color="text.primary"
            component={Link}
            fontWeight={900}
            href={`/livros/${product.slug}`}
            sx={{ textDecoration: "none" }}
            variant="h6"
          >
            {product.title}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {product.author}
          </Typography>
        </Stack>

        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {product.description}
        </Typography>

        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <Typography color="primary" fontWeight={900} variant="h6">
            {formatPrice(product.priceInCents)}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {product.stock} em estoque
          </Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            component={Link}
            endIcon={<ArrowOutwardIcon />}
            fullWidth
            href={`/livros/${product.slug}`}
            variant="outlined"
          >
            Ver livro
          </Button>
          <Box
            component="form"
            action={addToCart}
            sx={{ display: "flex", flex: 1 }}
          >
            <input name="productId" type="hidden" value={product.id} />
            <Button
              fullWidth
              startIcon={<AddShoppingCartIcon />}
              type="submit"
              variant="contained"
            >
              Comprar
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
