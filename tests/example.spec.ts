import { test, expect } from '@playwright/test';

test("GET PRODUCT", async ({ request, baseURL }) => {
  const getRequest = await request.post(`${baseURL}prod`, {
    data: {
      search_term: "iphone mobile",
      source: "amazon",
    },
  });

  console.log(await getRequest.json());
  expect(getRequest.ok()).toBeTruthy();
  expect(getRequest.status()).toBe(200);
});
