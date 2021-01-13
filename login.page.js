const utils = require('./utils');

class LoginPage {


  constructor(page) {
    this.page = page;
    this.url = "https://suap.ifrn.edu.br"

    /**
     * Selectors
     */
    this.selectors = {
      username: "#id_username",
      password: "#id_password",
      loginButton: "input[type='submit']",
      content: "#content",
      user: "#user-tools"
    }
  }

  async open() {
    await this.page.goto(this.url);
  }

  async loginAs (user, password) {
    await this.page.waitForSelector(this.selectors.content);

    await this.page.click(this.selectors.username);
    await this.page.type(this.selectors.username, user);
    await this.page.click(this.selectors.password);
    await this.page.type(this.selectors.password, password);

    await this.page.click(this.selectors.loginButton);
  }

  async getUser () {
    await this.page.waitForSelector(this.selectors.user);
    let name = await this.page.$eval(this.selectors.user, el => el.innerText.trim());
    return utils.removeSpecialChars(name);
  }

}

module.exports = LoginPage;

