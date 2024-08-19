import {
  Box,
  BoxProps,
  HStack,
  IconButton,
  Popover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BiCopy } from 'react-icons/bi';

type CopyValueIconPosition = 'left' | 'right';

export interface CopyValueProps extends BoxProps {
  children?: ReactNode;
  copiedText?: string;
  ariaLabel?: string;
  value: string;
  iconPosition?: CopyValueIconPosition;
}

function CopyValue({
  copiedText = 'Copied!',
  ariaLabel = 'Copy value',
  value,
  iconPosition = 'right',
  children,
  ...boxProps
}: CopyValueProps) {
  const { hasCopied, onCopy } = useClipboard(value);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const childContent = (
    <PopoverAnchor>
      <Box>{children}</Box>
    </PopoverAnchor>
  );
  return (
    <Box {...boxProps}>
      <Popover
        isOpen={hasCopied && isOpen}
        onOpen={onOpen}
        onClose={onClose}
        closeOnBlur={false}
        placement="top">
        <HStack>
          {iconPosition === 'right' && childContent}
          <PopoverTrigger>
            <IconButton
              aria-label={ariaLabel}
              icon={<BiCopy />}
              variant="link"
              onClick={onCopy}
            />
          </PopoverTrigger>
          {iconPosition === 'left' && childContent}
        </HStack>
        <PopoverContent w="100%">
          <PopoverArrow />
          <PopoverBody fontSize="sm">{copiedText}</PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
}

export { CopyValue, CopyValue as default };
