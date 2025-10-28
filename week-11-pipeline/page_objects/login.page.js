export class LoginPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('.MuiTypography-h4');
        this.emailInput = page.locator('[name="email"]');
        this.passwordInput = page.locator('[name="password"]');
        this.loginButton = page.locator('[type="submit"]');
    }

    async login(email = 'jim123@gmail.com', password = 'Jim') {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}