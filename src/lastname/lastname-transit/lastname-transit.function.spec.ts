import { LastnameTransit } from "./lastname-transit.function";
import { Sex } from "../lastname-info.interface";

describe("LastnameTransit", () => {
  describe("Male to female", () => {
    test("Иванов -> Иванова", () => {
      const transitionInfo = LastnameTransit("Иванов");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Иванова");
    });
    test("Лазинский -> Лазинская", () => {
      const transitionInfo = LastnameTransit("Лазинский");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Лазинская");
    });
    test("Цветовской -> Цветовская", () => {
      const transitionInfo = LastnameTransit("Цветовской");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Цветовская");
    });
    test("Глинской -> Глинская", () => {
      const transitionInfo = LastnameTransit("Глинской");

      expect(transitionInfo.before.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.value).toEqual("Глинская");
    });
  });
  describe("Female to male", () => {
    test("Иванова -> Иванов", () => {
      const transitionInfo = LastnameTransit("Иванова");

      expect(transitionInfo.before.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.value).toEqual("Иванов");
    });
    test("Лазинская -> Лазинской", () => {
      const transitionInfo = LastnameTransit("Лазинская");

      expect(transitionInfo.before.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.value).toEqual("Лазинской");
    });
    test("Цветовская -> Цветовской", () => {
      const transitionInfo = LastnameTransit("Цветовская");

      expect(transitionInfo.before.sex).toEqual(Sex.Female);
      expect(transitionInfo.after.sex).toEqual(Sex.Male);
      expect(transitionInfo.after.value).toEqual("Цветовской");
    });
  });
  describe("no diff", () => {
    test("Городец -> Городец", () => {
      const transitionInfo = LastnameTransit("Городец");

      expect(transitionInfo.before.sex).toEqual(Sex.Other);
      expect(transitionInfo.after.sex).toEqual(Sex.Other);
      expect(transitionInfo.after.value).toEqual("Городец");
    });
  });
});
