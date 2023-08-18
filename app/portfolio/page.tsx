'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { Input } from '@nextui-org/input';

interface coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: boolean;
  last_updated: string;
  priceCryptoToUSD: number;
  priceUSDToCrypto: number;
}

const Portfolio = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [coins, setCoins] = useState([]);
  const [portfolio, setPortfolio]: any = useState([]);

  const [crypto, setCrypto] = useState('');
  const priceRef: any = useRef(0);

  const getCoins = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
    );
    const coins = await res.json();

    setCoins(coins);
    return coins;
  };

  const selectCryptoChange = (event: any) => {
    setCrypto(event.currentTarget.value);
  };

  const submitPortfolio = (event: FormEvent) => {
    event.preventDefault();
    const findCoin: any = coins.find((coin: coin) => coin.id === crypto);

    if (findCoin) {
      setPortfolio([
        ...portfolio,
        {
          name: crypto,
          id: findCoin.id,
          priceUSDToCrypto:
            Number(priceRef.current.value) / findCoin.current_price,
          priceCryptoToUSD: Number(
            (
              (Number(priceRef.current.value) / findCoin.current_price) *
              findCoin.current_price
            ).toFixed(6)
          ),
        },
      ]);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('auth');
    if (user === null) {
      window.location.pathname = '/login';
      return;
    }
    setIsAuth(true);
    getCoins();
  }, []);

  return (
    <main>
      {isAuth ? (
        <div className="flex justify-center">
          <section className='w-full'>
            <h1>Portfolio</h1>
            <form onSubmit={submitPortfolio}>
              <h2 className='mt-1'>Add a cryptocurrency</h2>

              <label className="flex flex-col block">
                <span>Select a cryptocurrency</span>
                <Dropdown>
                  <DropdownTrigger>
                    <Button variant="bordered">
                      {crypto ? crypto : 'Select a cryptocurrency'}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Action event example"
                    onAction={(key: any) => setCrypto(key)}
                  >
                    {coins.map((coin: coin) => (
                      <DropdownItem key={coin.id} value={coin.id}>
                        {coin.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </label>

              <label className="block mt-3">
                <span>Quantity</span>
                <Input type="text" ref={priceRef} required />
              </label>

              <Input type="submit" value="Add" className='mt-3' />
            </form>

            <div>
              <h2>Balance</h2>
              <p>
                $
                {portfolio.reduce((acc: number, coin: coin) => {
                  return acc + Number(coin.priceCryptoToUSD);
                }, 0)}
              </p>
              {portfolio.length === 0 ? (
                <p>No coins added</p>
              ) : (
                portfolio.map((coin: coin) => (
                  <>
                    <p key={coin.id}>
                      {coin.name} - ${coin.priceUSDToCrypto}
                    </p>
                  </>
                ))
              )}
            </div>
          </section>
        </div>
      ) : (
        <h1>Loading, please wait...</h1>
      )}
    </main>
  );
};

export default Portfolio;
