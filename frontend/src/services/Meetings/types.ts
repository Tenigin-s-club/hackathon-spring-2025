export interface Meeting {
  id: string;
  voting_datetime: string;
  end_datetime: string;
  place: string;
  is_internal: true;
  counter: string;
  questions: Question[];
}

export interface MeetingRequest {
  voting_datetime: string;
  end_datetime: string;
  place: string;
  is_internal: boolean;
  counter: string;
}

export interface Question {
  id: string;
  title: string;
  description: string;
  solution: string;
  materials: string[];
}
export interface RequestQuestion {
  idMeeting: string;
  title: string;
  description: string;
  materials: FormData;
}

export type MeetingStatus = "future" | "completed" | "active";

export interface MeetingStatistic {
  question: Omit<Question, "materials">;
  result: {
    agree: number;
    disagree: number;
  };
}
