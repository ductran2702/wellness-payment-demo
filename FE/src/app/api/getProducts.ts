import { Product } from "@/types";

export default async function fetProducts(): Promise<Product[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_BE_HOST + `/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error: HTTP ${response.status}, ${response.statusText}, Message: ${errorBody}`
    );
  }
  return await response.json();
}
