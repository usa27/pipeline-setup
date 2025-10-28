import { test } from '../../fixtures/fixtures.js';
import { expect } from "@playwright/test";
import { FeaturedListingsPage } from "../../page_objects/featuredListings.page";

let featuredListingsPage;

test.beforeEach(async ({ authenticatedPage }) => {
  featuredListingsPage = new FeaturedListingsPage(authenticatedPage);
  await featuredListingsPage.goToFeaturedListingsPage();
  await featuredListingsPage.darkMode();

  await expect(featuredListingsPage.page).toHaveTitle(/Delek Homes/);
  await expect(featuredListingsPage.modeSwitch).toBeChecked();
});

test("search by keyword", async ({ authenticatedPage, createdListing }) => {
  const listingKeyword = createdListing.description;

  await authenticatedPage.goto('/featured-listings');
  await featuredListingsPage.searchByKeyword(listingKeyword);
  await featuredListingsPage.clickStartSearchButton();

  await expect(featuredListingsPage.listingGridTitle).toHaveText(createdListing.title);
});

test("search by bedrooms", async ({ authenticatedPage }) => {
  await featuredListingsPage.searchByBedrooms();
  await featuredListingsPage.clickStartSearchButton();
  await featuredListingsPage.moreInfoButton.first().click();

  const bedroomsCountText  = await featuredListingsPage.listingBedrooms.innerText();
  const bedrooms = Number(bedroomsCountText.replace('Bedrooms:', ''));
  
  expect(bedrooms).toBeGreaterThanOrEqual(2);  
});

test("search by city", async ({ authenticatedPage, createdListing }) => {
  const listingCity = createdListing.city;
  const listingPrice = createdListing.price.toString();
  const lotSize = createdListing.lotSize.toString();
  const garageNumber = createdListing.garage.toString();
  const bathroomNumber = createdListing.bathrooms.toString();
  const sqft = createdListing.sqft.toString();
  const bedroomNumber = createdListing.bedrooms.toString();
  const today = new Date();
  const formattedToday = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  await authenticatedPage.goto('/');
  await featuredListingsPage.inputCity.fill(listingCity);
  await featuredListingsPage.btnStartSearch.click();

  await expect(featuredListingsPage.listingCity).toHaveText(new RegExp(listingCity, 'i'));

  await featuredListingsPage.moreInfoButton.first().click();

  const listingPriceText = await featuredListingsPage.listingDetailsPrice.innerText();
  const priceNumber = listingPriceText.replace(/[^0-9]/g, '');
  
  await expect(priceNumber).toBe(listingPrice);
  await expect(featuredListingsPage.listingDetailsLotSize).toContainText(lotSize);
  await expect(featuredListingsPage.listingDetailsGarage).toContainText(garageNumber);
  await expect(featuredListingsPage.listingDetailsBathrooms).toContainText(bathroomNumber);
  await expect(featuredListingsPage.listingDetailsSqft).toContainText(sqft);
  await expect(featuredListingsPage.listingDetailsDate).toContainText(formattedToday);
  await expect(featuredListingsPage.listingDetailsBedrooms).toContainText(bedroomNumber);
  await expect(featuredListingsPage.listingDetailsRealtor).toBeVisible();
});

test("search by price", async ({ authenticatedPage }) => {
  const minPrice = 600000;
  const maxPrice = 800000;

  await authenticatedPage.goto("/featured-listings?price=600000-800000");
  await featuredListingsPage.moreInfoButton.first().click();
  await expect(featuredListingsPage.listingPrice).toBeVisible();
  const priceText  = await featuredListingsPage.listingPrice.innerText();
  const price = Number(priceText.replace(/[^0-9.]/g, ''));
  
  expect(price).toBeGreaterThanOrEqual(minPrice);
  expect(price).toBeLessThanOrEqual(maxPrice);
});