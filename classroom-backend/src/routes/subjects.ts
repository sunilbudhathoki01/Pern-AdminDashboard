import { and, desc, eq, getTableColumns, ilike, or, sql } from "drizzle-orm";
import express from "express";
import { departments, subjects } from "../db/schema";
import { db } from "../db";
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const { search, department, page = 1, limit = 10 } = req.query;
    const currentPage = Math.max(1, +page);
    const limitPerPage = Math.max(1, +limit);
    const offset = (currentPage - 1) * limitPerPage;
    const filterconditions = [];
    // if search query exist filter by subject name or code
    if (search) {
      filterconditions.push(
        or(
          ilike(subjects.name, `%${search}%`),
          ilike(subjects.code, `%${search}%`),
        ),
      );
    }
    // if department query exist filter by department name
    if (department) {
      filterconditions.push(ilike(departments.name, `%${department}%`));
    }
    // combine all filter conditions using AND if any exist
    const whereClause =
      filterconditions.length > 0 ? and(...filterconditions) : undefined;
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause);

    const totalCount = countResult[0]?.count ?? 0;
    const subjectsList = await db
      .select({
        ...getTableColumns(subjects),
        department: { ...getTableColumns(departments) },
      })
      .from(subjects)
      .leftJoin(departments, eq(subjects.departmentId, departments.id))
      .where(whereClause)
      .orderBy(desc(subjects))
      .limit(limitPerPage)
      .offset(offset);
    res.status(200).json({
      data: subjectsList,
      pagination: {
        total: totalCount,
        limit: limitPerPage,
        page: currentPage,
        totalPages: Math.ceil(totalCount / limitPerPage),
      },
    });
  } catch (error) {
    console.error(`Get/subjects error:${error}`);
    res.status(500).json({ error: "failed to get subjects" });
  }
});
