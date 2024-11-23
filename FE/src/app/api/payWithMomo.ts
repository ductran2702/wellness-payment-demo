import { Cart } from "@/types";

export default async function payWithMomo(payload: Cart): Promise<string> {
  const body = {
    ...payload,
    orderItems: payload.orderItems.map((i) => ({
      product_id: i.product_id,
      quantity: i.quantity,
    })),
  };

  const response = await fetch(
    process.env.NEXT_PUBLIC_BE_HOST + `/orders/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Error: HTTP ${response.status}, ${response.statusText}, Message: ${errorBody}`
    );
  }
  const { data } = (await response.json()) as any;
  if (!data.payUrl || !(data.resultCode === 0)) {
    throw new Error("Could not process payment");
  }
  return data.payUrl;
}
