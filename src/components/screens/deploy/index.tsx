import { Button } from '@shared/components/button';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';

import { DeployedContract, DeployedToken } from '@shared/typings';
import { useEffect, useState } from 'react';

import { DeployItem } from './DeployItem';

import { DeployNFT } from './DeployNft';

import { objectionContract } from '../../../config/contracts/objections';
import { proposalContract } from '../../../config/contracts/proposals';

const contracts = [
  {
    envVariable: 'NEXT_PUBLIC_PROPOSALS_CONTRACT_ADDRESS',
    contractName: 'proposals.sol',
    abi: proposalContract.abi,
    bytecode: proposalContract.byteCode,
  },
  {
    envVariable: 'NEXT_PUBLIC_OBJECTIONS_CONTRACT_ADDRESS',
    contractName: 'objections.sol',
    abi: objectionContract.abi,
    bytecode: objectionContract.byteCode,
  },
];

const tokens = [
  {
    envVariable: 'NEXT_PUBLIC_FOREST_TOKEN_ID',
    name: 'Forest',
    symbol: 'FOREST',
  },
];

export function DeployPage() {
  const [deployingContractIndex, setDeployingContractIndex] =
    useState<number>(-1);
  const [deployingTokenIndex, setDeployingTokenIndex] = useState<number>(-1);
  const [deployedContracts, setDeployedContracts] = useState<
    DeployedContract[]
  >([]);
  const [deployedTokens, setDeployedTokens] = useState<DeployedToken[]>([]);

  useEffect(() => {
    if (deployingContractIndex >= contracts?.length) {
      setDeployingTokenIndex(0);
    }
  }, [deployingContractIndex]);

  return (
    <section className="mx-auto w-7/12">
      <div className="flex flex-col space-y-6">
        <div className="space-y-4">
          <div>
            <H1 className="!text-xl font-black">1. Deployment</H1>
            <Paragraph className="w-6/12 text-sm text-gray-700">
              Using this method of deployment may sometimes result in a{' '}
              <span className="font-bold">nonce error</span>. Retrying always
              helps!
            </Paragraph>
          </div>
          <div className="bg-gray-50 px-3 py-2">
            <div className="mb-2 border-b border-gray-100 pb-2 text-sm font-semibold">
              Contracts
            </div>
            {contracts.map((contract, idx) => (
              <DeployItem
                key={idx}
                idx={idx}
                deployingIndex={deployingContractIndex}
                contractName={contract.contractName}
                variable={contract.envVariable}
                registerAddress={value => {
                  setDeployedContracts([...deployedContracts, value]);
                  setDeployingContractIndex(idx + 1);
                }}
                abi={contract.abi}
                bytecode={contract.bytecode}
              />
            ))}
          </div>
          <div className="bg-gray-50 px-3 py-2">
            <div className="mb-2 border-b border-gray-100 pb-2 text-sm font-semibold">
              Forest Token
            </div>
            {tokens.map((token, idx) => (
              <DeployNFT
                name={token.name}
                symbol={token.symbol}
                variable={token.envVariable}
                key={idx}
                idx={idx}
                deployingIndex={deployingTokenIndex}
                register={token => {
                  setDeployedTokens([...deployedTokens, token]);
                  setDeployingTokenIndex(idx + 1);
                }}
              />
            ))}
          </div>
          <div className="mb-10 border-b border-gray-100 pb-10">
            <Button
              variant="primary"
              disabled={deployingContractIndex > contracts?.length}
              loading={deployingContractIndex !== -1}
              onClick={() => setDeployingContractIndex(0)}
            >
              deploy
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div>
            <H1 className="!text-xl font-black">
              2. Copy contract variables to .env
            </H1>
            <Paragraph className="w-6/12 text-sm text-gray-700">
              A simple copy paste of the contract addresses to the .env file.
            </Paragraph>
          </div>
          <div className="rounded border border-gray-100 bg-gray-50 p-2">
            {contracts.map(contract => (
              <Paragraph className="mb-1 w-6/12 text-xs text-gray-900">
                {contract.envVariable}=
                {
                  deployedContracts.find(
                    c => c.variable === contract.envVariable,
                  )?.contractAddress
                }
              </Paragraph>
            ))}
            {tokens.map(contract => (
              <Paragraph className="mb-1 w-6/12 text-xs text-gray-900">
                {contract.envVariable}=
                {
                  deployedTokens.find(c => c.variable === contract.envVariable)
                    ?.tokenId
                }
              </Paragraph>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
