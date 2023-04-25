

function add (a,b){
    return a + b;
};

describe("testing add", () => {
    it ("shpuld return 11", () => {
        expect(add(5,6)).toEqual(11);
    })
})