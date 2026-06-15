export class EventRating {
  id: number | undefined;
  eventId: number;
  userId: number;
  rating: number;
  comment: string | null | undefined;
  createdAt: Date | undefined;

  constructor(props: Omit<EventRating, 'id' | 'createdAt'>, id?: number, createdAt?: Date) {
    this.id = id;
    this.eventId = props.eventId;
    this.userId = props.userId;
    this.rating = props.rating;
    this.comment = props.comment ?? null;
    this.createdAt = createdAt;
  }
}
