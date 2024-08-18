import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { gql } from '@apollo/client';
import { PersonalInformationFormModal } from '../personal-information';
import { UserOnboardingStepFlowModalFragment } from './step-flow.generated.ts';

gql`
  fragment UserOnboardingStepFlowModal on User {
    id
  }
`;

export default function UserOnboardingStepFlowModal({
  user,
  isOpen,
  onClose,
  onComplete,
}: {
  user: UserOnboardingStepFlowModalFragment;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  return (
    <Modal
      onClose={onClose}
      size="full"
      isOpen={isOpen}
      scrollBehavior="inside"
      closeOnEsc={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Payroll setup</ModalHeader>
        <PersonalInformationFormModal userId={user.id} onSave={onComplete} />
      </ModalContent>
    </Modal>
  );
}
export { UserOnboardingStepFlowModal };
