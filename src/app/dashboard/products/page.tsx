/* eslint-disable @next/next/no-img-element */
import { getDictionary } from "@/lib/dictionary";
import { getProducts } from "@/lib/products";
import { cookies } from "next/headers";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  image: string | null;
};
export default async function ProductsPage() {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";
  const dict = await getDictionary(locale);

  const products = await getProducts();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{dict.products.title}</h1>

      {products.length === 0 ? (
        <p className="text-muted-foreground">{dict.products.empty}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <div key={product.id} className="border rounded-lg p-4">
              <img
                src={product.image ?? ""}
                alt={product.name}
                className="object-cover rounded-lg"
              />
              <h2 className="text-lg font-medium">{product.name}</h2>
              <p className="text-muted-foreground">{product.description}</p>
              <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
