import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { H4 } from '@shared/components/typography/Title';
import { CreateIncidentForm } from '@shared/typings';
import clsx from 'clsx';
import React from 'react';

interface FormItemProps {
  title: string;
  description: string;
  isActive: boolean;
}

function FormItem({ title, description, isActive }: FormItemProps) {
  return (
    <div className="w-full">
      <div className="flex items-start space-x-3">
        <CheckCircleOutlined
          className={clsx(
            'mt-1 text-xl',
            isActive ? 'text-black' : 'text-gray-400',
          )}
        />
        <div>
          <div
            className={clsx(
              'font-semibold',
              isActive ? 'text-black' : 'text-gray-500',
            )}
          >
            {title}
          </div>
          <div className="text-sm text-gray-600">{description}</div>
        </div>
      </div>
    </div>
  );
}

interface OverviewProps {
  incident: CreateIncidentForm;
}

export function Overview({ incident }: OverviewProps) {
  return (
    <div className="flex h-full w-4/12 flex-col space-y-10 rounded bg-gray-50 p-20">
      <H4>New incident</H4>
      <FormItem
        title="Location"
        description="What location does it concern?"
        isActive={!!incident.location}
      />
      <FormItem
        title="What's happening"
        description="What location does it concern?"
        isActive={!!incident.proposal}
      />
    </div>
  );
}
