export default function formatMoney(money) {
  const rent = new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(money);
  return rent;
}
