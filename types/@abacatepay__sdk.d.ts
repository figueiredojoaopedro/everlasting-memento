declare module "@abacatepay/sdk" {
  interface CheckoutItem {
    id: string;
    quantity: number;
  }

  interface CheckoutResponse {
    data: {
      id: string;
      url: string;
      amount: number;
      status: string;
      devMode: boolean;
      createdAt: string;
      externalId?: string;
    };
  }

  interface CreateCheckoutParams {
    items: CheckoutItem[];
    customerId?: string;
    externalId?: string;
    returnUrl?: string;
    completionUrl?: string;
    methods?: ("PIX" | "CARD" | "BOLETO")[];
    metadata?: Record<string, string>;
  }

  interface AbacatePayInstance {
    checkouts: {
      create(params: CreateCheckoutParams): Promise<CheckoutResponse>;
    };
  }

  export function AbacatePay(config: { secret: string }): AbacatePayInstance;
}
