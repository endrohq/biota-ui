import { Button } from '@shared/components/button';

import { AccountModal } from '@shared/components/header/AccountModal';
import { MenuItem } from '@shared/components/header/MenuItem';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { Hash } from '@shared/typings';
import {
  ROUTE_COURSES,
  ROUTE_LANDING_PAGE,
  ROUTE_INCIDENTS,
} from '@shared/utils/route';
import { getShortenedFormat } from '@shared/utils/string.utils';
import Link from 'next/link';
import { useState } from 'react';

import { useUser } from '../../../hooks/useUser';

export function Header() {
  const [showAccountDetails, setShowAccountDetails] = useState<boolean>(false);
  const { address, isConnected, login } = useUser();

  return (
    <div className="h-16 w-full bg-third">
      <div className="mx-auto flex h-full w-full items-center justify-between px-5">
        <div className="flex items-center justify-between space-x-10">
          <Link
            href={ROUTE_LANDING_PAGE}
            className="text-2xl font-semibold text-black"
          >
            ⚫️
          </Link>
          <div className="flex items-center space-x-6">
            <MenuItem label="Incidents" href={ROUTE_INCIDENTS} />
            <MenuItem label="Courses" href={ROUTE_COURSES} />
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-8">
          {/* <div className="text-xs font-medium">{data?.toString()}</div>*/}
          {isConnected ? (
            <div
              onClick={() => setShowAccountDetails(true)}
              className="flex w-full items-center justify-between space-x-2 rounded bg-third px-4 py-2 brightness-95 transition-all duration-500 hover:brightness-90"
            >
              <EthAddressIcon address={address as Hash} />
              <Paragraph className="text-sm">
                {getShortenedFormat(address, 6)}
              </Paragraph>
            </div>
          ) : (
            <Button onClick={login} variant="primary">
              Connect
            </Button>
          )}
        </div>
      </div>
      {showAccountDetails && (
        <AccountModal close={() => setShowAccountDetails(false)} />
      )}
    </div>
  );
}
