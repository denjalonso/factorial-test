// THIS IS A GENERATED FILE, DO NOT EDIT!
// organize-imports-ignore
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateHostedWorkerOnboardingInput = {
  id: Scalars['ID'];
};

export type CreateUserInput = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum HostedOnboardingStatus {
  COMPLETED = 'COMPLETED',
  INVITED = 'INVITED',
  STARTED = 'STARTED',
}

export type HostedUserOnboarding = {
  __typename?: 'HostedUserOnboarding';
  id: Scalars['ID'];
  status: HostedOnboardingStatus;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createHostedUserOnboarding: HostedUserOnboarding;
  createUser: User;
};

export type MutationCreateHostedUserOnboardingArgs = {
  input: CreateHostedWorkerOnboardingInput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  hostedUserOnboarding?: Maybe<HostedUserOnboarding>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
};

export type QueryHostedUserOnboardingArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};
