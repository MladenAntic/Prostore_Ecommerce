import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ProductPrice } from "./ProductPrice";
import { Product } from "@/types";
import { Rating } from "./Rating";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center p-0">
        <Link href={`/product/${product.slug}`}></Link>
        <Image
          src={product.images[0]}
          alt={product.name}
          height={300}
          width={300}
          priority={true}
        />
      </CardHeader>
      <CardContent className="grid gap-4 p-4">
        <div className="text-xs">{product.brand}</div>
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-sm font-medium">{product.name}</h2>
        </Link>
        <div className="flex-between gap-4">
          <Rating value={Number(product.rating)} />
          {product.stock > 0 ? (
            <ProductPrice value={Number(product.price)} />
          ) : (
            <p className="text-destructive">Out of stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
