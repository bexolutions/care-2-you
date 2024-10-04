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
import { deleteMerchant } from './actions';
import { SelectMerchant } from '@/lib/merchants';

export function Merchant({ merchant }: { merchant: SelectMerchant }) {
  // Check if the name already contains the firmentyp
  const shouldDisplayFirmenTyp = !merchant.name.includes(merchant.firmentyp);

  return (
    <TableRow>
      <TableCell className="font-medium">
        {merchant.name}
        {shouldDisplayFirmenTyp && ` ${merchant.firmentyp}`} {/* Only show firmentyp if not included in the name */}
      </TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {merchant.status}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{merchant.location}</TableCell>
      <TableCell className="hidden md:table-cell">{merchant.branche}</TableCell>
      <TableCell className="hidden md:table-cell">
        {/* {merchant.registrationdate} */}
      </TableCell>
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
              <form action={deleteMerchant}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
