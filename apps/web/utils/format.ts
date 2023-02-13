export default function format(locale: string, currency: string, number: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "code",
  })
    .format(number)
    .replace(currency, "")
    .trim();
}
