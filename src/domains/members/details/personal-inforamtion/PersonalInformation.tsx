import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { DAYJS_FORMAT } from '@/shared/constants';
import type { Staff } from '@/shared/types/staff';
import dayjs from 'dayjs';

type PersonalInformationProps = {
  staff: Staff;
};

export function PersonalInformation({ staff }: PersonalInformationProps) {
  const rows = [
    {
      label: 'Role',
      value: staff.role ?? '—',
    },
    {
      label: 'Department',
      value: staff.department ?? '—',
    },
    {
      label: 'Specialty',
      value: staff.specialty ?? '—',
    },
    {
      label: 'License Number',
      value: staff.license_number ?? '—',
    },
    {
      label: 'Employee ID',
      value: staff.employee_id ?? '—',
    },
    {
      label: 'Status',
      value: staff.status ?? '—',
    },
    {
      label: 'Start Date',
      value: staff.start_date ? dayjs(staff.start_date).format(DAYJS_FORMAT) : '—',
    },
    {
      label: 'End Date',
      value: staff.end_date ? dayjs(staff.end_date).format(DAYJS_FORMAT) : '—',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar className="w-[80px] h-[80px] self-start">
            <AvatarImage
              src={staff.profile_image ? URL.createObjectURL(staff.profile_image) : ''}
            />
            <AvatarFallback>{`${staff.first_name[0]}${staff.last_name[0]}`}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-1">
            <CardTitle>
              {staff.first_name} {staff.last_name}
            </CardTitle>
            <CardDescription>{staff.email}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="mb-3">Professional Details</CardTitle>

        <div className="divide-y divide-border">
          {rows.map(({ label, value }) => (
            <div key={label} className="flex justify-between py-1">
              <span className="font-medium">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
