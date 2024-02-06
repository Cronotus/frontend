export interface EventForCreationDto {
  organizerId: string;
  sportId: string;
  name: string;
  description: string;
  startDate: string;
  location: string;
  capacity: number;
  isEnded: boolean;
}
