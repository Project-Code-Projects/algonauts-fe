export enum tagTypes {
  student = "student",

}

export const tagTypesList = [
  tagTypes.student,

];

/*
These tags gets used like this:

after a post request, if I set InvalidateTages="That tag name". Then another request will be made to GET the request. 


*/
