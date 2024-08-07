import { z } from "zod";

// 定义一个用户模式
const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(120).optional(),
  roles: z.array(z.enum(["admin", "user", "guest"])).default(["user"]),
  createdAt: z.date()
});

// 从模式中推断出 TypeScript 类型
type User = z.infer<typeof UserSchema>;

// 使用推断出的 User 类型
function createUser(userData: User) {
  // TypeScript 会根据 User 类型提供类型检查和自动完成
  console.log("Creating user:", userData);
}

// 使用模式验证数据
try {
  const validUser = UserSchema.parse({
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    roles: ["admin"],
    createdAt: new Date()
  });
  
  // 使用推断出的类型
  createUser(validUser);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation errors:", error.errors);
  }
}

// 尝试验证无效数据
try {
  UserSchema.parse({
    id: "not a number",
    name: "A",
    email: "not-an-email",
    age: 15,
    roles: ["superuser"],
    createdAt: "2023-01-01"
  });
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error("Validation errors:", error.errors);
  }
}

