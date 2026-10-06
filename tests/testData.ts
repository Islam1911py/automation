export type RegistrationUser = {
  name: string;
  email: string;
  password: string;
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  mobileNumber: string;
  newsletter: boolean;
  offers: boolean;
};

export type ProductFilterData = {
  category: string;
  subCategory: string;
  productName: string;
  searchTerm: string;
};

export function getRegistrationUser(): RegistrationUser {
  const uniqueId = `${Date.now()}${Math.floor(Math.random() * 1000)}`;

  return {
    name: 'Test User',
    email: `testuser${uniqueId}@example.com`,
    password: 'P@ssw0rd123',
    day: '10',
    month: 'March',
    year: '1995',
    firstName: 'Test',
    lastName: 'User',
    company: 'Automation Exercise',
    address1: '123 Test Street',
    address2: 'Apartment 4B',
    country: 'Canada',
    state: 'Ontario',
    city: 'Toronto',
    zipCode: 'M5V 2T6',
    mobileNumber: '1234567890',
    newsletter: true,
    offers: false,
  };
}

export function getProductFilterData(): ProductFilterData {
  return {
    category: 'Women',
    subCategory: 'Dress',
    productName: 'Blue Top',
    searchTerm: 'Blue Top',
  };
}

export const testCard = {
  number: '4111111111111111',
  cvc: '123',
  month: '12',
  year: '2030',
};

export const subscriberEmail = 'test.user@example.com';

export const invalidCredentials = {
  password: 'wrongpassword',
};

export const contactUsMessage = {
  subject: 'Question about an order',
  message: 'Hello, I need assistance with an order.',
};

export const productReview = {
  name: 'Automation Tester',
  email: 'reviewer@example.com',
  text: 'Product looks good.',
};
