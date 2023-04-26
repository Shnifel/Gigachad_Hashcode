const sum = (a, b) => { return a + b;};

describe("adds 1 + 2 to equal 3", () => {
  it("should give back 3 for 1 + 2", () => {expect(sum(1, 2)).toBe(3);})
});
