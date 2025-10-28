export class DashboardPage {
    constructor(page) {
        this.page = page;
        this.fullUsersName = page.locator('h6.MuiTypography-subtitle2');
        this.userRole = page.locator('a p.MuiTypography-body2');
        this.userProfileIcon = page.locator('button .MuiAvatar-circular');
        this.logoutButton = page.locator('.css-p9n58v')
    }

    async logout() {
        await this.userProfileIcon.click();
        await this.logoutButton.click();
    }
}