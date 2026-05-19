export class Event {
  id?: number | undefined;
  organizerId: number;
  name: string;
  description?: string | null | undefined;
  startTime: Date;
  endTime: Date;
  location?: string | null | undefined;
  imageUrl?: string | null | undefined;
  totalSpots: number;
  createdAt?: Date | undefined;

  constructor(props: Omit<Event, 'id' | 'createdAt'>, id?: number | undefined, createdAt?: Date | undefined) {
    this.id = id;
    this.organizerId = props.organizerId;
    this.name = props.name;
    this.description = props.description;
    this.startTime = props.startTime;
    this.endTime = props.endTime;
    this.location = props.location;
    this.imageUrl = props.imageUrl;
    this.totalSpots = props.totalSpots;
    this.createdAt = createdAt;
  }
}
