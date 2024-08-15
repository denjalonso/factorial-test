import { PropsWithChildren } from 'react';
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
} from '@chakra-ui/react';

type DrawerWithHeaderContentProps = PropsWithChildren<{
  title: string;
  placement?: 'left' | 'right';
  isOpen: boolean;
  onClose: () => void;
}>;

function DrawerWithHeaderContent({
  isOpen,
  onClose,
  title,
  placement = 'right',
  children,
}: DrawerWithHeaderContentProps) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={placement} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <HStack>
            <Text fontSize="2xl" fontWeight="semibold">
              {title}
            </Text>
          </HStack>
        </DrawerHeader>
        <DrawerCloseButton />
        {children}
      </DrawerContent>
    </Drawer>
  );
}

export { DrawerWithHeaderContent };
export type { DrawerWithHeaderContentProps };
