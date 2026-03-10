import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("int_ai.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    skills TEXT,
    projects TEXT,
    education TEXT,
    resume_url TEXT,
    score INTEGER DEFAULT 0,
    ranking INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    interview_type TEXT NOT NULL,
    date TEXT NOT NULL,
    time_slot TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES students(id)
  );

  CREATE TABLE IF NOT EXISTS company_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed some leaderboard data if empty
const studentCount = db.prepare("SELECT COUNT(*) as count FROM students").get() as { count: number };
if (studentCount.count === 0) {
  const insert = db.prepare("INSERT INTO students (name, email, skills, score, ranking) VALUES (?, ?, ?, ?, ?)");
  insert.run("Alex Johnson", "alex@example.com", "React, Node.js, TypeScript", 95, 1);
  insert.run("Sarah Williams", "sarah@example.com", "Python, Machine Learning, SQL", 92, 2);
  insert.run("Michael Chen", "michael@example.com", "Java, Spring Boot, AWS", 88, 3);
  insert.run("Emily Davis", "emily@example.com", "UI/UX Design, Figma, Tailwind", 85, 4);
  insert.run("David Miller", "david@example.com", "C++, Embedded Systems, Linux", 82, 5);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Routes
  app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;
    try {
      const result = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, password);
      res.json({ success: true, message: "Account created successfully!", userId: result.lastInsertRowid });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        res.status(400).json({ success: false, message: "Email already exists." });
      } else {
        res.status(500).json({ success: false, message: "Failed to create account." });
      }
    }
  });

  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    try {
      const user = db.prepare("SELECT id, name, email FROM users WHERE email = ? AND password = ?").get(email, password) as any;
      if (user) {
        res.json({ success: true, user });
      } else {
        res.status(401).json({ success: false, message: "Invalid email or password." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Login failed." });
    }
  });

  // API Routes
  app.get("/api/leaderboard", (req, res) => {
    const leaderboard = db.prepare("SELECT name, skills, score, ranking FROM students ORDER BY score DESC LIMIT 10").all();
    res.json(leaderboard);
  });

  app.post("/api/bookings", (req, res) => {
    const { name, email, phone, interviewType, date, timeSlot } = req.body;
    try {
      // Simple logic: find or create student then book
      let student = db.prepare("SELECT id FROM students WHERE email = ?").get() as { id: number } | undefined;
      if (!student) {
        const result = db.prepare("INSERT INTO students (name, email, phone) VALUES (?, ?, ?)").run(name, email, phone);
        student = { id: result.lastInsertRowid as number };
      } else if (phone) {
        db.prepare("UPDATE students SET phone = ? WHERE id = ?").run(phone, student.id);
      }
      
      db.prepare("INSERT INTO bookings (student_id, interview_type, date, time_slot) VALUES (?, ?, ?, ?)").run(student.id, interviewType, date, timeSlot);
      res.json({ success: true, message: "Interview booked successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to book interview." });
    }
  });

  app.post("/api/company-requests", (req, res) => {
    const { companyName, contactPerson, email, message } = req.body;
    try {
      db.prepare("INSERT INTO company_requests (company_name, contact_person, email, message) VALUES (?, ?, ?, ?)").run(companyName, contactPerson, email, message);
      res.json({ success: true, message: "Partnership request submitted!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to submit request." });
    }
  });

  app.get("/api/user-bookings", (req, res) => {
    const { email } = req.query;
    try {
      const bookings = db.prepare(`
        SELECT b.id, b.interview_type, b.date, b.time_slot, b.status 
        FROM bookings b
        JOIN students s ON b.student_id = s.id
        WHERE s.email = ?
        ORDER BY b.date DESC
      `).all(email);
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Failed to fetch bookings." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
