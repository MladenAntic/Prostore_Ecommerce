import { ProductList } from "@/components/shared/product/ProductList";
import { getLatestProducts } from "@/lib/actions/product.actions";

export default async function Homepage() {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <ProductList data={latestProducts} title="Featured Products" limit={4} />
    </div>
  );
}
