import { Typography } from '@shared/ui/Typography';
import type { ComponentType } from 'react';
import { Pressable } from 'react-native';

export type MenuItemType = {
  href: string;
  label: string;
  Icon: ComponentType;
};

interface MenuItemProps {
  item: MenuItemType;
  onPress: (href: string) => void;
}

export const MenuItem = ({ item, onPress }: MenuItemProps) => (
  <Pressable
    className="flex-row items-center gap-1 p-2"
    onPress={() => onPress(item.href)}>
    <item.Icon />
    <Typography
      variant="button-large"
      color="text-gray-850"
      className="text-center">
      {item.label}
    </Typography>
  </Pressable>
);
