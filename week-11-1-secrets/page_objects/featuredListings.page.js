import { test, expect } from "@playwright/test";

export class FeaturedListingsPage {
    constructor(page) {
        this.page = page;
        this.modeSwitch = page.locator('[type="checkbox"]');
        this.inputSearch = page.getByRole('textbox', { name: 'Search' } ).first();
        this.inputBedrooms = page.getByRole('button', { name: 'Bedrooms'});
        this.bedroomsCount2 = page.getByRole('option', { name: '2+' });
        this.inputCity = page.getByRole('textbox', {name: 'City'});
        this.btnStartSearch = page.getByRole('button', { name: 'Start Search'});
        this.listingGridTitle = page.locator('h5.MuiTypography-h5').first();
        this.moreInfoButton = page.getByRole('link', { name: /more info/i });
        this.listingBedrooms = page.getByText(' Bedrooms: ');
        this.listingCity = page.getByText('City: ').first();
        this.listingPrice = page.locator('text=Asking Price');
        this.listingGrid = page.locator('.MuiGrid-grid-xs-12.MuiGrid-grid-sm-6');
        this.listingDetailsPrice = page.getByText(' Asking Price:');
        this.listingDetailsLotSize = page.getByText(' Lot Size: ');
        this.listingDetailsGarage = page.getByText(' Garage: ');
        this.listingDetailsBathrooms = page.getByText(' Bathrooms: ');
        this.listingDetailsSqft = page.getByText('Square Feet:'); 
        this.listingDetailsDate = page.getByText(' Listing Date:'); 
        this.listingDetailsBedrooms = page.getByText(' Bedrooms: ')
        this.listingDetailsRealtor = page.getByText(' Realtor: '); 

    }

    async goToFeaturedListingsPage() {
        await this.page.goto("https://dev.delekhomes.com/featured-listings");
    }

    async darkMode() {
        await expect(this.modeSwitch).toBeVisible();
        await this.modeSwitch.click();
    }

    async clickStartSearchButton() {
        await this.btnStartSearch.click();
    }

    async searchByKeyword(listingKeyword) {
        await this.inputSearch.fill(listingKeyword);
    }

    async searchByBedrooms() {
        await this.inputBedrooms.click();
        await this.bedroomsCount2.click();
    }
}