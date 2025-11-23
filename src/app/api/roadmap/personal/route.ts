import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: pathways, error } = await supabase
        .from('user_pathways')
        .select(`
      *,
      course:courses(id, code, name),
      parent_course:courses(id, code, name)
    `)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(pathways);
}

export async function POST(request: Request) {
    const supabase = await createClient();

    try {
        const body = await request.json();
        const { course_code, parent_course_id, status } = body;

        if (!course_code) {
            return NextResponse.json({ error: 'Course code is required' }, { status: 400 });
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Resolve Course ID (Find or Create)
        let course_id;
        const { data: existingCourse } = await supabase
            .from('courses')
            .select('id')
            .eq('code', course_code)
            .eq('university_name', 'University of Regina')
            .single();

        if (existingCourse) {
            course_id = existingCourse.id;
        } else {
            // Create new course
            const { data: newCourse, error: createCourseError } = await supabase
                .from('courses')
                .insert({
                    code: course_code,
                    name: course_code, // Fallback
                    department: 'Unspecified',
                    university_name: 'University of Regina'
                })
                .select('id')
                .single();

            if (createCourseError) throw createCourseError;
            course_id = newCourse.id;
        }

        // 2. Insert into user_pathways
        const { data: pathway, error: pathwayError } = await supabase
            .from('user_pathways')
            .insert({
                user_id: user.id,
                course_id,
                parent_course_id: parent_course_id || null,
                status: status || 'planned'
            })
            .select(`
        *,
        course:courses(id, code, name),
        parent_course:courses(id, code, name)
      `)
            .single();

        if (pathwayError) throw pathwayError;

        return NextResponse.json(pathway);

    } catch (error: any) {
        console.error('Error adding to roadmap:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
