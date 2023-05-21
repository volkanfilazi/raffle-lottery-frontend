import {User} from '../interfaces/user'

export interface raffleList {
  _id: string,
  createdBy: string,
  giftBalance: Number,
  maxParticipants: Number,
  participants: User[],
  winner: string,
  available : boolean
}