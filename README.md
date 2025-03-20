# Next Auth Email Verification App - Comprehensive Authentication and Authorization Management

## 📝 Description

**Next Auth Email Verification App** is a comprehensive authentication and authorization management system that provides a secure and user-friendly experience for managing user accounts, permissions, and access control. It includes features such as email and password authentication, 2-factor authentication, email verification, one-time password (OTP) generation, password reset functionality, and advanced security measures.

---

## 🌐 Demo

---

## ✨ Key Features

- **Authentication:**
  - Email and Password Authentication
  - 2-Factor Authentication
  - Email Verification
  - One-Time Password (OTP) Generation
  - Password Reset
  - Advanced Security Measures
- **Authorization:**
  - Protected Routes
  - Guest Routes

---

## 🛠️ Technologies Used

- **Framework:** Next.js v15
- **Package Manager:** Bun
- **Programming Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** Better Auth
- **ORM:** Prisma
- **UI:** Shadcn UI
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Formatting:** Prettier
- **Deployment:** Vercel

---

## 🔧 Installation

### Local Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bagusvalentinoo/next-auth-email-verification-app.git
   cd next-auth-email-verification-app
   ```

2. **Configure environment variables:**

   - Copy the example `.env` file and update the values as needed:
     ```bash
     cp .env.example .env
     ```

3. **Install dependencies using Bun:**

   ```bash
   bun install
   ```

4. **Generate Prisma Client:**

   ```bash
   bunx prisma generate
   ```

5. **Push database schema:**

   ```bash
   bun run db:migrate
   ```

6. **Start the development server:**

   ```bash
   bun run dev
   ```

7. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

---

### Installation via Docker

---

## 📊 Migration & Database Seeding

- **Apply database schema:**

  ```bash
  bun run db:migrate
  ```

- **Rollback database schema:**

  ```bash
  bun run db:migrate:rollback
  ```

- **Fresh database:**

  ```bash
  bun run db:migrate:fresh
  ```

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 📞 Support

If you encounter any issues or have questions, feel free to <a href="https://github.com/bagusvalentinoo/next-auth-email-verification-app/issues" target="_blank">open an issue</a> or contact the maintainers.

---

## 📚 Resources

- <a href="https://nextjs.org/docs" target="_blank">Next.js Documentation</a>
- <a href="https://bun.sh/docs" target="_blank">Bun Documentation</a>
- <a href="https://www.prisma.io/docs" target="_blank">Prisma Documentation</a>
- <a href="https://www.betterstack.com/docs/better-auth/introduction" target="_blank">Better Auth Documentation</a>
- <a href="https://www.shadcn.com/docs" target="_blank">Shadcn UI Documentation</a>
- <a href="https://tailwindcss.com/docs" target="_blank">Tailwind CSS Documentation</a>
- <a href="https://eslint.org/docs" target="_blank">ESLint Documentation</a>
- <a href="https://prettier.io/docs" target="_blank">Prettier Documentation</a>
