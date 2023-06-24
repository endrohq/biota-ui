import { WalletOutlined } from '@shared/components/icons/WalletOutlined';
import { H3, H5 } from '@shared/components/typography/Title';

export function ConnectWallet() {
  return (
    <div className="mx-auto  w-1/2 ">
      <div className="flex items-center space-x-10">
        <div className="rounded-lg bg-green-50/50 p-6">
          <WalletOutlined className="text-8xl text-green-900" />
        </div>
        <H3 className="w-7/12">
          This dapp is built with Metamask on the Hedera testnet
        </H3>
      </div>
      <div className="mt-20">
        <H5 className="mb-6">Prerequisites</H5>
        <div className="space-y-2">
          <div>
            1. Make sure that{' '}
            <a
              target="_blank"
              className="text-blue-700 underline"
              href="https://metamask.io/"
            >
              Metamask
            </a>{' '}
            is installed in your browser
          </div>
          <div>
            2. Register for a testnet wallet on{' '}
            <a
              target="_blank"
              className="text-blue-700 underline"
              href="https://portal.hedera.com/"
            >
              Hedera Portal
            </a>{' '}
          </div>
          <div>
            3. Add "Hedera Testnet" to Metamask via{' '}
            <a
              target="_blank"
              className="text-blue-700 underline"
              href="https://chainlist.org/?testnets=true&search=hedera"
            >
              Chainlist
            </a>{' '}
          </div>
          <div>
            4. Import the private key from your testnet account in{' '}
            <a
              target="_blank"
              className="text-blue-700 underline"
              href="https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account"
            >
              Metamask
            </a>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
