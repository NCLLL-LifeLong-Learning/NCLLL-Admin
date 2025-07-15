export default interface RequestModel {
  description: string;
  reason: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  _id?: string;
}