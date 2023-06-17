import { Button } from '@shared/components/button';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { H1 } from '@shared/components/typography/Title';

import { isArrayWithElements } from '@shared/utils/array.utils';
import { ROUTE_CREATE_INCIDENT } from '@shared/utils/route';
import Link from 'next/link';

import { IncidentItem } from './_IncidentItem';

import { useIncidents } from '../../../hooks/useIncidents';

export function IncidentsPage() {
  const { incidents, loading } = useIncidents();

  return (
    <section className="mx-auto w-3/4">
      <div className="flex flex-col space-y-6 ">
        <div className="flex items-center justify-between">
          <H1 className="!text-3xl font-black">Incidents</H1>
          <Link href={ROUTE_CREATE_INCIDENT}>
            <Button>New Incident</Button>
          </Link>
        </div>
        <div className="space-y-10">
          {loading ? (
            <div className="flex rounded bg-gray-100 px-6 py-3">
              <LoadingOutlined />
            </div>
          ) : !isArrayWithElements(incidents) ? (
            <div className="flex rounded bg-gray-100 px-6 py-3">
              <div className="text-gray-500">No incidents found..</div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {incidents.map((incident, idx) => (
                <IncidentItem key={idx} incident={incident} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
