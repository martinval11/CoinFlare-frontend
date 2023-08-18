"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [coins, setCoins] = useState([]);
  const getCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    );
    const coins = await res.json();

    setCoins(coins);
    return coins;
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn>#</TableColumn>
        <TableColumn>Coin</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>24h</TableColumn>
        <TableColumn>Market Cap</TableColumn>
      </TableHeader>
      <TableBody items={coins}>
        {(coin: any) => (
          <TableRow key={coin.id}>
            <TableCell>{coin.market_cap_rank}</TableCell>
            <TableCell>
              <Link
                className='coinName'
                href={{
                  pathname: "/coin",
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
            <TableCell>{coin.price_change_percentage_24h}%</TableCell>
            <TableCell>${coin.market_cap.toLocaleString()}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
