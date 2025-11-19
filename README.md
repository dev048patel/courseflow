# CourseFlow

**LinkedIn for University Students** - A peer-to-peer academic guidance platform helping students select the right subjects and professors based on authentic senior student history.

## 🎯 Core Features

- **Student Profiles**: Display academic history with courses taken
- **Verified Anonymous Reviews**: Public course history with decoupled anonymous ratings
- **Review System**: Rate courses and professors with verified student credentials
- **Syllabus Vault**: Upload and share course syllabi
- **Smart Data Architecture**: Privacy-first design ensuring honest feedback without academic backlash

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL via Supabase
- **Storage**: Supabase Storage for syllabus files
- **UI**: Lucide React icons

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd inertial-supernova
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env.local`
   - Update with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-project-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
     ```

4. **Set up the database**:
   - Run the SQL schema in your Supabase SQL Editor:
     ```bash
     # Execute supabase/schema.sql
     # Execute supabase/storage_policies.sql
     ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open**: [http://localhost:3000](http://localhost:3000)

## 🗃️ Database Schema

The application uses a privacy-preserving architecture:

- **users**: Student profiles and metadata
- **courses**: Course catalog
- **professors**: Professor directory
- **enrollments**: Links users to courses (public on profile)
- **reviews**: Anonymous reviews with verified student snapshots
- **syllabus_uploads**: File storage metadata
- **marketplace_listings**: Textbook marketplace

## 🔒 Privacy Architecture

**Key Innovation**: Verified Anonymous Reviews

- Student's course history is **public** on their profile
- Their specific ratings/reviews are **anonymous** and decoupled from their identity
- Reviews display verified metadata: "Junior • Biology Major • Grade: A"
- Backend links reviews via hashed enrollment IDs for moderation only

## 🛠️ Development

```bash
# Build for production
npm run build

# Run production build
npm start

# Lint code
npm run lint
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
