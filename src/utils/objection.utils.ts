import { IpfsObjection, OnChainObjection } from '@shared/typings';
import { utils } from 'ethers';

export function convertToOnChainObjection(
  props: Record<string, any>,
): OnChainObjection | undefined {
  if (!props) return undefined;

  return {
    id: utils.parseBytes32String(props.id),
    cid: props.cid,
    author: props.author,
    proposalId: props.proposalId,
  } as OnChainObjection;
}

export function convertToIpfsObjection(
  props: Record<string, any>,
): IpfsObjection | undefined {
  if (!props) return undefined;
  return {
    category: props?.category,
    content: props?.content,
  } as IpfsObjection;
}
