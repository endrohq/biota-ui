import { Feature } from '@nebula.gl/edit-modes';
import { Button } from '@shared/components/button';
import InputText from '@shared/components/input/InputText';
import { MapBox } from '@shared/components/map';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { CreateIncidentForm } from '@shared/typings';
import React, { useState } from 'react';

interface LocationFormProps {
  save(props: Partial<CreateIncidentForm>): void;
}

export function LocationForm({ save }: LocationFormProps) {
  const [name, setName] = useState<string>('Zennebeemden, Mechelen (Belgium)');
  const [location, setLocation] = useState<Feature[]>([]);
  return (
    <div className="w-full space-y-4">
      <div>
        <div>Location</div>
        <Paragraph className="text-sm text-gray-700">
          Pinpoint the location where the incident is happening
        </Paragraph>
      </div>
      <div className="space-y-1">
        <label className="text-sm" htmlFor="title">
          Title
        </label>
        <InputText
          name="title"
          placeholder="Zennebeemden"
          value={name}
          onChange={value => setName(value)}
        />
      </div>
      {typeof window !== 'undefined' && (
        <MapBox
          mode="editable"
          positions={location}
          onChange={value => setLocation(value)}
        />
      )}
      <div className="!mt-10 flex justify-end space-y-1 border-t border-gray-100 pt-10">
        <Button
          fullSize
          disabled={location?.length === 0}
          onClick={() => save({ location, locationName: name })}
          className="px-6 py-2"
          variant="primary"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
