export interface IMainSettingsForm {
  fullName: string;
  username: string;
  gender: string;
  birthDate: Date | undefined;
  phoneNumber: string;
  occupation: string;
}

export interface IMainSettingsExtendedForm {
  lifeGoals: {
    goals: string;
    idealLifestyle: string;
  };
  loveRelationships: {
    relationshipType: string;
    valuesInPartner: string;
    dealBreakers: string;
  };
  familyFuture: {
    marriagePerspective: string;
    childrenInFuture: string;
    familyLife: string;
  };
  personalConnection: {
    sharedInterests: string;
    emotionalConnection: string;
  };
}
