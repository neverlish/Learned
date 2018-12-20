class Library {
  // titles: string[]; // Property 'titles' has no initializer and is not definitely assigned in the constructor.
  // titlts: string[] = [];
  titles!: string[];
  address: string = '1 Duck Lane';
  isPublic: boolean;

  constructor() {
    this.isPublic = true;
  }
}

const library = new Library();

const shortTitles = library.titles.filter(
  title => title.length < 5
);
