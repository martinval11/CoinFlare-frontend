'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Spinner,
  Chip,
} from '@nextui-org/react';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CryptoChart from '@/components/CryptoChart';

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getCoins = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=%221h%2C%2024h%2C%207d%22&locale=en'
    );
    const coins = await res.json();

    if (coins.error) {
      return alert('Coins not found.');
    }

    setIsLoading(false);
    setCoins(coins);
    return coins;
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <Table aria-label="Coins data">
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Coin</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>24h</TableColumn>
        <TableColumn>Market Cap</TableColumn>
        <TableColumn>Last 7 days</TableColumn>
      </TableHeader>
      <TableBody
        items={coins}
        isLoading={isLoading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(coin: any) => (
          <TableRow key={coin.id}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell>
              <Link
                className="coinName"
                href={{
                  pathname: '/coin',
                  query: {
                    id: coin.id,
                    price: coin.current_price,
                    symbol: coin.symbol,
                  },
                }}
                key={coin.id}
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  loading="lazy"
                  width={40}
                  height={40}
                />
                {coin.name} <small>{coin.symbol.toUpperCase()}</small>
              </Link>
            </TableCell>
            <TableCell>${coin.current_price.toLocaleString()}</TableCell>
            {coin.price_change_percentage_24h > 0 ? (
              <TableCell>
                <Chip color="success" variant="flat">
                  +{coin.price_change_percentage_24h}%
                </Chip>
              </TableCell>
            ) : (
              <TableCell>
                <Chip color="danger" variant="flat">
                  {coin.price_change_percentage_24h}%
                </Chip>
              </TableCell>
            )}

            <TableCell>${coin.market_cap.toLocaleString()}</TableCell>

            <TableCell className='w-44'>
              <CryptoChart coinData={coin.sparkline_in_7d.price} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default Home;
