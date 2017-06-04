import { UdemyGettingStartedWithAngular2Page } from './app.po';

describe('udemy-getting-started-with-angular2 App', function() {
  let page: UdemyGettingStartedWithAngular2Page;

  beforeEach(() => {
    page = new UdemyGettingStartedWithAngular2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
