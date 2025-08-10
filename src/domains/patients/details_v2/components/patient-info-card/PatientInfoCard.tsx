import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { Button } from '@/design-system/components/ui/button';
import { Card } from '@/design-system/components/ui/card';
import { DAYJS_FORMAT } from '@/shared/constants';
import type { Patient } from '@/shared/types/patient';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { SendMessageModal, useSendMessageModal } from './components/send-message-modal';
import {
  SetPatientProfileImageModal,
  useSetPatientProfileImageModal,
} from './components/set-patient-profile-image-modal';

type PatientInfoCardProps = {
  patient: Patient;
};

export function PatientInfoCard({ patient }: PatientInfoCardProps) {
  const sendMessageModal = useSendMessageModal();
  const setProfileImageModal = useSetPatientProfileImageModal(patient.id);

  const [profileImg, setProfileImg] = useState(
    patient.profile_image ? URL.createObjectURL(patient.profile_image) : ''
  );

  useEffect(() => {
    if (setProfileImageModal.newAvatar) {
      setProfileImg(URL.createObjectURL(setProfileImageModal.newAvatar));
    }
  }, [setProfileImageModal.newAvatar]);

  const patientDetails = [
    {
      id: 'gender',
      label: 'Gender',
      value: patient.gender,
    },
    {
      id: 'birth_date',
      label: 'Birthday',
      value: dayjs(patient.birth_date).format(DAYJS_FORMAT),
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: patient.phone,
    },
    {
      id: 'address_street',
      label: 'Address',
      value: patient.address.street,
    },
    {
      id: 'city',
      label: 'City',
      value: patient.address.city,
    },
    {
      id: 'zip_code',
      label: 'Zip Code',
      value: patient.address.zip_code,
    },
    {
      id: 'registration_date',
      label: 'Registration Date',
      value: dayjs(patient.registration_date).format(DAYJS_FORMAT),
    },
    {
      id: 'preferred_language',
      label: 'Preferred Language',
      value: patient.preferred_language,
    },
  ];

  return (
    <>
      <Card className="grid grid-cols-[1fr] gap-0">
        <div className="grid sm:grid-cols-[auto_1fr] sm:px-4 pb-4 gap-4 border-b-1">
          <Avatar
            className="w-24 h-24 sm:mb-3 m-auto"
            onClick={() => setProfileImageModal.toggleModal(true)}
          >
            <AvatarImage
              src={profileImg}
              className="object-cover"
              alt={`patient: ${patient.first_name} ${patient.last_name}`}
            />
            <AvatarFallback>
              {patient.first_name[0]}
              {patient.last_name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-center items-center sm:text-left sm:items-start">
            <h4>{`${patient.first_name} ${patient.last_name}`}</h4>
            <small>{patient.email}</small>

            <Button className="mt-2 w-max" onClick={() => sendMessageModal.toggleModal(true)}>
              Send Message
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,auto))] px-4 pt-4 gap-3">
          {patientDetails.map((details) => (
            <div className="flex flex-col gap-0.5 px-1" key={details.id}>
              <span className="font-semibold text-sm">{details.label}</span>
              <p className="text-gray-500 text-xs">{details.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <SendMessageModal {...sendMessageModal} />
      <SetPatientProfileImageModal {...setProfileImageModal} />
    </>
  );
}
