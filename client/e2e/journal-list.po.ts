import {browser, element, by, promise} from 'protractor';
import {Key} from 'selenium-webdriver';

export class JournalPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('/journals');
    }

    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 100);
            return 'highlighted';
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getJournals() {
        return element.all(by.className('journals-card')).count();
    }

    typeASubject(subject: string) {
        const input = element(by.id('journalSubject'));
        input.click();
        input.sendKeys(subject);
    }

    typeABody(body: string) {
        const input = element(by.id('journalBody'));
        input.click();
        input.sendKeys(body);
    }

    getJournalManageTitle() {
        const title = element(by.id('journal-title')).getText();
        this.highlightElement(by.id('journal-title'));
        return title;
    }

    getUniqueJournal(anID: string) {
        const journal = element(by.id(anID)).getText();
        this.highlightElement(by.id(anID));

        return journal;
    }

    buttonExists(): promise.Promise<boolean> {
        this.highlightElement(by.id('addNewJournal'));
        return element(by.id('addNewJournal')).isPresent();
    }

    clickAddJournalButton(): promise.Promise<void> {
        this.highlightElement(by.id('addNewJournal'));
        return element(by.id('addNewJournal')).click();
    }

    clickEditJournalButton(): promise.Promise<void> {
        this.highlightElement(by.className('edit-journal-button'));
        return element(by.className('edit-journal-button')).click();
    }

}
