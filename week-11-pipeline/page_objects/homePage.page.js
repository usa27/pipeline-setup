import { test, expect } from "@playwright/test";

export class HomePage {
    constructor(page) {
        this.page = page;
        this.modeSwitch = page.locator('[type="checkbox"]');
        this.inputSearch = page.locator('label', { hasText: 'Search' });
        this.inputBedrooms = page.getByRole('button', {name: 'Bedrooms'});
        this.bedroomsCount2 = page.getByRole('option', { name: '2+' });
        this.startSearchBtn = page.getByRole('button', { name: 'Start Search' });
        this.inputCity = page.locator('label', { hasText: 'City' });
        this.listingGrid = page.locator('.MuiGrid-grid-sm-6');
        this.listingGridTitle = page.locator('h5.MuiTypography-h5').first();

    }

    async goToHomepage() {
        await this.page.goto('https://dev.delekhomes.com');
    }

    async darkMode() {
        await expect(this.modeSwitch).toBeVisible();
        await this.modeSwitch.click();
    }

    async searchByKeyword(listingKeyword) {
        await this.inputSearch.fill(listingKeyword);
    }

    async searchByBedrooms() {
        await this.inputBedrooms.click();
        await this.bedroomsCount2.click();
    }

    async searchByCity(listingCity) {
        await this.inputCity.fill(listingCity);
    }

    async clickStartSearchButton() {
        await this.startSearchBtn.click();
    }
}