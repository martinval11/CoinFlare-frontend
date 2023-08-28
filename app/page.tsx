"use server"

import CoinTable from '@/components/CoinTable';
import request from './utils/request';

const getCoins: any = async () => {
  try {
    const coins: any = await request(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=%221h%2C%2024h%2C%207d%22&locale=en'
    );
    return [coins];
  } catch (error: any) {
    throw new Error(error);
  }
};

const Home = async () => {
  const coins = await getCoins();

  return <CoinTable data={coins} />;
};

export default Home;
