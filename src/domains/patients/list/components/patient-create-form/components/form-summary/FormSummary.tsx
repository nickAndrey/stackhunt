import { DAYJS_FORMAT } from '@/shared/constants';
import dayjs from 'dayjs';
import type { usePatientCreateForm } from '../../hooks/usePatientCreateForm';

type FormSummaryProps = ReturnType<typeof usePatientCreateForm>['forms'];

export function FormSummary(forms: FormSummaryProps) {
  const finalData = {
    ...forms.step1Form.getValues(),
    ...forms.step2Form.getValues(),
    ...forms.step3Form.getValues(),
    ...forms.step4Form.getValues(),
    ...forms.step5Form.getValues(),
    ...forms.step6Form.getValues(),
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <b>Personal Info:</b>
        <div className="pl-2">
          <p>
            Name: {finalData.first_name} {finalData.last_name}
          </p>
          <p>Gender: {finalData.gender}</p>
          <p>Date of birth: {dayjs(finalData.birth_date).format(DAYJS_FORMAT)}</p>
        </div>
      </div>

      <div>
        <b>Contact Info:</b>
        <div className="pl-2">
          <p>Phone: {finalData.phone}</p>
          <p>Email: {finalData.email}</p>
        </div>
      </div>

      <div>
        <b>Emergency Contact Info:</b>
        <div className="pl-2">
          <p>Name: {finalData.emergency_contact.name || ''}</p>
          <p>Relation: {finalData.emergency_contact.relation || ''}</p>
          <p>Phone: {finalData.emergency_contact.phone || ''}</p>
        </div>
      </div>

      <div>
        <b>Address:</b>
        <div className="pl-2">
          <p>
            {finalData.address.street} {finalData.address.city} {finalData.address.zip_code}
          </p>
        </div>
      </div>

      <div>
        <b>Identification:</b>
        <div className="pl-2">
          <p>National ID: {finalData.national_id || '--'}</p>
          <p>Insurance Number: {finalData.insurance_number || '--'}</p>
          <p>Registration Date: {dayjs(finalData.registration_date).format(DAYJS_FORMAT)}</p>
        </div>
      </div>

      <div>
        <b>Medical Info:</b>
        <div className="pl-2">
          <p>Medical Flags: {finalData.medical_flags}</p>
          <p>Conditions: {finalData.conditions}</p>

          <p className="my-2">
            <b>Allergies:</b>
          </p>
          <div className="pl-2">
            <ul>
              {finalData.allergies.map((item) => (
                <li key={item.substance} className="border-b mb-2">
                  <p>Substance: {item.substance}</p>
                  <p>Reaction: {item.reaction}</p>
                  <p>Severity: {item.severity}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="my-2">
            <b>Medications:</b>
          </p>
          <div className="pl-2">
            <ul>
              {finalData.medications.map((item) => (
                <li key={item.name} className="border-b mb-2">
                  <p>Name: {item.name}</p>
                  <p>Dosage: {item.dosage}</p>
                  <p>Start Date: {dayjs(item.start_date).format(DAYJS_FORMAT)}</p>
                  <p>End Date: {dayjs(item.end_date).format(DAYJS_FORMAT)}</p>
                  <p>Prescribed By: {item.prescribed_by}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <b>Tags:</b>
        <div className="pl-2">
          <p>Status: {finalData.status}</p>
          <p>Tags: {finalData.tags || '--'}</p>
        </div>
      </div>
    </div>
  );
}
