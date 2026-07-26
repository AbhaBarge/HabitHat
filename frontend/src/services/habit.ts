import api from "../lib/api";
import type { DashboardStats } from "../types/stats";

export const HabitService = {
  async getHabits() {
    const { data } = await api.get("/habits");
    return data;
  },

  async createHabit(title: string) {
    return api.post("/habits", {
      title,
    });
  },

  async completeHabit(id: string) {
    return api.post(`/habits/${id}/complete`);
  },

  async deleteHabit(id: string) {
    return api.delete(`/habits/${id}`);
  },

  async getStats(): Promise<DashboardStats> {
    const { data } = await api.get("/habits/stats");
    return data;
  },
};