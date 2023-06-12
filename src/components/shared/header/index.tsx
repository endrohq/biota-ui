import { Button } from '@shared/components/button';

import { MenuItem } from '@shared/components/header/MenuItem';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { Modal } from '@shared/components/modal';
import { Paragraph } from '@shared/components/typography/Paragraph';
import {
  ROUTE_COURSES,
  ROUTE_LANDING_PAGE,
  ROUTE_PROPOSALS,
} from '@shared/utils/route';
import { getShortenedFormat } from '@shared/utils/string.utils';
import Link from 'next/link';
import { useState } from 'react';
import { useBlockNumber } from 'wagmi';

import { useUser } from '../../../hooks/useUser';

export function Header() {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const { address, isConnected, login } = useUser();
  const { data } = useBlockNumber({
    enabled: true,
    watch: true,
  });
  return (
    <>
      <div className="flex h-16 w-full items-center justify-between bg-third px-10">
        <div className="flex items-center justify-between space-x-10">
          <Link
            href={ROUTE_LANDING_PAGE}
            className="text-2xl font-semibold text-black"
          >
            ⚫️
          </Link>
          <div className="flex items-center space-x-6">
            <MenuItem label="Proposals" href={ROUTE_PROPOSALS} />
            <MenuItem label="Courses" href={ROUTE_COURSES} />
          </div>
        </div>
        <div className="flex cursor-pointer items-center space-x-8">
          <div className="text-xs font-medium">{data?.toString()}</div>
          {isConnected ? (
            <div
              onClick={() => setShowUserDetails(true)}
              className="flex w-full items-center justify-between space-x-2 rounded bg-green-50 px-4 py-2 transition-all duration-500 hover:bg-green-100"
            >
              <EthAddressIcon address={address} />
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
      {showUserDetails && (
        <Modal close={() => setShowUserDetails(false)} open={true}>
          hello world
        </Modal>
      )}
    </>
  );
}
