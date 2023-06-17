import { Incident } from '@shared/typings';
import { useMemo } from 'react';

import { useContractRead } from 'wagmi';

import { abi } from '../config/contracts/abi';
import { incidentContractAddress } from '../env';

type UseIncidentsProps = {
  incident?: Incident | undefined;
  loading: boolean;
};

export function useIncident(id: string): UseIncidentsProps {
  const { data, isLoading } = useContractRead({
    address: incidentContractAddress,
    abi,
    functionName: 'getIncidentById',
    args: [id],
  });

  function convertToIncident(data: unknown) {
    if (!data) return undefined;
    const props = data as Record<string, any>;
    return {
      id: props.id,
      cid: props.cid,
      author: props.author,
      abstainVotes: Number(props.abstainVotes),
      againstVotes: Number(props.againstVotes),
      forVotes: Number(props.forVotes),
    } as Incident;
  }

  return useMemo(() => {
    return { loading: isLoading, incident: convertToIncident(data) };
  }, [data, isLoading]);
}
