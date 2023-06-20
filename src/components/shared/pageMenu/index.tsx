import { MenuItem } from '@shared/typings';
import clsx from 'clsx';
import { useEffect } from 'react';

interface PageMenuProps<T> {
  menu: MenuItem<T>[];
  onClick: (item: string) => void;
  activeItem: T;
}

export function PageMenu<T>({ menu, onClick, activeItem }: PageMenuProps<T>) {
  useEffect(() => {
    if (menu.length > 0) {
      onClick(menu[0].id);
    }
  }, []);

  return (
    <div className="mt-20 flex flex-wrap space-x-8 border-b border-gray-200">
      {menu.map((item, index) => (
        <div
          onClick={() => onClick(item.id)}
          key={index}
          className={clsx(
            'bg-transition hover: cursor-pointer border-b-2 px-2 py-2.5 text-sm hover:border-black hover:text-black',
            item.id === activeItem
              ? ' border-green-800 font-semibold text-green-800'
              : 'border-transparent',
          )}
        >
          {/* @ts-ignore */}
          {item.label}
        </div>
      ))}
    </div>
  );
}
