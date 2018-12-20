interface Book {
  id: string;
  tableOfContents: string[];
}

interface Tv {
  id: number;
  diagonal: number;
}

interface IItemService {
  getItem<T>(id: T): Book | Tv;
}

let itemService: IItemService;

const book = itemService.getItem("10");
const tv = itemService.getItem(10);
