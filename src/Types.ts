interface CourseName {
  id: number;
  name: string;
}

export interface ISchool {
  id: number;
  name: string;
  fullname: string;
  courses: CourseName[];
}

export interface HeaderImages {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  order: number;
}

export interface ITitles {
  id: number;
  title: string;
  subtitle: string;
}

export interface ICourse {
  id: number;
  name: string;
  discussions: IDiscussion[];
}

export interface IDiscussion {
  id: number;
  title: string;
  subtitle: string;
}

export interface IRating {
  id: number;
  givenRating: number;
  userId: string;
}

export interface IDiscussion {
  id: number;
  title: string;
  question: string;
  createdDate: string;
  courseId : number,
  name: string,
  schoolId: number,
  school: string,
  userId: string;
  userName: string;
  profileImage: string;
  replies: DiscussionReply[]
  rating: number;
}

export interface DiscussionReply {
  id: number;
  reply: string;
  userId : string
  userName: string;
  profileImage: string;
}

export interface IDiscussionItem {
  id: number;
  title: string;
  createdDate : string,
  discussionReplies: number,
  courseName : string,
  rating : number,
  user: string,
  userId: string
}


export interface IUser {
  userId : string,
  userName: string,
  roles : string[],
  token : string,
  isAuthenticated : boolean,
  profileImage: string,
}
