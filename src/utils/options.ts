import { DirectionType } from "config";

export const PaymentMethod = Object.freeze([
  {
    value: "cash",
    label: "Бэлэн",
  },
  {
    value: "non_cash",
    label: "Бэлэн бус",
  },
]);

export const CurrencyOptions = Object.freeze([
  {
    value: "mnt",
    label: "MNT",
  },
  {
    value: "usd",
    label: "USD",
  },
  {
    value: "cny",
    label: "CNY",
  },
  {
    value: "rub",
    label: "RUB",
  },
]);

export const DirectionOptions = Object.freeze([
  {
    label: "Урд",
    value: DirectionType.south,
  },
  {
    label: "Хойд",
    value: DirectionType.north,
  },
]);
