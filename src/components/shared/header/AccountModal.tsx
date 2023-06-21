import { Button } from '@shared/components/button';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { LogoutOutlined } from '@shared/components/icons/LogoutOutlined';
import { Modal } from '@shared/components/modal';

import { Paragraph } from '@shared/components/typography/Paragraph';
import { Hash } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';

import { transactions } from '../../../config/transactions';
import { useUser } from '../../../hooks/useUser';

interface AccountModalProps {
  close: () => void;
}

export function AccountModal({ close }: AccountModalProps) {
  const { address, logout } = useUser();

  function handleLogout() {
    logout();
    close();
  }

  return (
    <>
      {address && (
        <Modal position="right" close={close} open={true}>
          <div className="mb-8 flex items-center justify-between">
            <div className="bg-transition flex items-center space-x-2 rounded py-2">
              <EthAddressIcon size="large" address={address as Hash} />
              <Paragraph className="">
                {getShortenedFormat(address, 6)}
              </Paragraph>
            </div>
            <div>
              <div
                onClick={handleLogout}
                className="bg-transition cursor-pointer rounded bg-gray-100 px-2 py-1.5 hover:bg-gray-200"
              >
                <LogoutOutlined className="text-lg text-gray-600" />
              </div>
            </div>
          </div>
          <div>
            {transactions.map((transaction, index) => (
              <div
                key={index}
                className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex space-x-4">
                  <div className="mt-1 h-8 w-8 rounded-lg bg-gray-200" />
                  <div className="flex flex-col">
                    <div className="">Received</div>
                    <div className="text-sm text-gray-600">
                      <span>From</span>{' '}
                      <span>{getShortenedFormat(transaction.from)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium">
                  {parseFloat(transaction.value) / 10 ** 18} HBAR
                </div>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="text-xs text-gray-700">
                Next Payout is available at{' '}
                <span className="font-semibold">
                  {new Date().toDateString()}
                </span>
              </div>
              <Button variant="black" className="py-1.5" fullSize>
                Receive Payout
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
