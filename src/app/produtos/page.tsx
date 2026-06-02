import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AppShell } from "@/components/AppShell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { createProduct, deleteProduct, updateProduct } from "./actions";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  await requireAdmin();
  const products = await prisma.product.findMany({
    orderBy: [{ active: "desc" }, { title: "asc" }]
  });

  return (
    <AppShell
      subtitle="Cadastre livros, estoque e preco para a loja demo."
      title="Produtos"
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3 }} variant="outlined">
            <Typography fontWeight={800} gutterBottom variant="h6">
              Novo produto
            </Typography>
            <ProductForm action={createProduct} submitLabel="Adicionar" />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Stack spacing={2}>
            {products.map((product) => (
              <Paper key={product.id} sx={{ p: 3 }} variant="outlined">
                <ProductForm
                  action={updateProduct}
                  product={{
                    ...product,
                    price: product.priceInCents / 100
                  }}
                  submitLabel="Salvar"
                />
                <form action={deleteProduct}>
                  <input name="id" type="hidden" value={product.id} />
                  <Button
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 1 }}
                    type="submit"
                  >
                    Remover produto
                  </Button>
                </form>
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </AppShell>
  );
}

function ProductForm({
  action,
  product,
  submitLabel
}: {
  action: (formData: FormData) => Promise<void>;
  product?: {
    id: string;
    slug: string;
    title: string;
    author: string;
    category: string;
    publisher: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    active: boolean;
  };
  submitLabel: string;
}) {
  return (
    <Stack action={action} component="form" spacing={2}>
      {product ? <input name="id" type="hidden" value={product.id} /> : null}
      {product?.imageUrl ? (
        <Box
          alt=""
          component="img"
          src={product.imageUrl}
          sx={{
            alignSelf: "flex-start",
            borderRadius: 1,
            maxHeight: 140,
            objectFit: "contain",
            width: 96
          }}
        />
      ) : null}
      <TextField
        defaultValue={product?.slug}
        helperText="Usado na URL publica do livro."
        label="Slug"
        name="slug"
      />
      <TextField
        defaultValue={product?.title}
        label="Titulo"
        name="title"
        required
      />
      <TextField
        defaultValue={product?.author}
        label="Autor"
        name="author"
        required
      />
      <TextField
        defaultValue={product?.category}
        label="Categoria"
        name="category"
        required
      />
      <TextField
        defaultValue={product?.publisher ?? "Casa do Codigo"}
        label="Editora"
        name="publisher"
        required
      />
      <TextField
        defaultValue={product?.description}
        label="Descricao"
        minRows={3}
        multiline
        name="description"
        required
      />
      <TextField
        defaultValue={product?.imageUrl}
        label="URL da capa"
        name="imageUrl"
        required
      />
      <TextField
        defaultValue={product?.price ?? 49.9}
        inputProps={{ min: 0, step: "0.01" }}
        label="Preco"
        name="price"
        required
        type="number"
      />
      <TextField
        defaultValue={product?.stock ?? 0}
        inputProps={{ min: 0, step: "1" }}
        label="Estoque"
        name="stock"
        required
        type="number"
      />
      <FormControlLabel
        control={<Checkbox defaultChecked={product?.active ?? true} name="active" />}
        label="Produto ativo"
      />
      <Button
        startIcon={submitLabel === "Salvar" ? <SaveIcon /> : <AddIcon />}
        type="submit"
        variant="contained"
      >
        {submitLabel}
      </Button>
    </Stack>
  );
}
