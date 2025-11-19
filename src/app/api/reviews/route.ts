import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Admin Client (Bypasses RLS for verification checks)
// Note: In a real app, ensure SUPABASE_SERVICE_ROLE_KEY is kept secret and only used server-side.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseId, professorId, rating, difficulty, comment } = body;

    if (!userId || !courseId || !rating) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. VERIFICATION: Check if the user is actually enrolled in the course
    const { data: enrollment, error: enrollmentError } = await supabaseAdmin
      .from('enrollments')
      .select('id, grade_range, users(major, graduation_year)')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (enrollmentError || !enrollment) {
      return NextResponse.json(
        { error: "Verification Failed: You must be enrolled in this course to review it." },
        { status: 403 }
      );
    }

    // 2. CALCULATE METADATA: Derive anonymous labels
    const currentYear = new Date().getFullYear();
    // @ts-ignore - Supabase types might need generation, casting for now
    const graduationYear = enrollment.users?.graduation_year;
    // @ts-ignore
    const major = enrollment.users?.major;

    const yearsUntilGrad = graduationYear - currentYear;
    let studentYearLabel = 4 - yearsUntilGrad; 
    if (studentYearLabel < 1) studentYearLabel = 1;
    if (studentYearLabel > 4) studentYearLabel = 4; // Cap at Senior/Post-grad logic if needed

    // 3. ANONYMOUS INSERT: Save the review WITHOUT the UserID
    const { data: review, error: reviewError } = await supabaseAdmin
      .from('reviews')
      .insert({
        course_id: courseId,
        professor_id: professorId,
        rating: rating,
        difficulty: difficulty,
        comment: comment,
        
        // Snapshot Data (Decoupled from User Profile updates)
        author_year_snapshot: studentYearLabel,
        author_major_snapshot: major,
        author_grade_snapshot: enrollment.grade_range,
        
        // Internal Link
        linked_enrollment_id: enrollment.id
      })
      .select()
      .single();

    if (reviewError) {
      console.error('Review Insert Error:', reviewError);
      return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }

    return NextResponse.json({ success: true, reviewId: review.id });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
