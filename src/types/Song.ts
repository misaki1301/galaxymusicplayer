import { Artist } from "@/types/Artist";

export type Song = {
  id: number;
  name: string;
  filePath: string;
  duration: bigint;
  imageCover: string;
  artist: Artist;
};
