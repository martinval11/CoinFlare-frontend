'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from '@nextui-org/table';

import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';

import CryptoChart from '@/components/CryptoChart';
import request from '../utils/request';

const SearchPage = () => {
  const [coin, setCoin]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const coinParams = useSearchParams();
  const coinName: any = coinParams.get('coin');

  const getCoinData = async () => {
    try {
      const data: any = await request(
        `https://api.coingecko.com/api/v3/coins/${coinName}?sparkline=true`
      );

      if (data.error) {
        return alert('Coin not found.');
      }

      setCoin([data]);
      setIsLoading(false);
    } catch (error: any) {
      alert('Error');
      throw new Error(error);
    }
  };

  useEffect(() => {
    getCoinData();
  }, [coinName]);

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
        items={coin}
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
                    price: coin.market_data.current_price.usd,
                    symbol: coin.symbol,
                  },
                }}
                key={coin.id}
              >
                <img
                  src={coin.image.small}
                  alt={coin.name}
                  loading="lazy"
                  width={40}
                  height={40}
                />
                {coin.name} <small>{coin.symbol.toUpperCase()}</small>
              </Link>
            </TableCell>
            <TableCell>
              ${coin.market_data.current_price.usd.toLocaleString()}
            </TableCell>
            {coin.market_data.price_change_percentage_24h > 0 ? (
              <TableCell>
                <Chip color="success" variant="flat">
                  +{coin.market_data.price_change_percentage_24h}%
                </Chip>
              </TableCell>
            ) : (
              <TableCell>
                <Chip color="danger" variant="flat">
                  {coin.market_data.price_change_percentage_24h}%
                </Chip>
              </TableCell>
            )}

            <TableCell>
              ${coin.market_data.market_cap.usd.toLocaleString()}
            </TableCell>

            <TableCell className="w-44">
              <CryptoChart coinData={coin.market_data.sparkline_7d.price} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default SearchPage;
