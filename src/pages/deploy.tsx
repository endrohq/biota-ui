import { Button } from '@shared/components/button';
import { Container } from '@shared/components/container';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';
import { ContractFactory } from 'ethers';
import { useEffect, useState } from 'react';

import { abi } from '../config/contracts/abi';
import { bytecode } from '../config/contracts/bytecode';
import { useUser } from '../hooks/useUser';

export default function Page() {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<
    'deploying' | 'error' | 'deployed' | 'stale'
  >('stale');
  const { signer } = useUser();

  useEffect(() => {
    if (status === 'deploying') {
      handleDeploy();
    }
  }, [status]);

  useEffect(() => {
    if (contractAddress) {
      setStatus('deployed');
    }
  }, [contractAddress]);

  async function handleDeploy() {
    try {
      const gasLimit = 4000000;
      const myContract = new ContractFactory(abi, bytecode, signer);
      const contractDeployTx = await myContract.deploy({ gasLimit });
      const contractDeployRx = await contractDeployTx.deployTransaction.wait();
      setContractAddress(contractDeployRx.contractAddress);
      console.log(
        `- Contract deployed to address: \n${contractDeployRx.contractAddress} ✅`,
      );
    } catch (deployError) {
      console.error(deployError);
    }
  }

  return (
    <Container access="private">
      <section className="w-full">
        <div className="flex flex-col space-y-6">
          <div>
            <H1 className="!text-2xl font-black">
              Easily deploy all related contracts
            </H1>
            <Paragraph className="w-6/12 text-sm text-gray-700">
              Make sure to insert the contract addresses in the .env file with
              names mentioned in README.md
            </Paragraph>
          </div>
          <div className="space-y-6 rounded bg-gray-100 px-6 py-3">
            <div>
              <div className="font-bold">incidents.sol</div>
              <div className="text-sm text-gray-600">
                The contract responsible for reporting incidents
              </div>
            </div>
            <div className="flex items-center space-x-10">
              <div className="text-sm">
                <div className="text-xs text-gray-600">Status</div>
                <div className="text-sm font-medium">{status}</div>
              </div>
              <div className="text-sm">
                <div className="text-xs text-gray-600">Contract address</div>
                <div className="text-sm font-medium">
                  {contractAddress || '-'}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button
              className="px-4 py-1"
              variant="primary"
              loading={'deploying' === status}
              onClick={() => setStatus('deploying')}
            >
              Deploy
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
