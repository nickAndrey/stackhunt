import { Avatar, AvatarFallback, AvatarImage } from '@/design-system/components/ui/avatar';
import { Button } from '@/design-system/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/design-system/components/ui/card';
import { NoData } from '@/shared/components/NoData';
import { DAYJS_FORMAT } from '@/shared/constants';
import type { PatientStaffAssignment } from '@/shared/types/patient-staff-assignment';
import dayjs from 'dayjs';
import { Plus, UserX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAssignedPatients } from '../../services/get-assigned-patients';
import type { AssignedPatient } from '../../types/assigned-patient';
import { AssignPatientModal, useAssignPatientModal } from './components/assign-patient-modal';
import { UnassignPatientModal, useUnassignPatientModal } from './components/unassign-patient-modal';
import { getLabelByRoleAssignment } from './utils/get-label-by-role-assignment';

type AssignedPatientCardProps = {
  staffId: string;
  assignments?: PatientStaffAssignment[];
};

export function AssignedPatientCard(props: AssignedPatientCardProps) {
  const assignPatientModal = useAssignPatientModal();
  const unassignPatientModal = useUnassignPatientModal();

  const [assignedPatients, setAssignedPatients] = useState<AssignedPatient[]>([]);

  useEffect(() => {
    getAssignedPatients(props.staffId, props.assignments).then((data) => setAssignedPatients(data));
  }, []);

  useEffect(() => {
    if (assignPatientModal.isPatientAssigned) {
      getAssignedPatients(props.staffId)
        .then((data) => setAssignedPatients(data))
        .finally(() => assignPatientModal.setIsPatientAssigned(false));
    }
  }, [assignPatientModal.isPatientAssigned]);

  useEffect(() => {
    if (unassignPatientModal.isPatientUnassigned) {
      getAssignedPatients(props.staffId)
        .then((data) => setAssignedPatients(data))
        .finally(() => unassignPatientModal.setIsPatientUnassigned(false));
    }
  }, [unassignPatientModal.isPatientUnassigned]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Assigned Patients</CardTitle>
          <CardAction>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 rounded-2xl"
              onClick={() => assignPatientModal.handleToggleModal(true)}
            >
              <Plus />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {assignedPatients.length === 0 && <NoData />}

          {assignedPatients.length > 0 && (
            <ul className="divide-y">
              {assignedPatients.map((item) => (
                <li key={item.patient_id} className="py-2 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={item.profile_image ? URL.createObjectURL(item.profile_image) : ''}
                    />
                    <AvatarFallback>{`${item.first_name[0]}${item.last_name[0]}`}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p>{`${item.first_name} ${item.last_name}`}</p>
                    <small>
                      Assigned as {getLabelByRoleAssignment(item.role)}, from{' '}
                      {dayjs(item.start_date).format(DAYJS_FORMAT)}.
                    </small>
                  </div>
                  <Button
                    variant="ghost"
                    className="rounded-full size-8 ml-auto"
                    onClick={() => unassignPatientModal.handleToggleModal(true, item.assignment_id)}
                  >
                    <UserX />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      <AssignPatientModal {...assignPatientModal} />
      <UnassignPatientModal {...unassignPatientModal} />
    </>
  );
}
