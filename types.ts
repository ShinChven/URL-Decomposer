export type UrlPartType = 
  | 'protocol' 
  | 'username'
  | 'password'
  | 'hostname' 
  | 'port' 
  | 'pathname' 
  | 'search' 
  | 'hash';

export interface UrlComponent {
  id: string;
  type: UrlPartType;
  key?: string; // For search parameters (query string)
  value: string;
  isEnabled: boolean;
  label: string;
  description?: string;
}

export interface ParseResult {
  success: boolean;
  parts: UrlComponent[];
  error?: string;
}