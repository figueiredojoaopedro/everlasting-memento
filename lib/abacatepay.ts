import { AbacatePay } from "@abacatepay/sdk";

const apiKey = process.env.ABACATEPAY_API_KEY;

export const abacate = apiKey
  ? AbacatePay({ secret: apiKey })
  : null;

export const PRODUCTS = {
  weekly: process.env.NEXT_PUBLIC_ABACATEPAY_PRODUCT_WEEKLY_ID,
  yearly: process.env.NEXT_PUBLIC_ABACATEPAY_PRODUCT_YEARLY_ID,
} as const;

export type PlanType = keyof typeof PRODUCTS;
