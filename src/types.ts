export enum SenderType {
  SELF,
  AI,
  OTHER,
}

// export interface ChatMessage {
//   sender: SenderType;
//   content: string;
// }

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  salt: string;

  // constructor() {
  //     this.username = "";
  //     this.email = "";
  //     this.password = "";
  //     this.salt = "";
  // }
}

export interface PreferenceItem {
  question: string;
  options: string[];
  name: string;
}

export interface SuggestionItem {
  suggestion: string;
  value: any;
}

export interface SelectedPreference {
  codingExperience: string;
  algoExperience: string;
  difficulty: string;
  language: string;
  time: number;
}

export interface ProblemStatement {
  problem_id: number;
  problem_statement: string;
}

export interface ProblemInfo {
  problem_id: number;
  problem_title: string;
  problem_difficulty: string;
}

export interface SubmissionResponseInfo {
  submissionId: number;
  problemId: number;
  problemTitle: string;
  language: string;
  timeSubmitted: number;
  // TODO: specific the type after figuring out the kind of response get from AI
  aiResponse?: any;
  // TODO: add this field after impl code running service
  result?: any;
}

export interface EditUserPreferenceInfo{
  email: string;
  password : string;
  programmingExp: string;
  codingExp : string;
  codingLang: string ;
}

export interface EditorValue {
  code: string;
  language: string;
}

export interface ChatMessage {
  fromAi: boolean;
  content: string;
  sentTime?: number;
}

export interface InterviewInfo {
  interviewId: number;
  beginTime: number;
  endTime: number;
  editor: EditorValue;
  prevExist: boolean;
  messages: ChatMessage[];
}




export interface BookItem {
  description: string;
  bookId: number;
  title: string;
  author: string;
  price: string;
  imageUrl: string;
  isPublic: boolean;
}

export interface CategoryItem {
  categoryId: string;
  name: string;
}

// export interface categoryProps {
//     categoryList: CategoryItem[]
// }

export interface bookProps {
  bookList: BookItem[];
}

//this interface represents the items(books) in our shopping cart
export class ShoppingCartItem {
  id: number;
  book: BookItem;
  quantity: number;

  constructor(theBook: BookItem) {
    this.id = theBook.bookId;
    this.book = theBook;
    this.quantity = 1;
  }
}

// this is used by the reducer. You can define it on the CartReducer
export const initialCartState: ShoppingCartItem[] = [];
