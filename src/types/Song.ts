import { Artist } from "@/types/Artist";

export type Song = {
  id: number;
  name: string;
  filePath: string;
  duration: number;
  imageCover: string;
  artist: Artist;
};
