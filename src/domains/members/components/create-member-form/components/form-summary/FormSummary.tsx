import { DAYJS_FORMAT } from '@/shared/constants';
import dayjs from 'dayjs';
import { useCreateMemberForm } from '../../hooks/useCreateMemberForm';

type FormSummaryProps = ReturnType<typeof useCreateMemberForm>['forms'];

export function FormSummary(forms: FormSummaryProps) {
  const finalData = {
    ...forms.step1Form.getValues(),
    ...forms.step2Form.getValues(),
    ...forms.step3Form.getValues(),
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <b>Personal Info:</b>
        <div className="pl-2">
          <p>Name: {`${finalData.first_name} ${finalData.last_name}`}</p>
          <p>Email: {finalData.email}</p>
          <p>Gender: {finalData.gender}</p>
          <p>Contact Method: {finalData.preferred_contact_method}</p>
        </div>
      </div>

      <div>
        <b>Job Details:</b>
        <div className="pl-2">
          <p>Role: {finalData.role || '--'}</p>
          <p>Status: {finalData.status || '--'}</p>
          <p>Department: {finalData.department || '--'}</p>
          <p>Specialty: {finalData.specialty || '--'}</p>
          <p>License Number: {finalData.license_number || '--'}</p>
          <p>Employee Id: {finalData.employee_id || '--'}</p>
          <p>Start Date: {dayjs(finalData.start_date).format(DAYJS_FORMAT)}</p>
        </div>
      </div>

      <div>
        <b>Address & Bio Details:</b>
        <div className="pl-2">
          <p>Street: {finalData.address.street || '--'}</p>
          <p>City: {finalData.address.city || '--'}</p>
          <p>Zip Code: {finalData.address.zip_code || '--'}</p>
          <p>Bio: {finalData.bio || '--'}</p>
        </div>
      </div>
    </div>
  );
}
