import { ContractInterface } from '@ethersproject/contracts';
import { DeployState } from '@shared/typings';
import { ContractFactory } from 'ethers';

import { useEffect, useMemo, useState } from 'react';

import toast from 'react-hot-toast';

import { useUser } from './useUser';

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
      toast.error('Something went wrong. Please reload the page.');
    }
  }

  return useMemo(
    () => ({ deploy: () => setStatus('deploying'), contractAddress, status }),
    [contractAddress, status],
  );
}
