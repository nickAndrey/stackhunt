import { Avatar, AvatarImage } from '@/design-system/components/ui/avatar';
import { Button } from '@/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import { DAYJS_FORMAT } from '@/shared/constants';
import type { Staff } from '@/shared/types/staff';
import { AvatarFallback } from '@radix-ui/react-avatar';
import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { MoreVertical } from 'lucide-react';

type Params = {
  actions: {
    createAppointment: (staff: Staff) => void;
    viewDetails: (staff: Staff) => void;
  };
};

export function columnsConfig(params: Params): ColumnDef<Staff>[] {
  return [
    {
      cell: ({ row }) => {
        const { profile_image, first_name, last_name } = row.original;

        const img =
          profile_image && typeof profile_image !== 'string'
            ? URL.createObjectURL(profile_image)
            : '';

        return (
          <Avatar className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-visible">
            {img ? (
              <AvatarImage
                src={img}
                alt={`${first_name} ${last_name}`}
                className="object-cover w-10 h-10 rounded-full"
              />
            ) : (
              <AvatarFallback>{`${first_name[0]}${last_name[0]}`}</AvatarFallback>
            )}
          </Avatar>
        );
      },
      header: 'Photo',
    },
    {
      accessorFn: (row) => `${row.first_name} ${row.last_name}`,
      id: 'fullName',
      header: 'Name',
    },
    {
      accessorKey: 'department',
      header: 'Department',
    },
    {
      accessorKey: 'specialty',
      header: 'Specialty',
    },
    {
      accessorKey: 'status',
      header: 'Status',
    },
    {
      accessorFn: (row) => {
        const key = row.preferred_contact_method === 'email' ? 'email' : 'phone';
        return row[key];
      },
      id: 'contact',
      header: 'Contact',
    },
    {
      accessorKey: 'employee_id',
      header: 'Employee ID',
    },
    {
      accessorFn: (row) => dayjs(row.start_date).format(DAYJS_FORMAT),
      header: 'Start Date',
    },
    {
      accessorKey: 'preferred_contact_method',
      header: 'Preferred Contact',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => params.actions.createAppointment(row.original)}>
                Create Appointment
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => params.actions.viewDetails(row.original)}>
                View Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
