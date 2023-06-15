import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { LogoutOutlined } from '@shared/components/icons/LogoutOutlined';
import { Modal } from '@shared/components/modal';

import { Paragraph } from '@shared/components/typography/Paragraph';
import { Hash } from '@shared/typings';
import { getShortenedFormat } from '@shared/utils/string.utils';

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
          <div className="flex items-center justify-between">
            <div className="bg-transition flex items-center space-x-2 rounded px-4 py-2">
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
        </Modal>
      )}
    </>
  );
}
