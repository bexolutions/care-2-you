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
import { Customer } from './customer'; // Update the import path as needed
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectCustomer } from '@/lib/customers';

export function CustomersTable({
  customers,
  offset,
  totalCustomers
}: {
  customers: SelectCustomer[];
  offset: number;
  totalCustomers: number;
}) {
  const router = useRouter();
  const customersPerPage = 5;

  const prevPage = () => {
    router.back();
  };

  const nextPage = () => {
    router.push(`/?offset=${offset}`, { scroll: false });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers Table</CardTitle>
        <CardDescription>
          All Care2You Customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <Customer key={customer.id} customer={customer} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.min(offset - customersPerPage, totalCustomers) + 1}-{offset}
            </strong>{' '}
            of <strong>{totalCustomers}</strong> customers
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === customersPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + customersPerPage > totalCustomers}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
