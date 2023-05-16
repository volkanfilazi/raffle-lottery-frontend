import {User} from '../interfaces/user'

export interface raffleList {
  createdBy: string,
  giftBalance: Number,
  maxParticipants: Number,
  participants: User[],
  winner: string,
  available : boolean
}