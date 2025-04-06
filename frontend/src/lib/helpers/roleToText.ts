export const roles = {
  pidor: "Неизвестно",
  member_union: "Член совета",
  member_comitet: "Член комитета",
  admin: "Администратор",
  secretar: "Секреть",
  corporative_secretar: "Корпоративный секретарь",
  guest: "Гость",
};
export const rolesToText = (items: (keyof typeof roles)[]) =>
  items.map((t) => roles[t] || "Неизвестно").join(", ");
