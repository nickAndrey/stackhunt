import { Button } from '@/design-system/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/components/ui/card';
import type { Staff } from '@/shared/types/staff';

type ContactAndQuickActionsProps = {
  staff: Staff;
};

export function ContactAndQuickActions({ staff }: ContactAndQuickActionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-10">
        {/* Contact Info */}
        <div className="divide-y divide-border">
          <div className="flex justify-between">
            <span className="font-medium">Phone</span>
            {staff.phone ? (
              <a href={`tel:${staff.phone}`} className="text-blue-500 hover:underline">
                {staff.phone}
              </a>
            ) : (
              '—'
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <a href={`mailto:${staff.email}`} className="text-blue-500 hover:underline">
              {staff.email}
            </a>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Preferred Contact</span>
            <span className="capitalize">{staff.preferred_contact_method ?? '—'}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold">24</div>
            <div className="text-xs text-muted-foreground">Patients</div>
          </div>
          <div>
            <div className="text-lg font-bold">12</div>
            <div className="text-xs text-muted-foreground">Appointments</div>
          </div>
          <div>
            <div className="text-lg font-bold">5</div>
            <div className="text-xs text-muted-foreground">Files</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="secondary" className="flex-1">
            Send Message
          </Button>
          <Button className="flex-1">Schedule</Button>
        </div>
      </CardContent>
    </Card>
  );
}
