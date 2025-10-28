export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[name="firstName"]');
        this.lastNameInput = page.locator('[name="lastName"]');
        this.emailInput = page.locator('[name="email"]');
        this.passwordInput = page.locator('[name="password"]');
        this.registerButton = page.locator('[type="submit"]');
        this.inputDataError = page.locator('[class="MuiAlert-message css-2shwac"]');
    }

    async register(firstName, lastName, email, password) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click()
    }

    async existingUser(firstName = 'Jim', lastName = 'Carrey', email = 'jim123@gmail.com', password = '12345') {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.registerButton.click()
    }
}