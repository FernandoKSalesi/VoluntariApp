export interface CreateEventDTO {
  name: string;
  description?: string;
  startTime: string; // ISO string
  endTime: string;    // ISO string
  location?: string;
  imageUrl?: string;
  totalSpots: number;
}
