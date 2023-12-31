'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
} from '@nextui-org/table';

import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';

import Link from 'next/link';
import Image from 'next/image';
import CryptoChart from '@/components/CryptoChart';

const CoinTable = ({ data }: any) => {
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
        items={data[0]}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(coin: any) => (
          <TableRow key={coin?.id}>
            <TableCell>{coin?.market_cap_rank}</TableCell>
            <TableCell>
              <Link
                className="coinName"
                href={{
                  pathname: '/coin',
                  query: {
                    id: coin.id,
                  },
                }}
                key={coin.id}
              >
                <Image
                  src={coin.image}
                  alt={coin.name}
                  loading="lazy"
                  width={40}
                  height={40}
                />
                {coin.name} <small>{coin?.symbol?.toUpperCase()}</small>
              </Link>
            </TableCell>
            <TableCell>${coin.current_price?.toLocaleString()}</TableCell>
            {coin?.price_change_percentage_24h > 0 ? (
              <TableCell>
                <Chip color="success" variant="flat">
                  +{coin?.price_change_percentage_24h}%
                </Chip>
              </TableCell>
            ) : (
              <TableCell>
                <Chip color="danger" variant="flat">
                  {coin?.price_change_percentage_24h}%
                </Chip>
              </TableCell>
            )}

            <TableCell>${coin?.market_cap?.toLocaleString()}</TableCell>

            <TableCell className="w-44">
              <CryptoChart coinData={coin?.sparkline_in_7d?.price} />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CoinTable;
