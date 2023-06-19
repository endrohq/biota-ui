import { OnChainIncident } from '@shared/typings';
import { useMemo, useState } from 'react';

import { useContractRead } from 'wagmi';

import { incidentContract } from '../config/contracts/incidents';
import { incidentContractAddress } from '../env';

type useIncidentsProps = {
  incidents: OnChainIncident[];
  loading: boolean;
};

export function useIncidents(): useIncidentsProps {
  const [incidents, setIncidents] = useState<OnChainIncident[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useContractRead({
    address: incidentContractAddress,
    abi: incidentContract.incidentsAbi,
    functionName: 'getIncidentByPage',
    args: [0],
    onSuccess: (data: any) => {
      setIncidents(
        data?.map((incident: Record<string, any>) => ({
          id: incident.id,
          cid: incident.cid,
          author: incident.author,
          abstainVotes: Number(incident.abstainVotes),
          againstVotes: Number(incident.againstVotes),
          forVotes: Number(incident.forVotes),
        })),
      );
      setLoading(false);
    },
    onError: (error: any) => {
      console.error(error);
      setLoading(false);
    },
  });

  return useMemo(() => ({ loading, incidents }), [loading, incidents]);
}
