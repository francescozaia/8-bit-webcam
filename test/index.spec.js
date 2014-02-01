describe("index module", function() {
    it("answers to myMethod() correctly", function() {
        var instance = new MyModule();
        expect(instance.myMethod()).toEqual("Hello world");
    });
});