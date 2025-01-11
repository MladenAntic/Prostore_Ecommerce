import { DealCountdown } from "@/components/DealCountdown";
import { IconBoxes } from "@/components/IconBoxes";
import { ProductCarousel } from "@/components/shared/product/ProductCarousel";
import { ProductList } from "@/components/shared/product/ProductList";
import { ViewAllProductsButton } from "@/components/ViewAllProductsButton";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";

export default async function Homepage() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  return (
    <div>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Featured Products" limit={4} />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBoxes />
    </div>
  );
}
