import {
  getBookDetails,
  giftsReducer,
  patchGeneratingGiftsReducer,
} from "./gifts";
import { applyPatches } from "immer";

const initialState = {
  users: [
    {
      id: 1,
      name: "Test user",
    },
    {
      id: 2,
      name: "Someone else",
    },
  ],
  currentUser: {
    id: 1,
    name: "Test user",
  },
  gifts: {
    immer_license: {
      id: "immer_license",
      description: "Immer license",
      image:
        "https://raw.githubusercontent.com/immerjs/immer/master/images/immer-logo.png",
      reservedBy: 2,
    },
    egghead_subscription: {
      id: "egghead_subscription",
      description: "Egghead.io subscription",
      image:
        "https://pbs.twimg.com/profile_images/735242324293210112/H8YfgQHP_400x400.jpg",
      reservedBy: undefined,
    },
  },
};

describe("Reserving an unreserved gift", () => {
  const nextState = giftsReducer(initialState, {
    type: "ADD_GIFT",
    id: "mug",
    description: "Coffee mug",
    image: "",
  });

  test("added a gift to the collection", () => {
    expect(Object.keys(nextState.gifts).length).toBe(3);
  });

  test("didn't modify the original state", () => {
    expect(Object.keys(initialState.gifts).length).toBe(2);
  });
});

describe("Reserving an unreserved gift", () => {
  const nextState = giftsReducer(initialState, {
    type: "TOGGLE_RESERVATION",
    id: "egghead_subscription",
  });

  test("correctly stores reservedBy", () => {
    expect(nextState.gifts["egghead_subscription"].reservedBy).toBe(1);
  });

  test("didn't modify the original state", () => {
    expect(initialState.gifts["egghead_subscription"].reservedBy).toBe(
      undefined
    );
  });

  test("does structurally share unchanged parts of the state tree", () => {
    expect(nextState).not.toBe(initialState);
    expect(nextState.gifts["egghead_subscription"]).not.toBe(
      initialState.gifts["egghead_subscription"]
    );
    expect(nextState.gifts["immer_license"]).toBe(
      initialState.gifts["immer_license"]
    );
  });

  test("can't accidentally modify the produced state", () => {
    expect(() => {
      nextState.gifts["egghead_subscription"].reservedBy = undefined;
    }).toThrowErrorMatchingInlineSnapshot(
      `"Cannot assign to read only property 'reservedBy' of object '#<Object>'"`
    );
  });
});

describe("Reserving an unreserved gift with patches", () => {
  const [nextState, patches, inversePatches] = patchGeneratingGiftsReducer(
    initialState,
    {
      type: "TOGGLE_RESERVATION",
      id: "egghead_subscription",
    }
  );

  test("correctly stores reservedBy", () => {
    expect(nextState.gifts["egghead_subscription"].reservedBy).toBe(1);
  });

  test("generates correct patches", () => {
    expect(patches).toEqual([
      {
        op: "replace",
        path: ["gifts", "egghead_subscription", "reservedBy"],
        value: 1,
      },
    ]);
  });

  test("replaying patches produces the same state - 1", () => {
    expect(applyPatches(initialState, patches)).toEqual(nextState);
  });

  test("inverse patches restore the original state", () => {
    expect(applyPatches(nextState, inversePatches)).toEqual(initialState);
  });

  test("correct inverse patches are generated", () => {
    expect(inversePatches).toMatchInlineSnapshot(`
      Array [
        Object {
          "op": "replace",
          "path": Array [
            "gifts",
            "egghead_subscription",
            "reservedBy",
          ],
          "value": undefined,
        },
      ]
    `);
  });

  test("replaying patches produces the same state - 2", () => {
    expect(
      giftsReducer(initialState, {
        type: "APPLY_PATCHES",
        patches,
      })
    ).toEqual(nextState);
  });
});

describe("Reserving an already reserved gift", () => {
  const nextState = giftsReducer(initialState, {
    type: "TOGGLE_RESERVATION",
    id: "immer_license",
  });

  test("preserves stores reservedBy", () => {
    expect(nextState.gifts["immer_license"].reservedBy).toBe(2);
  });

  test("no new gift should be created", () => {
    expect(nextState.gifts["immer_license"]).toEqual(
      initialState.gifts["immer_license"]
    );
    expect(nextState.gifts["immer_license"]).toBe(
      initialState.gifts["immer_license"]
    );
    expect(nextState).toBe(initialState);
  });
});

describe("Can add book async", () => {
  test("Can add math book", async () => {
    const book = await getBookDetails("0201558025");
    const nextState = giftsReducer(initialState, {
      type: "ADD_BOOK",
      book,
    });
    expect((nextState.gifts as any)["0201558025"].description).toBe(
      "Concrete mathematics"
    );
  });

  test("Can add two books in parallel", async () => {
    const promise1 = getBookDetails("0201558025");
    const promise2 = getBookDetails("9781598560169");
    const addBook1 = {
      type: "ADD_BOOK",
      book: await promise1,
    };

    const addBook2 = {
      type: "ADD_BOOK",
      book: await promise2,
    };

    const nextState = giftsReducer(
      giftsReducer(initialState, { type: "ADD_BOOK", book: await promise1 }),
      {
        type: "ADD_BOOK",
        book: await promise2,
      }
    );
    expect(Object.keys(nextState.gifts).length).toBe(4);
  });
});
