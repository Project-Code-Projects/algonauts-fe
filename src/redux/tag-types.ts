export enum tagTypes {
  student = "student",
  user = "user",
  parent = "parent",
  helpRequest = "helpRequest",
  section = "section",
  chapter = "chapter",
  exercise = "exercise",
  editorLevel = "editorLevel",
  exerciseLog = "exerciseLog",
  beginnerLevel = "beginnerLeqvel",
  post = "post",
  stats = "stats",
  comment = "comment",
  studentProgress = "studentProgress",
  like = "like",
}

export const tagTypesList = [
  tagTypes.student,
  tagTypes.user,
  tagTypes.parent,
  tagTypes.helpRequest,
  tagTypes.section,
  tagTypes.chapter,
  tagTypes.editorLevel,
  tagTypes.exerciseLog,
  tagTypes.beginnerLevel,
  tagTypes.post,
  tagTypes.stats,
  tagTypes.comment,
  tagTypes.studentProgress,
  tagTypes.like,
  tagTypes.exercise,
];

/*
These tags gets used like this:

after a post request, if I set InvalidateTages="That tag name". Then another request will be made to GET the request. 


*/
