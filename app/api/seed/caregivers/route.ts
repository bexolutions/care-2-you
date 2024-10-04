
import { CaregiverEntry, caregivers } from "@/lib/caregivers";
import { db } from "@/lib/db"; 

export const dynamic = 'force-dynamic'; 

export async function GET() { 
  try { 
    const caregiversData: CaregiverEntry[] = [ 
      { 
        name: 'Clara Müller', 
        email: 'clara.mueller@example.com', 
        contactnumber: '+41-31-111-7777', 
        location: 'Bern, Schweiz', 
        registrationdate: new Date('2021-05-01'), 
        servicesoffered: [ 
          'Häusliche Pflege', 
          'Alltagsbegleitung' 
        ], 
        qualifications: [ 
          'Pflegefachkraft', 
          'Erste-Hilfe-Zertifikat' 
        ], 
        languagesspoken: [ 
          'Deutsch', 
          'Englisch' 
        ], 
        availability: true, 
        profileimage: 'https://example.com/images/clara.jpg', 
        status: 'active', 
        notes: 'Specializes in elderly care and companionship' 
      }, 
      { 
        name: 'Thomas Keller', 
        email: 'thomas.keller@example.com', 
        contactnumber: '+41-31-222-8888', 
        location: 'Zürich, Schweiz', 
        registrationdate: new Date('2020-08-20'), 
        servicesoffered: [ 
          'Transportdienst', 
          'Medizinische Begleitung' 
        ], 
        qualifications: [ 
          'Notfallsanitäter', 
          'Zertifikat für Altenpflege' 
        ], 
        languagesspoken: [ 
          'Deutsch', 
          'Französisch' 
        ], 
        availability: true, 
        profileimage: 'https://example.com/images/thomas.jpg', 
        status: 'active', 
        notes: 'Experienced in medical escort services' 
      }, 
      { 
        name: 'Sophie Weiss', 
        email: 'sophie.weiss@example.com', 
        contactnumber: '+41-31-333-9999', 
        location: 'Lausanne, Schweiz', 
        registrationdate: new Date('2022-02-15'), 
        servicesoffered: [ 
          'Alltagsbegleitung', 
          'Körperpflege' 
        ], 
        qualifications: [ 
          'Altenpflegerin', 
          'Hauswirtschaftsleiterin' 
        ], 
        languagesspoken: [ 
          'Deutsch', 
          'Italienisch' 
        ], 
        availability: false, 
        profileimage: 'https://example.com/images/sophie.jpg', 
        status: 'inactive', 
        notes: 'Currently on maternity leave' 
      }, 
      { 
        name: 'Lukas Hoffmann', 
        email: 'lukas.hoffmann@example.com', 
        contactnumber: '+41-31-444-0000', 
        location: 'Genf, Schweiz', 
        registrationdate: new Date('2023-03-10'), 
        servicesoffered: [ 
          'Einkaufsdienst', 
          'Haushaltshilfe' 
        ], 
        qualifications: [ 
          'Zertifikat für Altenpflege' 
        ], 
        languagesspoken: [ 
          'Deutsch', 
          'Englisch' 
        ], 
        availability: true, 
        profileimage: 'https://example.com/images/lukas.jpg', 
        status: 'active', 
        notes: 'Available for evening shifts' 
      }, 
      { 
        name: 'Petra Schneider', 
        email: 'petra.schneider@example.com', 
        contactnumber: '+41-31-555-1111', 
        location: 'Basel, Schweiz', 
        registrationdate: new Date('2021-07-25'), 
        servicesoffered: [ 
          'Pflege zuhause', 
          'Therapien' 
        ], 
        qualifications: [ 
          'Physiotherapeutin', 
          'Zertifikat für Altenpflege' 
        ], 
        languagesspoken: [ 
          'Deutsch', 
          'Englisch', 
          'Spanisch' 
        ], 
        availability: true, 
        profileimage: 'https://example.com/images/petra.jpg', 
        status: 'active', 
        notes: 'Specializes in physical therapy for seniors' 
      } 
      // Add more caregiver entries as needed 
    ]; 

    // Insert caregivers data into the database 
    await db.insert(caregivers).values(caregiversData); 
    
    // Return a success response 
    return new Response(JSON.stringify({ message: 'Caregivers seeded successfully' }), { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
    }); 

  } catch (error) { 
    console.error('Error seeding caregivers:', error); 
    
    // Return an error response 
    return new Response(JSON.stringify({ error: 'Failed to seed caregivers' }), { 
      status: 500, 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
    }); 
  } 
}



// CREATE TABLE caregivers (
//   id SERIAL PRIMARY KEY,                               -- Auto-incrementing ID for each caregiver
//   name TEXT NOT NULL,                                  -- Caregiver's name
//   email TEXT NOT NULL UNIQUE,                          -- Caregiver's email, must be unique
//   contactnumber TEXT NOT NULL,                         -- Caregiver's contact number
//   location TEXT NOT NULL,                              -- Caregiver's location
//   registrationdate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Caregiver registration date
//   servicesOffered TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[], -- Array of services offered by the caregiver
//   qualifications TEXT[],                               -- Array of caregiver qualifications (e.g., certifications)
//   languagesSpoken TEXT[],                              -- Array of languages spoken by the caregiver
//   availability BOOLEAN DEFAULT TRUE,                   -- Caregiver availability status
//   profileImage VARCHAR(255),                           -- URL to caregiver's profile image
//   status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'archived')), -- Caregiver status
//   notes TEXT                                          -- Additional notes about the caregiver
// );
