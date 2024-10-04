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
import { Merchant } from './merchants';

import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectMerchant } from '@/lib/merchants';

export function MerchantsTable({
  merchants,
  offset,
  totalMerchants
}: {
  merchants: SelectMerchant[];
  offset: number;
  totalMerchants: number;
}) {
  const router = useRouter();
  const merchantsPerPage = 5;

  const prevPage = () => {
    router.back();
  };

  const nextPage = () => {
    router.push(`/?offset=${offset}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Merchants Table</CardTitle>
        <CardDescription>
          Alle Care2You Merchants        
</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Standort</TableHead>
              <TableHead className="hidden md:table-cell">Branche</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {merchants.map((merchant) => (
              <Merchant key={merchant.id} merchant={merchant} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - merchantsPerPage, totalMerchants) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalMerchants}</strong> merchants
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === merchantsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + merchantsPerPage > totalMerchants}
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
