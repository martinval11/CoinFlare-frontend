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

const PortfolioCoin = ({ coin, onChangeData }: any) => {
  const modifyModal = useDisclosure();
  const deleteModal = useDisclosure();

  const newPrice: any = useRef(null);

  const updateCryptoPrice = async (event: any) => {
    const userAuth: any = localStorage.getItem('auth');
    const userData: any = JSON.parse(userAuth);
    const userId = userData._id;

    const coinName = event.target.id;

    // get individual user
    const res = await fetch(`${API_URL}/user/${userId}`);
    const data = await res.json();

    // find the coin in the portfolio object
    const coinIndex = data.portfolio.findIndex(
      (coin: any) => coin.id === coinName
    );

    // update the price of the coin in the portfolio object
    data.portfolio[coinIndex].priceCryptoToUSD = Number(newPrice.current.value);

    // update the crypto price
    // get the current price from local storage 'coins'

    const localCoinPrices: any = localStorage.getItem('coins');
    const localCoins: any = JSON.parse(localCoinPrices);
    const coinLocal = localCoins.find((coin: any) => coin.id === coinName);
    const priceUSDToCryptoServer =
      Number(newPrice.current.value) / coinLocal.current_price;

    data.portfolio[coinIndex].priceUSDToCrypto = priceUSDToCryptoServer;

    // send the updated portfolio object to the server
    await request(`${API_URL}/updateUser/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    onChangeData();
    modifyModal.onOpenChange();
  };

  const deleteCoin = async (event: any) => {
    const userAuth: any = localStorage.getItem('auth');
    const userData: any = JSON.parse(userAuth);
    const userId = userData._id;

    const coinName = event.target.id;

    // get individual user
    const res = await fetch(`${API_URL}/user/${userId}`);
    const data = await res.json();

    // find the coin in the portfolio object
    const coinIndex = data.portfolio.findIndex(
      (coin: any) => coin.id === coinName
    );

    // delete the coin from the portfolio object
    data.portfolio.splice(coinIndex, 1);

    // send the updated portfolio object to the server
    await request(`${API_URL}/updateUser/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    onChangeData();
    deleteModal.onOpenChange();
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
                  <DropdownItem
                    key="modify"
                    id={coin.id}
                    onPress={modifyModal.onOpen}
                  >
                    Modify
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    id={coin.id}
                    onPress={deleteModal.onOpen}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={modifyModal.isOpen}
        onOpenChange={modifyModal.onOpenChange}
        placement="center"
      >
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

      <Modal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete this coin?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={deleteCoin} id={coin.id}>
                  Delete
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
