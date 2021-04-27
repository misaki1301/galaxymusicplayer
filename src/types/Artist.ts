import { Song } from "@/types/Song";

export type Artist = {
  id: number;
  name: string;
  imageProfile: string;
  songs: Song[];
};
