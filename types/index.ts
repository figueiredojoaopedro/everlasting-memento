export interface Memento {
  id: string;
  userId: string;
  title: string;
  coverImageUrl: string;
  date?: string;
  whoIsThisFor?: string;
  createdAt: number;
}

export interface Memory {
  id: string;
  mementoId: string;
  imageUrl: string;
  title?: string;
  description: string;
  meaning: string;
  date: string;
  createdAt: number;
}
