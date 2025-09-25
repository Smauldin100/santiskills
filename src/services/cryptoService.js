export async function fetchCryptoPrice(coinId = 'bitcoin') {
  const baseUrl =
    process.env.REACT_APP_CRYPTO_API_URL || 'https://api.coingecko.com/api/v3';
  const url = `${baseUrl}/simple/price?ids=${coinId}&vs_currencies=usd`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch crypto price');
  }
  const data = await res.json();
  return data[coinId]?.usd || null;
}
