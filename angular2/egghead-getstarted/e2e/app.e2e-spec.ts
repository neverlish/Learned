import { EggheadGetstartedPage } from './app.po';

describe('egghead-getstarted App', function() {
  let page: EggheadGetstartedPage;

  beforeEach(() => {
    page = new EggheadGetstartedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
