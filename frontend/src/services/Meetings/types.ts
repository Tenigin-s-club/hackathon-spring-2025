export interface Meeting {
  id: string;
  voting_datetime: string;
  end_datetime: string;
  place: string;
  is_internal: true;
  protocol_datetime: string;
  counter: string;
  questions: Question[];
}

export interface MeetingRequest {
  voting_datetime: string;
  end_datetime: string;
  place: string;
  is_internal: true;
  protocol_datetime: string;
  counter: string;
  questions: Question[];
}

export interface Question {
  id: string;
  title: string;
  description: string;
  solution: string;
}

export type MeetingStatus = "future" | "completed" | "active";
