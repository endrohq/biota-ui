import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { H1 } from '@shared/components/typography/Title';

import { Incident, IncidentContent } from '@shared/typings';
import { useEffect, useState } from 'react';

import { Description } from './_Description';
import { Gallery } from './_Gallery';
import { MapOverview } from './MapOverview';
import { Proposals } from './Proposals';
import { RequiredCourses } from './RequiredCourses';

import { useStorage } from '../../../hooks/useStorage';

interface IncidentItemPageProps {
  incident: Incident;
}

export function IncidentItemPage({ incident }: IncidentItemPageProps) {
  const [requiredCourses, setRequiredCourses] = useState<string[]>();
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
    <div className="space-y-6">
      <MapOverview positions={ipfsContent?.positions} />
      <div className=" mx-auto w-7/12 space-y-1 rounded bg-gray-100 px-6 py-4"></div>
      <div className=" mx-auto flex w-7/12 items-start justify-between space-x-10 pb-20">
        <div className="w-8/12 space-y-10">
          <H1 className="!text-3xl !font-black">{ipfsContent?.title || '-'}</H1>
          <Gallery cid={incident.cid} />
          <Description description={ipfsContent?.description || '-'} />
          <Proposals />
        </div>
        <div className="w-4/12 space-y-4 text-xs">dssdf</div>
      </div>
      {requiredCourses && (
        <RequiredCourses
          close={() => setRequiredCourses(undefined)}
          requiredCourseIds={requiredCourses}
        />
      )}
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
