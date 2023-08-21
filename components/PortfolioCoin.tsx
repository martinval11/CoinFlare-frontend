import {
  Card,
  CardBody,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from '@nextui-org/react';

import request from '@/app/utils/request';
import { API_URL } from '@/app/consts/consts';
import { useRef } from 'react';

const PortfolioCoin = ({ coin }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const newPrice: any = useRef(null);

  const updateCryptoPrice = async (event: any) => {
    /// NOT TESTED...

    const userAuth: any = localStorage.getItem('auth');
    const userData: any = JSON.parse(userAuth);
    const userId = userData._id;

    const coinName = event.target.id;

    // get individual user
    const res = await fetch(`${API_URL}/user/${userId}`);
    const data = await res.json();

    console.log(data);
    // find the coin in the portfolio object
    const coinIndex = data.portfolio.findIndex(
      (coin: any) => coin.id === coinName
    );
    console.log(coinIndex);

    // update the price of the coin in the portfolio object
    data.portfolio[coinIndex].priceCryptoToUSD = Number(newPrice.current.value);

    // update the crypto price
    const priceUSDToCrypto = Number(
      (
        (Number(newPrice.current.value) / data.current_price) *
        data.current_price
      ).toFixed(6)
    );
    data.portfolio[coinIndex].priceUSDToCrypto = priceUSDToCrypto;

    // send the updated portfolio object to the server
    const requestToServer: any = await request(`${API_URL}/user/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await requestToServer.json();
    console.log(response);

    console.log(data);
  };

  return (
    <>
      <Card className="mt-2" key={coin.name}>
        <CardBody>
          <div id="cardFlexContainer" className="flex">
            <div className="flex items-center gap-2">
              <img
                src={coin.image}
                alt={coin.name}
                loading="lazy"
                width={40}
                height={40}
              />
              <b>{coin.name}</b>
            </div>

            <div
              id="container"
              className="flex items-center justify-between w-full"
            >
              <div className="flex flex-col items-end w-full">
                <b>
                  {coin.priceUSDToCrypto} {coin.symbol.toUpperCase()}
                </b>
                <small>{coin.priceCryptoToUSD} USD</small>

                {coin.price_change_percentage_24h > 0 ? (
                  <Chip color="success" variant="flat">
                    +{coin.price_change_percentage_24h}%
                  </Chip>
                ) : (
                  <Chip color="danger" variant="flat">
                    {coin.price_change_percentage_24h}%
                  </Chip>
                )}
              </div>
            </div>
            <div>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" size="sm" className="min-w-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    </svg>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Menu">
                  <DropdownItem key="modify" id={coin.id} onPress={onOpen}>
                    Modify
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    id={coin.id}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modify</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="New Quantity (In USD)"
                  placeholder="Enter your new quantity"
                  variant="bordered"
                  defaultValue={coin.priceCryptoToUSD}
                  ref={newPrice}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={updateCryptoPrice}
                  id={coin.id}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PortfolioCoin;
