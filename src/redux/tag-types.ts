export enum tagTypes {
   student = "student",
  user = "user",
  parent = "parent",
  helpRequest = "helpRequest",
}

export const tagTypesList = [tagTypes.student, tagTypes.user, tagTypes.parent, tagTypes.helpRequest];

/*
These tags gets used like this:

after a post request, if I set InvalidateTages="That tag name". Then another request will be made to GET the request. 


*/
