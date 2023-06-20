import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { LocationOutlined } from '@shared/components/icons/LocationOutlined';
import { H1 } from '@shared/components/typography/Title';

import { Incident, IncidentContent } from '@shared/typings';
import { useEffect, useState } from 'react';

import { MapOverview } from './MapOverview';
import { Proposals } from './proposals';

import { useStorage } from '../../../hooks/useStorage';

interface IncidentItemPageProps {
  incident: Incident;
}

export function IncidentItemPage({ incident }: IncidentItemPageProps) {
  const { getJsonFile } = useStorage();
  const [ipfsContent, setIpfsContent] = useState<IncidentContent>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function handleIpfsFetch() {
      try {
        const content = await getJsonFile(incident.cid, 'incident');
        setIpfsContent(content);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    handleIpfsFetch();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex w-10/12 items-start justify-between space-x-10 pb-20">
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <div className="">
      <MapOverview positions={ipfsContent?.location} />
      <div className="mx-auto mt-6 w-7/12 pb-20">
        <div className=" mb-3 flex items-center space-x-4 rounded-t border-b border-gray-100 py-3">
          <div className="rounded bg-green-50 px-1.5 py-1">
            <LocationOutlined className="text-xl text-green-900" />
          </div>
          <H1 className="space-x-2 !text-base !font-medium">
            {ipfsContent?.locationName || '-'}
          </H1>
        </div>
        <Proposals incidentId={incident.id} />
      </div>
    </div>
  );
}

/* <div className="">
          <div className=" flex items-center space-x-2 text-xs">
            <div>Reported By:</div>
            <div className="flex items-center space-x-2">
              <EthAddressIcon address={incident.author} />
              <div className="font-medium text-gray-600">
                {getShortenedFormat(incident.author)}
              </div>
            </div>
          </div>
        </div>*/
