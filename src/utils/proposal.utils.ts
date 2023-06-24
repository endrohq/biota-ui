import { IpfsProposal, OnChainProposal } from '@shared/typings';

export function convertToOnChainProposal(
  props: Record<string, any>,
): OnChainProposal | undefined {
  if (!props) return undefined;

  return {
    id: props.id,
    cid: props.cid,
    author: props.author,
    forestTokenId: props.forestTokenId,
    abstainVotes: Number(props.abstainVotes),
    againstVotes: Number(props.againstVotes),
    forVotes: Number(props.forVotes),
    startTimestamp: new Date(Number(props.startTimestamp) * 1000),
    endTimestamp: new Date(Number(props.endTimestamp) * 1000),
  } as OnChainProposal;
}

export function convertToIpfsProposal(
  props: Record<string, any>,
): IpfsProposal | undefined {
  if (!props) return undefined;
  return {
    title: props?.title,
    description: props?.description,
  } as IpfsProposal;
}
