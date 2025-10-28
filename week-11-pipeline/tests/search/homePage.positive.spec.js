import { test } from '../../fixtures/fixtures.js';
import { expect } from "@playwright/test";
import { HomePage } from "../../page_objects/homePage.page";
import { FeaturedListingsPage } from "../../page_objects/featuredListings.page";

let homePage, featuredListingsPage

test.describe('Search - Home Page', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    homePage = new HomePage(authenticatedPage);
    featuredListingsPage = new FeaturedListingsPage(authenticatedPage);

    await homePage.goToHomepage();
    await homePage.darkMode();

    await expect(homePage.page).toHaveTitle(/Delek Homes/);
    await expect(homePage.modeSwitch).toBeChecked();
  });

  test("search by keyword", async ({ authenticatedPage, createdListing }) => {
    const listingKeyword = createdListing.description;

    await authenticatedPage.goto('/');
    await homePage.inputSearch.fill(listingKeyword);
    await homePage.clickStartSearchButton();

    await expect(homePage.listingGridTitle).toHaveText(createdListing.title);
  });

  test("search by bedrooms", async ({ authenticatedPage }) => {
    await homePage.searchByBedrooms();
    await homePage.clickStartSearchButton();
    await featuredListingsPage.moreInfoButton.first().click();

    const bedroomsCountText  = await featuredListingsPage.listingBedrooms.innerText();
    const countTextArray = bedroomsCountText.split('');
    const bedroomNumber = (countTextArray[countTextArray.length -1]);
    const bedroomCount = Number(bedroomNumber);

    await expect(bedroomCount).toBeGreaterThanOrEqual(2);
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
    await homePage.searchByCity(listingCity);
    await homePage.clickStartSearchButton();

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

    await authenticatedPage.goto('/featured-listings?price=600000-800000');
    await featuredListingsPage.moreInfoButton.first().click();
    await expect(featuredListingsPage.listingPrice).toBeVisible();

    const priceText  = await featuredListingsPage.listingPrice.innerText();
    const price = Number(priceText.replace(/[^0-9.]/g, ''));
  
    expect(price).toBeGreaterThanOrEqual(minPrice);
    expect(price).toBeLessThanOrEqual(maxPrice);
  });
})
