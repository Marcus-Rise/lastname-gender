import type { ILastnameInfo, ILastnameTransitionInfo } from "../lastname-info.interface";
import { Sex } from "../lastname-info.interface";
import { getLastnameGender } from "lvovich";

const TransitLastname = (lastname: string): ILastnameTransitionInfo => {
  let before: ILastnameInfo;
  let after: ILastnameInfo;
  const sex = getLastnameGender(lastname);

  switch (sex) {
    case "male":
      before = {
        value: lastname,
        sex: Sex.Male,
      };
      if (lastname.substr(lastname.length - 5) === "вской") {
        after = {
          value: lastname.substr(0, lastname.length - 5) + "вская",
          sex: Sex.Female,
        };
      } else if (lastname.substr(lastname.length - 5) === "нской") {
        after = {
          value: lastname.substr(0, lastname.length - 5) + "нская",
          sex: Sex.Female,
        };
      } else if (lastname.substr(lastname.length - 2) === "ий") {
        after = {
          value: lastname.substr(0, lastname.length - 2) + "ая",
          sex: Sex.Female,
        };
      } else {
        after = {
          value: lastname + "а",
          sex: Sex.Female,
        };
      }
      break;
    case "female":
      before = {
        value: lastname,
        sex: Sex.Female,
      };
      if (lastname.substr(lastname.length - 5) === "вская") {
        after = {
          value: lastname.substr(0, lastname.length - 5) + "вской",
          sex: Sex.Male,
        };
      } else if (lastname.substr(lastname.length - 5) === "нская") {
        after = {
          value: lastname.substr(0, lastname.length - 5) + "нской",
          sex: Sex.Male,
        };
      } else if (lastname.substr(lastname.length - 2) === "ая") {
        after = {
          value: lastname.substr(0, lastname.length - 2) + "ий",
          sex: Sex.Male,
        };
      } else {
        after = {
          value: lastname.substr(0, lastname.length - 1),
          sex: Sex.Male,
        };
      }
      break;
    default:
      before = {
        value: lastname,
        sex: Sex.Other,
      };
      after = before;
      break;
  }

  return {
    before,
    after,
  };
};

export { TransitLastname };
