import { db } from "@/lib/db";
import { MerchantEntry, merchants } from "@/lib/merchants";


export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const merchantsData: MerchantEntry[] = [
      {
        name: 'SeniorenPflege Zuhause',
        email: 'kontakt@seniorenpflege.ch',
        contactnumber: '+41-31-555-1234',
        website: 'https://www.seniorenpflege.ch',
        status: 'active',
        location: 'Bern, Schweiz',
        registrationdate: new Date('2021-03-25'),
        branche: 'Hauspflege',
        firmentyp: 'GmbH',
        offers: [
          'Ambulante Pflege',
          'Persönliche Betreuung',
          'Essensvorbereitung',
          'Haushaltshilfe',
          'Transport für Senioren'
        ],
        accessibilityfeatures: [
          'Rollstuhlgerechte Einrichtungen',
          'Zugang für Blinde und Sehbehinderte'
        ],
        languagesspoken: [
          'Schweizerdeutsch',
          'Französisch'
        ],
        pricing: 'CHF 45 - 70 pro Stunde'
      },
      {
        name: 'Pflegezentrum Lindenbaum',
        email: 'info@lindenbaum.ch',
        contactnumber: '+41-31-555-5678',
        website: 'https://www.lindenbaum.ch',
        status: 'active',
        location: 'Zürich, Schweiz',
        registrationdate: new Date('2020-11-15'),
        branche: 'Altenpflege',
        firmentyp: 'AG',
        offers: [
          'Langzeitpflege',
          'Therapien',
          'Tagesstruktur',
          'Kurzzeitpflege'
        ],
        accessibilityfeatures: [
          'Rollstuhlgerecht',
          'Barrierefreie Zugänge'
        ],
        languagesspoken: [
          'Deutsch',
          'Englisch',
          'Italienisch'
        ],
        pricing: 'CHF 60 - 90 pro Stunde'
      },
      {
        name: 'Hauspflege Aare',
        email: 'kontakt@hauspflegeaare.ch',
        contactnumber: '+41-31-555-8765',
        website: 'https://www.hauspflegeaare.ch',
        status: 'active',
        location: 'Bern, Schweiz',
        registrationdate: new Date('2019-06-01'),
        branche: 'Hauspflege',
        firmentyp: 'GmbH',
        offers: [
          '24-Stunden-Pflege',
          'Haushaltshilfe',
          'Einkaufsservice'
        ],
        accessibilityfeatures: [
          'Unterstützung für Senioren',
          'Hausbesuche'
        ],
        languagesspoken: [
          'Deutsch',
          'Spanisch'
        ],
        pricing: 'CHF 50 - 75 pro Stunde'
      },
      {
        name: 'Seniorenheim Blumenau',
        email: 'info@blumenau.ch',
        contactnumber: '+41-31-555-4321',
        website: 'https://www.blumenau.ch',
        status: 'active',
        location: 'Lausanne, Schweiz',
        registrationdate: new Date('2022-01-10'),
        branche: 'Altenpflege',
        firmentyp: 'AG',
        offers: [
          'Pflege rund um die Uhr',
          'Rehabilitation',
          'Gesundheitsförderung'
        ],
        accessibilityfeatures: [
          'Rollstuhlgerecht',
          'Klinik mit Therapieangebot'
        ],
        languagesspoken: [
          'Deutsch',
          'Französisch'
        ],
        pricing: 'CHF 70 - 100 pro Stunde'
      },
      {
        name: 'Pflege & Unterstützung AG',
        email: 'service@pflegenu.ch',
        contactnumber: '+41-31-555-9988',
        website: 'https://www.pflegenu.ch',
        status: 'active',
        location: 'Genf, Schweiz',
        registrationdate: new Date('2021-09-20'),
        branche: 'Pflege',
        firmentyp: 'AG',
        offers: [
          'Pflegeberatung',
          'Palliativpflege',
          'Alltagsbegleitung'
        ],
        accessibilityfeatures: [
          'Barrierefreier Zugang',
          'Hausbesuche'
        ],
        languagesspoken: [
          'Deutsch',
          'Englisch',
          'Türkisch'
        ],
        pricing: 'CHF 55 - 85 pro Stunde'
      },
      {
        name: 'Hausnotruf Schweiz',
        email: 'support@hausnotruf.ch',
        contactnumber: '+41-31-555-1235',
        website: 'https://www.hausnotruf.ch',
        status: 'active',
        location: 'Zürich, Schweiz',
        registrationdate: new Date('2021-04-12'),
        branche: 'Notrufdienste',
        firmentyp: 'GmbH',
        offers: [
          'Notrufsysteme',
          'Telemedizin',
          'Seniorentelefon'
        ],
        accessibilityfeatures: [
          'Einfache Bedienung',
          'Mobile Notrufdienste'
        ],
        languagesspoken: [
          'Deutsch',
          'Englisch'
        ],
        pricing: 'CHF 40 - 60 pro Monat'
      },
      {
        name: 'Altenpflege Müller',
        email: 'kontakt@altenpflegemueller.ch',
        contactnumber: '+41-31-555-2468',
        website: 'https://www.altenpflegemueller.ch',
        status: 'active',
        location: 'Basel, Schweiz',
        registrationdate: new Date('2018-07-30'),
        branche: 'Altenpflege',
        firmentyp: 'Einzelunternehmen',
        offers: [
          'Hausbesuche',
          'Pflegeberatung',
          'Häusliche Unterstützung'
        ],
        accessibilityfeatures: [
          'Individuelle Betreuung',
          'Transportdienste'
        ],
        languagesspoken: [
          'Deutsch'
        ],
        pricing: 'CHF 50 - 80 pro Stunde'
      },
      {
        name: 'Seniorenbetreuung Zürich',
        email: 'info@seniorenbetreuungzh.ch',
        contactnumber: '+41-31-555-3579',
        website: 'https://www.seniorenbetreuungzh.ch',
        status: 'active',
        location: 'Zürich, Schweiz',
        registrationdate: new Date('2020-12-01'),
        branche: 'Betreuung',
        firmentyp: 'GmbH',
        offers: [
          'Begleitdienste',
          'Körperpflege',
          'Hauswirtschaft'
        ],
        accessibilityfeatures: [
          'Zugänglichkeit für Rollstuhlfahrer',
          'Häusliche Unterstützung'
        ],
        languagesspoken: [
          'Deutsch',
          'Englisch'
        ],
        pricing: 'CHF 60 - 85 pro Stunde'
      },
      {
        name: 'Vitalis Pflege GmbH',
        email: 'kontakt@vitalis.ch',
        contactnumber: '+41-31-555-7890',
        website: 'https://www.vitalis.ch',
        status: 'active',
        location: 'Bern, Schweiz',
        registrationdate: new Date('2019-05-14'),
        branche: 'Pflege',
        firmentyp: 'GmbH',
        offers: [
          'Gesundheitsdienste',
          'Pflegeberatung',
          'Ernährungsberatung'
        ],
        accessibilityfeatures: [
          'Rollstuhlgerechte Einrichtungen',
          'Hausbesuche'
        ],
        languagesspoken: [
          'Deutsch',
          'Französisch',
          'Italienisch'
        ],
        pricing: 'CHF 55 - 75 pro Stunde'
      },
      {
        name: 'Pflegedienst Blütenzauber',
        email: 'info@bluetenzauber.ch',
        contactnumber: '+41-31-555-8520',
        website: 'https://www.bluetenzauber.ch',
        status: 'active',
        location: 'Luzern, Schweiz',
        registrationdate: new Date('2021-08-05'),
        branche: 'Hauspflege',
        firmentyp: 'AG',
        offers: [
          'Ambulante Pflege',
          'Ernährungsberatung',
          'Psychologische Unterstützung'
        ],
        accessibilityfeatures: [
          'Individuelle Betreuung',
          'Barrierefreier Zugang'
        ],
        languagesspoken: [
          'Deutsch',
          'Englisch',
          'Französisch'
        ],
        pricing: 'CHF 65 - 90 pro Stunde'
      },
    ];

    // Insert merchants data into the database
    await db.insert(merchants).values(merchantsData);
    
    // Return a success response
    return new Response(JSON.stringify({ message: 'Merchants seeded successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('Error seeding merchants:', error);
    
    // Return an error response
    return new Response(JSON.stringify({ error: 'Failed to seed merchants' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}



// CREATE TABLE merchants (
//   id SERIAL PRIMARY KEY,                      -- Auto-incrementing ID for each merchant
//   name VARCHAR(255) NOT NULL,                 -- Merchant name
//   email VARCHAR(255) NOT NULL UNIQUE,         -- Merchant email, must be unique
//   contactNumber VARCHAR(20) NOT NULL,        -- Corrected field name
//   website VARCHAR(255),                        -- Merchant website URL
//   status VARCHAR(20) NOT NULL,                 -- Status of the merchant (e.g., 'active', 'inactive')
//   location VARCHAR(255) NOT NULL,             -- Merchant location
//   registrationDate TIMESTAMP NOT NULL,       -- Corrected field name
//   branche VARCHAR(100) NOT NULL,              -- Industry type
//   firmenTyp VARCHAR(50) NOT NULL,            -- Corrected field name for company type
//   offers TEXT[],                              -- Array of services offered by the merchant
//   accessibilityFeatures TEXT[],              -- Corrected field name for accessibility features
//   languagesSpoken TEXT[],                    -- Corrected field name for spoken languages
//   pricing VARCHAR(50)                         -- Pricing information
// );
