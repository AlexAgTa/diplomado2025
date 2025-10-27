import { Performable } from '../interactions/Performable';
import { Enter, Click, Navigate } from '../interactions/Interactions';
import { Targets } from '../targets/UIElements';

export class OpenApp implements Performable {
    private readonly url: string;

    private constructor(url: string) {
        this.url = url;
    }

    static at(url: string): OpenApp {
        return new OpenApp(url);
    }

    async performAs(page: any): Promise<void> {
        await Navigate.to(this.url).performAs(page);
    }
}

export class Login implements Performable {
    private readonly username: string;
    private readonly password: string;

    private constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    static withCredentials(username: string, password: string): Login {
        return new Login(username, password);
    }

    async performAs(page: any): Promise<void> {
        await Enter.text(this.username).into(Targets.LOGIN_PAGE.USERNAME_FIELD).performAs(page);
        await Enter.text(this.password).into(Targets.LOGIN_PAGE.PASSWORD_FIELD).performAs(page);
        await Click.on(Targets.LOGIN_PAGE.LOGIN_BUTTON).performAs(page);
    }
}