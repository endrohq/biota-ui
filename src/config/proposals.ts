import { Proposal } from '@shared/typings';

export const proposals: Proposal[] = [
  {
    id: '1',
    title: 'Proposal 1',
    requiredCourseIds: ['1'],
    author: '0x11A18Ebf60A587Fd8C96a2BB4b901A15Ad0d54eb',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
  },
  {
    id: '2',
    title: 'Proposal 2',
    requiredCourseIds: ['4'],
    author: '0x11A18Ebf60A587Fd8C96a2BB4b901A15Ad0d54eb',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
  },
  {
    id: '3',
    title: 'Proposal 3',
    requiredCourseIds: [],
    author: '0x11A18Ebf60A587Fd8C96a2BB4b901A15Ad0d54eb',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
  },
  {
    id: '4',
    title: 'Proposal 4',
    requiredCourseIds: ['2'],
    author: '0x11A18Ebf60A587Fd8C96a2BB4b901A15Ad0d54eb',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl. Donec euismod, nisl eget lacinia lacinia, nunc nisl aliquam nunc, vitae aliquam nisl nunc vitae nisl.',
  },
];
