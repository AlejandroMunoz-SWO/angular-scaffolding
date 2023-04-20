export type UserType = {
  givenName?: string;
  surname?: string;
  userPrincipalName?: string;
  id?: string;
  city?: string;
  country?: string;
  componayName?: string;
  department?: string;
  displayName?: string;
  jobTitle?: string;
  mail?: string;
};

export type UserMemberOfType = {
  displayName?: string;
  groupIDs?: string[],
}
