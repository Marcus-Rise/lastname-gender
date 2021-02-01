enum Sex {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

interface ILastnameInfo {
  value: string;
  sex: Sex;
}

interface ILastnameTransitionInfo {
  before: ILastnameInfo;
  after: ILastnameInfo;
}

export { Sex };
export type { ILastnameInfo, ILastnameTransitionInfo };
