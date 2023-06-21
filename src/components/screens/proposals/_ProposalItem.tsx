import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { IncidentContent, OnChainIncident } from '@shared/typings';
import { getIncidentItemRoute } from '@shared/utils/route';
import Link from 'next/link';

import { useEffect, useState } from 'react';

import { useStorage } from '../../../hooks/useStorage';

interface IncidentItemProps {
  incident: OnChainIncident;
}

export function ProposalItem({ incident }: IncidentItemProps) {
  const { getJsonFile } = useStorage();
  const [loading, setLoading] = useState<boolean>(true);
  const [ipfsContent, setIpfsContent] = useState<IncidentContent>();

  useEffect(() => {
    if (incident.cid) {
      getJsonFile(incident.cid, 'metadata').then(res => {
        setIpfsContent(res);
        setLoading(false);
      });
    }
  }, [incident?.cid]);

  console.log(ipfsContent);

  return (
    <Link
      href={getIncidentItemRoute(incident.id)}
      className="bg-transition flex-wrap rounded bg-gray-100 px-4 py-3 hover:bg-gray-200"
    >
      {loading ? (
        <LoadingOutlined />
      ) : (
        <div className="mb-2 break-all border-b border-gray-200 pb-2 text-sm last:mb-0 last:border-0 last:pb-0">
          <div className="font-medium">{ipfsContent?.locationName || '-'}</div>
        </div>
      )}
    </Link>
  );
}
