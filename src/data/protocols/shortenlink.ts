export interface ShortenLink {
  shorten(url: string): Promise<any>;
}
