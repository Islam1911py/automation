import { test } from './fixtures';
import { contactUsMessage } from './testData';

test('Test Case 6: Contact Us Form', { tag: ['@TC06', '@contact', '@regression'] }, async ({ contactUsPage, user }) => {
  await contactUsPage.openContactUsPage();
  await contactUsPage.expectContactUsPageVisible();
  await contactUsPage.expectContactUsFormVisible();
  await contactUsPage.fillContactUsForm(user.name, user.email, contactUsMessage.subject, contactUsMessage.message);
  await contactUsPage.submitForm();
  await contactUsPage.expectContactUsSuccessMessageVisible();
});
