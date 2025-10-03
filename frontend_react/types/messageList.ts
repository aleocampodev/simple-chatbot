export interface ChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp?: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
}

export type MessageSender = 'user' | 'bot';