'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Caregiver } from './caregivers'; // Update this import to refer to the Caregiver component
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectCaregiver } from '@/lib/caregivers';

export function CaregiversTable({
  caregivers,
  offset,
  totalCaregivers
}: {
  caregivers: SelectCaregiver[];
  offset: number;
  totalCaregivers: number;
}) {
  const router = useRouter();
  const caregiversPerPage = 5; // Adjust as needed

  const prevPage = () => {
    router.back();
  };

  const nextPage = () => {
    router.push(`/?offset=${offset}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Caregivers Table</CardTitle>
        <CardDescription>
          Alle Care2You caregivers        
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Standort</TableHead>
              <TableHead className="hidden md:table-cell">Qualifikationen</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {caregivers.map((caregiver) => (
              <Caregiver key={caregiver.id} caregiver={caregiver} /> // Update to render caregiver
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - caregiversPerPage, totalCaregivers) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalCaregivers}</strong> caregivers
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === caregiversPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + caregiversPerPage > totalCaregivers}
            >
              Weiter
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
