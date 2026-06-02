export const LOT_SIZES = {
  NIFTY: 50,
  BANKNIFTY: 15,
  FINNIFTY: 40,
} as const;

export const CHARGE_RATES = {
  BROKERAGE_PER_ORDER: 20,
  STT_OPTIONS_SELL: 0.00125, // 0.125% on sell side (revised standard)
  STT_FUTURES_SELL: 0.0001,  // 0.01% on sell side
  EXCHANGE_CHARGES: 0.00053, // 0.053%
  GST: 0.18,                 // 18% on (brokerage + exchange charges)
  SEBI_CHARGES_PER_CRORE: 10,
} as const;

export type UnderlyingSymbol = keyof typeof LOT_SIZES | 'STOCK';
