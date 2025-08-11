import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { Badge } from '@/design-system/components/ui/badge';
import { Button } from '@/design-system/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/design-system/components/ui/dropdown-menu';
import type { Patient } from '@/shared/types/patient';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

type Params = {
  actions: {
    createAppointment: (staff: Patient) => void;
    viewDetails: (staff: Patient) => void;
  };
};

export function columnsConfig(params: Params): ColumnDef<Patient>[] {
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
      header: 'Profile',
    },
    {
      accessorKey: 'gender',
      header: 'Gender',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      header: 'Tags',
      cell: ({ row }) => {
        const { tags } = row.original;
        return (
          <div className="flex gap-2 ">
            {tags.map((tag) => (
              <Badge variant="secondary" className="bg-gray-300" key={tag.id}>
                {tag.tag}
              </Badge>
            ))}
          </div>
        );
      },
    },
    {
      header: 'Flags',
      cell: ({ row }) => {
        const { medical_flags } = row.original;
        return (
          <div className="flex gap-2 ">
            {medical_flags.map((flag) => (
              <Badge variant="destructive" className="bg-red-400" key={flag.id}>
                {flag.flag}
              </Badge>
            ))}
          </div>
        );
      },
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
