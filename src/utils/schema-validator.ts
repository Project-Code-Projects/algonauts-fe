export const getErrorMessageByPropertyName = (
  obj: Record<string, any>,
  propertyPath: string
) => {
  // let obj = errors
  // let propertyPath = "admin.name.firstName"
  // let propertyPath = "admin.name.lastName"

  const properties = propertyPath.split(".");
  // ["admin","name","firstName"]
  // ["admin","name","lastName"]
  let value = obj;

  for (let prop of properties) {
    if (value[prop]) {
      value = value[prop];
    } else {
      return undefined;
    }
  }

  return value.message;
};

/*
Additionally, the getErrorMessageByPropertyName function is a helper function that:

Takes an error object and a property path as arguments.
Navigates through the nested structure of the error object based on the property path.
Returns the error message associated with that specific property path (if it exists).
This function simplifies extracting specific error messages from a potentially complex error state structure.


  const errorMessage = getErrorMessageByPropertyName(errors, name); So I am giving it an error object and the name of the input where the error is happening

  


*/
