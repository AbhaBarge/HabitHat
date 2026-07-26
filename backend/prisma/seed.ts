import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findUnique({
    where: {
      email: "demo@habithat.com",
    },
  });

  if (existing) {
    console.log("✅ Demo user already exists.");
    return;
  }

  const password = await bcrypt.hash("demo123", 10);

  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@habithat.com",
      password,
    },
  });

  const habits = [
    {
      title: "Workout",
      description: "45 mins strength training",
      category: "Fitness",
      color: "#10B981",
      streak: 18,
      completed: true,
      lastCompletedAt: new Date(),
      userId: user.id,
    },
    {
      title: "Read 30 mins",
      description: "Read Atomic Habits",
      category: "Learning",
      color: "#3B82F6",
      streak: 42,
      completed: true,
      lastCompletedAt: new Date(),
      userId: user.id,
    },
    {
      title: "Meditation",
      description: "10 minute mindfulness",
      category: "Mindfulness",
      color: "#8B5CF6",
      streak: 11,
      completed: false,
      userId: user.id,
    },
    {
      title: "Drink Water",
      description: "3 Litres",
      category: "Health",
      color: "#06B6D4",
      streak: 76,
      completed: true,
      lastCompletedAt: new Date(),
      userId: user.id,
    },
    {
      title: "LeetCode",
      description: "Solve 2 problems",
      category: "Coding",
      color: "#F97316",
      streak: 23,
      completed: true,
      lastCompletedAt: new Date(),
      userId: user.id,
    },
    {
      title: "Journal",
      description: "Reflect on the day",
      category: "Productivity",
      color: "#EC4899",
      streak: 9,
      completed: false,
      userId: user.id,
    },
    {
      title: "Sleep Before 11",
      description: "Sleep by 11 PM",
      category: "Lifestyle",
      color: "#6366F1",
      streak: 5,
      completed: true,
      lastCompletedAt: new Date(),
      userId: user.id,
    },
    {
      title: "Walk 8k Steps",
      description: "Daily walk",
      category: "Fitness",
      color: "#14B8A6",
      streak: 31,
      completed: true,
      lastCompletedAt: new Date(),
      userId: user.id,
    },
  ];

  await prisma.habit.createMany({
    data: habits,
  });

  console.log("🎉 Demo user created successfully!");
  console.log("--------------------------------");
  console.log("Email    : demo@habithat.com");
  console.log("Password : demo123");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });