import { Button } from '@shared/components/button';
import { Container } from '@shared/components/container';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';

import { DeployedContract } from '@shared/typings';
import { useState } from 'react';

import { DeployItem } from '../components/screens/deploy/DeployItem';
import { incidentContract } from '../config/contracts/incidents';
import { objectionContract } from '../config/contracts/objections';
import { proposalContract } from '../config/contracts/proposals';

const contracts = [
  {
    envVariable: 'NEXT_PUBLIC_INCIDENTS_CONTRACT_ADDRESS',
    contractName: 'incidents.sol',
    abi: incidentContract.abi,
    bytecode: incidentContract.byteCode,
  },
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

export default function Page() {
  // Deploy in sequence

  const [deployingIndex, setDeployingIndex] = useState<number>(-1);
  const [deployedContracts, setDeployedContracts] = useState<
    DeployedContract[]
  >([]);

  return (
    <Container access="private">
      <section className="mx-auto w-7/12">
        <div className="flex flex-col space-y-6">
          <div className="space-y-4">
            <div>
              <H1 className="!text-xl font-black">1. Deploy Contracts</H1>
              <Paragraph className="w-6/12 text-sm text-gray-700">
                This step will deploy the contracts to the blockchain with the
                help of metamask.
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
                  deployingIndex={deployingIndex}
                  contractName={contract.contractName}
                  variable={contract.envVariable}
                  registerAddress={value => {
                    setDeployedContracts([...deployedContracts, value]);
                    setDeployingIndex(idx + 1);
                  }}
                  abi={contract.abi}
                  bytecode={contract.bytecode}
                />
              ))}
            </div>
            <div className="mb-10 border-b border-gray-100 pb-10">
              <Button
                variant="primary"
                disabled={deployingIndex > contracts?.length}
                loading={deployingIndex !== -1}
                onClick={() => setDeployingIndex(0)}
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
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
