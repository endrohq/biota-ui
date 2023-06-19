import { ContractInterface } from '@ethersproject/contracts/src.ts';
import { ContractFactory } from 'ethers';

import { useEffect, useMemo, useState } from 'react';

import { useUser } from './useUser';

type DeployState = 'deploying' | 'error' | 'deployed' | 'stale';

interface useContractDeployProps {
  deploy: () => void;
  contractAddress: string | null;
  status: DeployState;
}

export function useContractDeploy(
  abi: ContractInterface,
  bytecode: string,
): useContractDeployProps {
  const { signer } = useUser();
  const [contractAddress, setContractAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<DeployState>('stale');

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
    } catch (deployError) {
      console.error(deployError);
      setStatus('error');
    }
  }

  return useMemo(
    () => ({ deploy: () => setStatus('deploying'), contractAddress, status }),
    [contractAddress, status],
  );
}
