import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = await createClient();

  try {
    const body = await request.json();
    const {
      course_code,
      course_name,
      professor_name,
      rating,
      difficulty,
      comment,
      mentorship_score,
      skills_learned,
      career_relevance_rating
    } = body;

    // Validation
    if (!course_code || !professor_name || !rating || !difficulty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1. Get User
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Resolve Course ID (Find or Create)
    let course_id;
    const { data: existingCourse } = await supabase
      .from('courses')
      .select('id')
      .eq('code', course_code)
      .eq('university_name', 'University of Regina') // Assuming single uni for now
      .single();

    if (existingCourse) {
      course_id = existingCourse.id;
    } else {
      // Create new course
      const { data: newCourse, error: createCourseError } = await supabase
        .from('courses')
        .insert({
          code: course_code,
          name: course_name || course_code, // Fallback name
          department: 'Unspecified',
          university_name: 'University of Regina'
        })
        .select('id')
        .single();

      if (createCourseError) throw createCourseError;
      course_id = newCourse.id;
    }

    // 3. Resolve Professor ID (Find or Create)
    let professor_id;
    const { data: existingProf } = await supabase
      .from('professors')
      .select('id')
      .eq('name', professor_name)
      .eq('university_name', 'University of Regina')
      .single();

    if (existingProf) {
      professor_id = existingProf.id;
    } else {
      // Create new professor
      const { data: newProf, error: createProfError } = await supabase
        .from('professors')
        .insert({
          name: professor_name,
          department: 'Unspecified',
          university_name: 'University of Regina'
        })
        .select('id')
        .single();

      if (createProfError) throw createProfError;
      professor_id = newProf.id;
    }

    // 4. Create Enrollment (Implicit Verification)
    // In a real app, we'd verify this. For now, we auto-create an enrollment record
    // so the review can link to it.
    let enrollment_id;
    const { data: existingEnrollment } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course_id)
      .single();

    if (existingEnrollment) {
      enrollment_id = existingEnrollment.id;
    } else {
      const { data: newEnrollment, error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: course_id,
          semester: 'Unknown', // Default
          visible_on_profile: true
        })
        .select('id')
        .single();

      if (enrollError) throw enrollError;
      enrollment_id = newEnrollment.id;
    }

    // 5. Insert Review
    const { data: review, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        course_id,
        professor_id,
        rating,
        difficulty,
        comment,
        linked_enrollment_id: enrollment_id,
        mentorship_score,
        skills_learned,
        career_relevance_rating,
        // Snapshot data (mocked for now, ideally fetch from user profile)
        author_year_snapshot: 1,
        author_major_snapshot: 'Undeclared',
        author_grade_snapshot: 'N/A'
      })
      .select()
      .single();

    if (reviewError) throw reviewError;

    return NextResponse.json(review);

  } catch (error: any) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get('courseId');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '5');
  const offset = (page - 1) * limit;

  let query = supabase
    .from('reviews')
    .select(`
      *,
      course:courses(code, name),
      professor:professors(name)
    `)
    .range(offset, offset + limit - 1)
    .order('created_at', { ascending: false });

  if (courseId) {
    query = query.eq('course_id', courseId);
  }

  const { data: reviews, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(reviews);
}
