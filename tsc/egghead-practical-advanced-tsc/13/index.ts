function generateId(seed: number) {
  return seed + '5';
}

// const id: string = generateId(10);

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type Id = ReturnType<typeof generateId>;

lookupEntity(generateId(10));

function lookupEntity(id: string) {
  // query DB for entity by ID
}

type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
const arr = [Promise.resolve(true)];

type ExpectedBoolean = UnpackPromise<typeof arr>;
