'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@nextui-org/react';

import PortfolioCoin from '@/components/PortfolioCoin';
import { API_URL } from '../consts/consts';
import request from '../utils/request';

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
  sparkline_in_7d: {
    price: number[];
  };
}

const Portfolio = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [coins, setCoins] = useState([]);
  const [portfolio, setPortfolio]: any = useState([]);

  const [crypto, setCrypto] = useState('bitcoin');
  const priceRef: any = useRef(0);

  const getCoins = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
      );

      if (!res.ok) {
        alert(Error);
        throw new Error(`Error: ${res.status}`);
      }
      const coins = await res.json();

      setCoins(coins);
      return coins;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const getPortfolio = async () => {
    const userAuth: any = localStorage.getItem('auth');
    const user = JSON.parse(userAuth);
    const res = await fetch(`${API_URL}/user/${user._id}`);
    const portfolio = await res.json();

    setPortfolio(portfolio.portfolio);
    return portfolio.portfolio;
  };

  const selectCryptoChange = (event: any) => {
    setCrypto(event.currentTarget.value);
  };

  const submitPortfolio = async (event: FormEvent) => {
    event.preventDefault();
    const findCoin: any = coins.find((coin: coin) => coin.id === crypto);

    if (findCoin) {
      let portfolioWithNoDelay = [];
      portfolioWithNoDelay = [
        ...portfolio,
        {
          name: findCoin.name,
          id: findCoin.id,
          priceUSDToCrypto:
            Number(priceRef.current.value) / findCoin.current_price,
          priceCryptoToUSD: Number(
            (
              (Number(priceRef.current.value) / findCoin.current_price) *
              findCoin.current_price
            ).toFixed(6)
          ),
          symbol: findCoin.symbol,
          image: findCoin.image,
          price_change_percentage_24h: findCoin.price_change_percentage_24h,
          current_price: findCoin.current_price,
        },
      ];

      setPortfolio(portfolioWithNoDelay);

      const userAuth: any = localStorage.getItem('auth');
      const user = JSON.parse(userAuth);
      await request(`${API_URL}/updateUser/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          portfolio: portfolioWithNoDelay,
        }),
      });
    }
  };

  useEffect(() => {
    const user = localStorage.getItem('auth');
    if (user === null) {
      window.location.pathname = '/login';
      return;
    }
    setIsAuth(true);
    getPortfolio();
    getCoins();
  }, []);

  return (
    <main>
      {isAuth ? (
        <div className="flex justify-center">
          <section className="w-full md:w-7/12">
            <h1>Portfolio</h1>
            <form onSubmit={submitPortfolio}>
              <h2 className="mt-1">Add a cryptocurrency</h2>

              <label className="flex flex-col block mt-3">
                <span>Select a cryptocurrency</span>
                <select
                  className="relative w-full inline-flex flex-row items-center shadow-sm px-3 gap-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 h-unit-10 min-h-unit-10 rounded-medium transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background is-filled"
                  onChange={selectCryptoChange}
                  value={crypto}
                  required
                >
                  {coins.map((coin: coin) => (
                    <option key={coin.id} value={coin.id}>
                      {coin.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block mt-3">
                <span>Quantity (In USD)</span>
                <Input
                  type="text"
                  ref={priceRef}
                  placeholder="100"
                  pattern="^\d+(.\d+)?$"
                  title="Only numbers allowed. For example: 100, 100.5, 00010.0"
                  isRequired
                />
              </label>

              <Input
                color="primary"
                variant="flat"
                type="submit"
                value="Add"
                className="mt-3"
              />
            </form>

            <div className="mt-3">
              <h2>Balance</h2>
              <h3>
                $
                {portfolio.reduce((acc: number, coin: coin) => {
                  return acc + Number(coin.priceCryptoToUSD);
                }, 0)}
              </h3>
              {portfolio.length === 0 ? (
                <p>No coins added</p>
              ) : (
                portfolio.map((coin: coin) => (
                  <PortfolioCoin
                    coin={coin}
                    key={coin.id}
                    onChangeData={getPortfolio}
                  />
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
