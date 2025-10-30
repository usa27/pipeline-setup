import { faker } from '@faker-js/faker';
import fs from 'fs';

export async function apiCreateListing(apiClient, token) {
    const data = {
    images: fs.createReadStream('data/house.png'),
    lotSize: 4444,
    sqft: 2222,
    garage: 2,
    bathrooms: 2,
    bedrooms: 4,
    price: 999999,
    zipCode: 92252,
    state: 'CA',
    city: 'Malibu',
    address: '8481 Southwestern Blvd',
    description: `keyword: ${faker.word.noun}`,
    title: `Alexandria house ${faker.number.int({ min: 100, max: 1000 })}`,
    isPublished: true
  }

  const createListingResponse = await apiClient.post('/api/estate-objects', {
    multipart: data,
    Authorization: `Bearer ${token}`
  });

  const createListingResponseJson = await createListingResponse.json();
  
  return createListingResponseJson;
}