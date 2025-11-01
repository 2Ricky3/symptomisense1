export interface ResponseSection {
  title: string;
  content: string[];
}

export interface OpenAIResponse {
  output_text?: string;
  output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
}
