// Упрощённая схема без drizzle/zod, только типы для использования в сервере

export type User = {
  id: string;
  username: string;
  password: string;
};

export type InsertUser = {
  username: string;
  password: string;
};
