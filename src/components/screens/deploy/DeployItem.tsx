import { ContractInterface } from '@ethersproject/contracts/src.ts';

import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { DeployedContract } from '@shared/typings';
import { useEffect } from 'react';

import { useContractDeploy } from '../../../hooks/useContractDeploy';

interface DeployItemProps {
  idx: number;
  deployingIndex: number;
  contractName: string;
  variable: string;
  abi: ContractInterface;
  bytecode: string;
  registerAddress: (value: DeployedContract) => void;
}

export function DeployItem({
  idx,
  deployingIndex,
  contractName,
  abi,
  bytecode,
  registerAddress,
  variable,
}: DeployItemProps) {
  const { deploy, contractAddress, status } = useContractDeploy(abi, bytecode);

  useEffect(() => {
    if (deployingIndex === idx && status !== 'deploying') {
      deploy();
    }
  }, [deployingIndex, status]);

  useEffect(() => {
    if (contractAddress) {
      registerAddress({
        variable,
        contractAddress,
      });
    }
  }, [contractAddress]);

  return (
    <div className="mb-1.5 flex items-center space-x-10 rounded">
      <div className="w-2/12">
        <div className="text-sm">
          {idx + 1}. {contractName}
        </div>
      </div>
      <div className="flex items-center space-x-10">
        <div className="text-sm font-medium">
          {status === 'stale' ? (
            <MinusCircleOutlined className="text-gray-600" />
          ) : status === 'deploying' ? (
            <LoadingOutlined />
          ) : status === 'deployed' ? (
            <CheckCircleOutlined className="text-green-800" />
          ) : (
            <MinusCircleOutlined className="text-gray-600" />
          )}
        </div>
      </div>
    </div>
  );
}
