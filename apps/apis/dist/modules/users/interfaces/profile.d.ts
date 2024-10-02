export interface IProfile {
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    emails: [{
        value: string;
        verified: boolean;
    }];
    photos: [{
        value: string;
    }];
    provider: string;
}
