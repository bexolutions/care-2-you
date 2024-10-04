import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { deleteCaregiver } from './actions'; // Ensure this is defined for caregivers
import { SelectCaregiver } from '@/lib/caregivers'; // Update this import

export function Caregiver({ caregiver }: { caregiver: SelectCaregiver }) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {caregiver.name}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {caregiver.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{caregiver.location}</TableCell>
      <TableCell className="hidden md:table-cell">{caregiver.qualifications?.join(', ')}</TableCell> {/* Update this to show qualifications */}
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteCaregiver}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
