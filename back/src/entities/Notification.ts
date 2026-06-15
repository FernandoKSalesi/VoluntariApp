export class Notification {
  id: number | undefined;
  eventId: number | null | undefined;
  userId: number;
  senderId: number | null | undefined;
  title: string;
  message: string;
  read: boolean;
  sentAt: Date | undefined;

  constructor(props: Omit<Notification, 'id' | 'sentAt'>, id?: number, sentAt?: Date) {
    this.id = id;
    this.eventId = props.eventId ?? null;
    this.userId = props.userId;
    this.senderId = props.senderId ?? null;
    this.title = props.title;
    this.message = props.message;
    this.read = props.read ?? false;
    this.sentAt = sentAt;
  }
}
