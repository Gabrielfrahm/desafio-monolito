import PlaceOrderUseCase from "./place-order.usecase";

describe("place order use case unit test", () => {
  describe("execute method", () => {
    it("should throw an error when client not found ", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };

      const placeOrderUseCase = new PlaceOrderUseCase();
    });
  });
});
