import {
  Center,
  Container,
  DrawerBody,
  DrawerFooter,
  Heading,
  ModalBody,
  ModalFooter,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type ProfileFormRenderButtons = (options: {
  submitLabel?: string;
  isLoading?: boolean;
}) => JSX.Element;
type ProfileFormPortalLayoutComponent = 'modal' | 'drawer';
type ProfileFormLayoutComponent =
  | 'standalone'
  | ProfileFormPortalLayoutComponent;

interface ProfileFormHeadingProps {
  title?: string;
}

interface ProfileFormFooterProps extends React.PropsWithChildren {
  renderFormButtons?: ProfileFormRenderButtons;
}

interface ProfileFormBodyProps
  extends ProfileFormHeadingProps,
    ProfileFormFooterProps {}

interface ProfileFormLayoutOptions {
  layoutComponent: ProfileFormLayoutComponent;
  submitLabel?: string;
  footerContent?: ReactNode;
}

interface ProfileFormLayoutProps
  extends ProfileFormHeadingProps,
    Required<ProfileFormFooterProps>,
    ProfileFormLayoutOptions {}

type LayoutContainers =
  | [typeof ModalBody, typeof ModalFooter]
  | [typeof DrawerBody, typeof DrawerFooter]
  | [];

interface ProfileComponentProps extends ProfileFormLayoutOptions {
  title?: string;
}

const ProfileFormBody = ({
  title,
  subtitle,
  renderFormButtons,
  children,
}: ProfileFormBodyProps & { subtitle?: string }) => (
  <Container maxW="1000px">
    <VStack
      align="center"
      spacing={10}
      mt={title ? 14 : undefined}
      mb={title ? 3 : undefined}>
      {title && (
        <Center>
          <Heading size="lg">{title}</Heading>
          {subtitle && <Text fontSize="md">{subtitle}</Text>}
        </Center>
      )}
      {children}
    </VStack>
    {renderFormButtons && (
      <Stack direction="column" align="end">
        {renderFormButtons({})}
      </Stack>
    )}
  </Container>
);

const ProfileFormLayout = ({
  title,
  renderFormButtons,
  submitLabel,
  layoutComponent = 'drawer',
  footerContent,
  children,
}: ProfileFormLayoutProps) => {
  const [BodyContainer, FooterContainer]: LayoutContainers =
    layoutComponent === 'modal'
      ? [ModalBody, ModalFooter]
      : layoutComponent === 'drawer'
        ? [DrawerBody, DrawerFooter]
        : [];
  const renderWithContainers = !!(BodyContainer && FooterContainer);

  const renderButtons = () =>
    renderFormButtons && renderFormButtons({ submitLabel });
  return renderWithContainers ? (
    <>
      <BodyContainer>
        <ProfileFormBody
          title={layoutComponent === 'drawer' ? undefined : title}>
          {children}
        </ProfileFormBody>
      </BodyContainer>
      <FooterContainer>
        {footerContent}
        {renderButtons()}
      </FooterContainer>
    </>
  ) : (
    <ProfileFormBody title={title} renderFormButtons={renderButtons}>
      {children}
    </ProfileFormBody>
  );
};

export { ProfileFormLayout };
export type {
  ProfileFormLayoutProps,
  ProfileComponentProps,
  ProfileFormRenderButtons,
  ProfileFormLayoutComponent,
};
