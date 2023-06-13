import { Button } from '@shared/components/button';
import { WarningOutlined } from '@shared/components/icons/WarningOutlined';
import { Modal } from '@shared/components/modal';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

import { hederaTestnet } from '../../../config/chains';

export function WrongNetwork() {
  const [hasWrongNetwork, setHasWrongNetwork] = useState(false);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  useEffect(() => {
    if (chain && chain?.id !== hederaTestnet.id) {
      setHasWrongNetwork(true);
    } else {
      setHasWrongNetwork(false);
    }
  }, [chain?.id]);

  return (
    <Modal open={hasWrongNetwork} close={() => ''}>
      <div className="flex h-full flex-col justify-between px-4 py-10">
        <div className=" flex flex-col items-center space-y-2">
          <div className="rounded-full bg-red-50 p-4 pt-3 text-2xl leading-none text-red-800">
            <WarningOutlined />
          </div>
          <div>
            Not connected with{' '}
            <span className="font-medium">Hedera Testnet</span>.
          </div>
        </div>
        <Paragraph className="text-center text-sm text-gray-600">
          Hedera networks should be added to your wallet. If not, please use
          <a href="https://chainlist.org/?testnets=true&search=hedera">
            Chainlist
          </a>{' '}
          and add testnet to your available networks
        </Paragraph>
        <Button
          className="mt-10 py-1 font-medium"
          onClick={() => switchNetwork(hederaTestnet.id)}
          variant="primary"
          fullSize
        >
          Switch network
        </Button>
      </div>
    </Modal>
  );
}
