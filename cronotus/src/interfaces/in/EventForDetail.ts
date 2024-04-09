export interface EventForDetail {
  id: string;
  sportId: string;
  sportName: string;
  organizerId: string;
  organizerName: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  signedUpPlayers: number;
  capacity: number;
  isEnded: boolean;
}
