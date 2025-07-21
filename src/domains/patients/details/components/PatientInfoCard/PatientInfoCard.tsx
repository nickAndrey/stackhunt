import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { Button } from '@/design-system/components/ui/button';
import { Card } from '@/design-system/components/ui/card';
import type { Patient } from '@/shared/types/patient';

type PatientInfoCardProps = {
  patient: Patient;
  onClickSendMessage: () => void;
};

function PatientInfoCard({ patient, onClickSendMessage }: PatientInfoCardProps) {
  const patientDetails = [
    {
      id: 'gender',
      label: 'Gender',
      value: patient.gender,
    },
    {
      id: 'birth_date',
      label: 'Birthday',
      value: patient.birth_date,
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
      value: patient.registration_date,
    },
    {
      id: 'preferred_language',
      label: 'Preferred Language',
      value: patient.preferred_language,
    },
  ];

  return (
    <Card className="grid grid-cols-[1fr] gap-0">
      <div className="grid sm:grid-cols-[auto_1fr] sm:px-4 pb-4 gap-4 border-b-1">
        <Avatar className="w-24 h-24 sm:mb-3 m-auto">
          <AvatarImage
            src={
              'https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
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

          <Button className="mt-2 w-max" onClick={onClickSendMessage}>
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
  );
}

export default PatientInfoCard;
