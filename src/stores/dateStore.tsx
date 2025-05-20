import { create } from "zustand";
import dayjs from "dayjs";

type DateStore = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
};

export const useDateStore = create<DateStore>((set) => ({
  selectedDate: dayjs().format("YYYY-MM-DD"),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
