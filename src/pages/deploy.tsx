import { Button } from '@shared/components/button';
import { Container } from '@shared/components/container';
import { H1, H5 } from '@shared/components/typography/Title';
import { ContractFactory } from 'ethers';
import { useEffect, useState } from 'react';

import { abi } from '../config/contracts/abi';
import { bytecode } from '../config/contracts/bytecode';
import { useUser } from '../hooks/useUser';

export default function Page() {
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const { signer } = useUser();

  useEffect(() => {
    if (isDeploying) {
      handleDeploy();
    }
  }, [isDeploying]);

  async function handleDeploy() {
    try {
      const gasLimit = 4000000;
      const myContract = new ContractFactory(abi, bytecode, signer);
      const contractDeployTx = await myContract.deploy({ gasLimit });
      const contractDeployRx = await contractDeployTx.deployTransaction.wait();
      setContractAddress(contractDeployRx.contractAddress);
      console.log(`- Contract deployed to address: \n${contractAddress} ✅`);
    } catch (deployError) {
      console.error(deployError);
    }
  }

  return (
    <Container>
      <section className="w-full">
        <div className="flex flex-col space-y-6">
          <H1 className="!text-5xl font-black">.SOL contracts</H1>
          <H5>Contract address: {contractAddress || '-'}</H5>
          <div>
            <Button
              className="px-4 py-1"
              variant="primary"
              loading={isDeploying}
              onClick={() => setIsDeploying(true)}
            >
              Deploy
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
}
