// Shared AI types for job lifecycle and provider configuration

export type AIJobStatus = "queued" | "processing" | "completed" | "failed";

export interface AIJobResult {
  success: boolean;
  data?: any;
  error?: string;
  progress?: number;
  message?: string;
}

export type AIProvider = "mock" | "replicate" | "huggingface" | "custom";

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  options?: Record<string, any>;
}

export interface SubtitleSegment {
  start: number;
  end: number;
  text: string;
  emoji?: string;
}

export interface CutPoint {
  start: number;
  end: number;
  type: "silence" | "highlight" | "transition";
}
