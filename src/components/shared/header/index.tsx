import { Button } from '@shared/components/button';

import { MenuItem } from '@shared/components/header/MenuItem';
import { UserDetails } from '@shared/components/header/UserDetails';
import {
  ROUTE_LANDING_PAGE,
  ROUTE_PROPOSALS,
  ROUTE_FORESTS,
} from '@shared/utils/route';
import Link from 'next/link';
import { useEffect } from 'react';

import { useUser } from '../../../hooks/useUser';

export function Header() {
  const { isConnected, login } = useUser();

  useEffect(() => {
    login();
  }, []);

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
            <MenuItem label="Proposals" href={ROUTE_PROPOSALS} />
            <MenuItem label="Forests" href={ROUTE_FORESTS} />
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-8">
          {isConnected ? (
            <UserDetails />
          ) : (
            <Button onClick={login} variant="primary">
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
