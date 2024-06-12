export interface IHelpRequest {
  studentId: string;
  instructorId?: string;
  question: string;
  acceptedAt?: Date;
  completedAt?: Date;
  notes?: string;
}