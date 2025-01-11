import { ProductCard } from "@/components/shared/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
  getAllProducts,
  getAllCategories,
} from "@/lib/actions/product.actions";
import { prices, ratings, sortOrders } from "@/lib/constants";
import Link from "next/link";

export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
  } = await props.searchParams;

  const isQuerySet = q && q !== "all" && q.trim() !== "";
  const isCategorySet =
    category && category !== "all" && category.trim() !== "";
  const isPriceSet = price && price !== "all" && price.trim() !== "";
  const isRatingSet = rating && rating !== "all" && rating.trim() !== "";

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${isQuerySet ? q : ""} ${isCategorySet ? ` Category ${category}` : ""} ${isPriceSet ? ` Price ${price}` : ""} ${isRatingSet ? ` Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

export default async function SearchPage(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) {
  const {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  } = await props.searchParams;

  // Construct filter url
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
    s?: string;
    p?: string;
    r?: string;
    pg?: string;
  }) => {
    const params = {
      q,
      category,
      price,
      rating,
      sort,
      page,
    };

    if (c) params.category = c;
    if (s) params.sort = s;
    if (p) params.price = p;
    if (r) params.rating = r;
    if (pg) params.page = pg;

    return `/search?${new URLSearchParams(params).toString()}`;
  };

  const products = await getAllProducts({
    query: q,
    category,
    price,
    rating,
    sort,
    page: Number(page),
  });

  const categories = await getAllCategories();

  const searchPageLinks = [
    {
      title: "Department",
      array: categories,
      href: getFilterUrl({ c: "all" }),
    },
    {
      title: "Price",
      array: prices,
      href: getFilterUrl({ p: "all" }),
    },
    {
      title: "Customer Ratings",
      array: ratings,
      href: getFilterUrl({ r: "all" }),
    },
  ];

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div>
        {/* SearchPage Links */}
        {searchPageLinks.map((link, index) => (
          <div key={link.title} className={index === 1 ? "my-8" : ""}>
            <div className="mb-2 mt-3 text-xl">{link.title}</div>
            <div>
              <ul className="space-y-1">
                <li>
                  <Link
                    className={`${(category === "all" || category === "" || price === "all" || rating === "all") && "font-bold"}`}
                    href={link.href}
                  >
                    Any
                  </Link>
                </li>
                {link.array === categories ? (
                  <>
                    {categories.map((cat) => (
                      <li key={cat.category}>
                        <Link
                          className={`${category === cat.category && "font-bold"}`}
                          href={getFilterUrl({ c: cat.category })}
                        >
                          {cat.category}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : link.array === prices ? (
                  <>
                    {prices.map((p) => (
                      <li key={p.value}>
                        <Link
                          className={`${price === p.value && "font-bold"}`}
                          href={getFilterUrl({ p: p.value })}
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : link.array === ratings ? (
                  <>
                    {ratings.map((r) => (
                      <li key={r}>
                        <Link
                          className={`${rating === r.toString() && "font-bold"}`}
                          href={getFilterUrl({ r: `${r}` })}
                        >
                          {`${r} stars & up`}
                        </Link>
                      </li>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 md:col-span-4">
        <div className="flex-between my-4 flex-col md:flex-row">
          <div className="flex items-center">
            {q !== "all" && q !== "" && "Query: " + q}
            {category !== "all" && category !== "" && "Category: " + category}
            {price !== "all" && " Price: " + price}
            {rating !== "all" && " Rating: " + rating + " stars & up"}
            &nbsp;
            {(q !== "all" && q !== "") ||
            (category !== "all" && category !== "") ||
            rating !== "all" ||
            price !== "all" ? (
              <Button variant={"link"} asChild>
                <Link href="/search">Clear</Link>
              </Button>
            ) : null}
          </div>
          <div>
            Sort by{" "}
            {sortOrders.map((s) => (
              <Link
                key={s}
                className={`mx-2 ${sort === s && "font-bold"}`}
                href={getFilterUrl({ s })}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {products.data.length === 0 && <div>No products found</div>}
          {products.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
