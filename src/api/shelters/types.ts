export type Shelter = {
  id: number;
  name: string;
};

export type SheltersResponse = {
  shelters: Shelter[];
};

export type ContributionContributor = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ContributeRequest = {
  contributors: ContributionContributor[];
  shelterID: number;
  value: number;
};

export type ContributeMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type ContributeResponse = {
  messages: ContributeMessage[];
};

export type ShelterResultsResponse = {
  contributors: number;
  contribution: number;
};
