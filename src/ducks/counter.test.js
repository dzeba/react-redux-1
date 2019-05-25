import reducer, { increase, decrease } from "./counter.js";

describe("counter", () => {
  it("increases count inside of the state", () => {
    expect(reducer(undefined, increase())).toEqual({
      count: 1
    });
  });
});

describe("counter", () => {
  it("decrese count inside of the state", () => {
    expect(reducer(undefined, decrease())).toEqual({
      count: -1
    });
  });
});
