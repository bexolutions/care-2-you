import { CustomerEntry, customers } from "@/lib/customers";
import { db } from "@/lib/db";


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const customersData: CustomerEntry[] = [
      {
        name: 'Hans Müller',
        email: 'hans.mueller@example.com',
        contactnumber: '+41-31-111-2222',
        location: 'Bern, Schweiz',
        registrationdate: new Date('2021-03-25'),
        servicesneeded: [
          'Häusliche Pflege',
          'Einkaufsdienst',
          'Haushaltshilfe'
        ],
        notes: 'Requires assistance with daily activities',
        status: 'active'
      },
      {
        name: 'Elena Schmidt',
        email: 'elena.schmidt@example.com',
        contactnumber: '+41-31-222-3333',
        location: 'Zürich, Schweiz',
        registrationdate: new Date('2020-11-15'),
        servicesneeded: [
          '24-Stunden-Pflege',
          'Therapien'
        ],
        notes: 'Post-surgery recovery, needs regular check-ins',
        status: 'active'
      },
      {
        name: 'Karl Fischer',
        email: 'karl.fischer@example.com',
        contactnumber: '+41-31-333-4444',
        location: 'Lausanne, Schweiz',
        registrationdate: new Date('2019-06-01'),
        servicesneeded: [
          'Transportdienst',
          'Begleitdienste'
        ],
        notes: 'Requires transportation for medical appointments',
        status: 'active'
      },
      {
        name: 'Anna Meyer',
        email: 'anna.meyer@example.com',
        contactnumber: '+41-31-444-5555',
        location: 'Genf, Schweiz',
        registrationdate: new Date('2022-01-10'),
        servicesneeded: [
          'Alltagsbegleitung',
          'Pflegeberatung'
        ],
        notes: 'Prefers female caregivers',
        status: 'active'
      },
      {
        name: 'Petra Weber',
        email: 'petra.weber@example.com',
        contactnumber: '+41-31-555-6666',
        location: 'Basel, Schweiz',
        registrationdate: new Date('2021-09-20'),
        servicesneeded: [
          'Hausbesuche',
          'Pflege zuhause'
        ],
        notes: 'Lives alone, requires daily visits',
        status: 'active'
      }
      // Add more customer entries as needed
    ];

    // Insert customers data into the database
    await db.insert(customers).values(customersData);
    
    // Return a success response
    return new Response(JSON.stringify({ message: 'Customers seeded successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error seeding customers:', error);
    
    // Return an error response
    return new Response(JSON.stringify({ error: 'Failed to seed customers' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}




// CREATE TABLE customers (
//   id SERIAL PRIMARY KEY,
//   name TEXT NOT NULL,
//   email TEXT NOT NULL,
//   contactnumber TEXT NOT NULL,
//   location TEXT NOT NULL,
//   registrationdate TIMESTAMP NOT NULL,
//   servicesNeeded TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[], 
//   notes TEXT,
//   status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'archived'))
// );

