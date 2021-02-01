import { TransitLastname } from "./transit-lastname.function";
import { Sex } from "../lastname-info.interface";

describe("TransitLastname", () => {
  describe("Male to female", () => {
    test("Иванов -> Иванова", () => {
      const transitionInfo = TransitLastname("Иванов");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Иванова");
    });
    test("Лазинский -> Лазинская", () => {
      const transitionInfo = TransitLastname("Лазинский");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Лазинская");
    });
    test("Цветовской -> Цветовская", () => {
      const transitionInfo = TransitLastname("Цветовской");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Цветовская");
    });
    test("Глинской -> Глинская", () => {
      const transitionInfo = TransitLastname("Глинской");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Глинская");
    });
  });
  describe("Female to male", () => {
    test("Иванова -> Иванов", () => {
      const transitionInfo = TransitLastname("Иванова");

      expect(transitionInfo.before.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.value).toEqual("Иванов");
    });
    test("Лазинская -> Лазинской", () => {
      const transitionInfo = TransitLastname("Лазинская");

      expect(transitionInfo.before.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.value).toEqual("Лазинской");
    });
    test("Цветовская -> Цветовской", () => {
      const transitionInfo = TransitLastname("Цветовская");

      expect(transitionInfo.before.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.value).toEqual("Цветовской");
    });
  });
  describe("no diff", () => {
    test("Городец -> Городец", () => {
      const transitionInfo = TransitLastname("Городец");

      expect(transitionInfo.before.sex).toEqual(Sex.Other);
      expect(transitionInfo.after.sex).toEqual(Sex.Other);
      expect(transitionInfo.after.value).toEqual("Городец");
    });
  });
});
