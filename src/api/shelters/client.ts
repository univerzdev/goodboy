import { z } from "zod";
import type {
  ContributeRequest,
  ContributeResponse,
  Shelter,
  ShelterResultsResponse,
  SheltersResponse,
} from "@/api/shelters/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_SHELTERS_API_URL;

const API_ENDPOINTS = {
  shelters: "/shelters",
  contribute: "/shelters/contribute",
  results: "/shelters/results",
} as const;

const shelterSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const sheltersResponseSchema = z.object({
  shelters: z.array(shelterSchema),
});

const contributeMessageSchema = z.object({
  message: z.string(),
  type: z.enum(["SUCCESS", "ERROR"]),
});

const contributeResponseSchema = z.object({
  messages: z.array(contributeMessageSchema),
});

const shelterResultsResponseSchema = z.object({
  contributors: z.number(),
  contribution: z.number(),
});

const normalizeBaseUrl = (url: string) => url.replace(/\/$/, "");

const getRequiredApiUrl = () => {
  if (!API_BASE_URL) {
    throw new Error("Missing API URL.");
  }

  return normalizeBaseUrl(API_BASE_URL);
};

const getApiUrl = (endpoint: string) => {
  return `${getRequiredApiUrl()}${endpoint}`;
};

export const fetchShelters = async (): Promise<Shelter[]> => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.shelters), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Shelters API request failed with status ${response.status}`);
  }

  const payload: SheltersResponse = await response.json();
  const parsedPayload = sheltersResponseSchema.parse(payload);

  return parsedPayload.shelters;
};

export const contributeToShelter = async (payload: ContributeRequest): Promise<ContributeResponse> => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.contribute), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Contribute API request failed with status ${response.status}`);
  }

  const responsePayload: ContributeResponse = await response.json();
  return contributeResponseSchema.parse(responsePayload);
};

export const fetchShelterResults = async (): Promise<ShelterResultsResponse> => {
  const response = await fetch(getApiUrl(API_ENDPOINTS.results), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Shelter results API request failed with status ${response.status}`);
  }

  const payload: ShelterResultsResponse = await response.json();
  return shelterResultsResponseSchema.parse(payload);
};
