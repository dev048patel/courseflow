import { createClient } from '@/utils/supabase/server';
import { MessageSquare, ThumbsUp, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface FeedReview {
  id: string;
  rating: number;
  difficulty: number;
  comment: string;
  author_year_snapshot: number;
  author_major_snapshot: string;
  author_grade_snapshot: string;
  created_at: string;
  courses: {
    id: string;
    code: string;
    name: string;
  } | null;
}

async function getRecentReviews(): Promise<FeedReview[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        difficulty,
        comment,
        author_year_snapshot,
        author_major_snapshot,
        author_grade_snapshot,
        created_at,
        courses!inner (
          id,
          code,
          name
        )
      `)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }

    if (!data) return [];

    // Transform the data to match our FeedReview type
    const reviews: FeedReview[] = data.map((item: any) => ({
      id: item.id,
      rating: item.rating,
      difficulty: item.difficulty,
      comment: item.comment,
      author_year_snapshot: item.author_year_snapshot,
      author_major_snapshot: item.author_major_snapshot,
      author_grade_snapshot: item.author_grade_snapshot,
      created_at: item.created_at,
      courses: Array.isArray(item.courses) && item.courses.length > 0
        ? item.courses[0]
        : item.courses
    }));

    return reviews.filter(review => review.courses !== null);
  } catch (error) {
    console.error('Error in getRecentReviews:', error);
    return [];
  }
}

function getStudentYear(year: number): string {
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
  return years[year - 1] || 'Student';
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
}

export default async function HomePage() {
  const reviews = await getRecentReviews();

  return (
    <main className="min-h-screen bg-[#F3F2EF] py-6">
      <div className="max-w-4xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-6 mb-4">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Welcome to CourseFlow
          </h1>
          <p className="text-slate-600">
            Discover authentic course reviews from verified students. Make informed decisions about your academic journey.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">Quick Actions</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/courses"
              className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
            >
              <BookOpen className="w-6 h-6 text-[#0a66c2] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-slate-700">Browse Courses</span>
            </Link>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <MessageSquare className="w-6 h-6 text-[#0a66c2] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-slate-700">Write Review</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
              <ThumbsUp className="w-6 h-6 text-[#0a66c2] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-slate-700">My Reviews</span>
            </button>
          </div>
        </div>

        {/* Feed Header */}
        <div className="mb-3 px-1">
          <h2 className="text-lg font-bold text-slate-800">Recent Reviews</h2>
          <p className="text-sm text-slate-600">See what students are saying</p>
        </div>

        {/* Reviews Feed */}
        {reviews.length === 0 ? (
          /* Empty State */
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Welcome! No reviews yet.
            </h3>
            <p className="text-slate-600 mb-6">
              Be the first to share your course experience and help other students make informed decisions.
            </p>
            <Link
              href="/courses"
              className="inline-block px-6 py-2.5 bg-[#0a66c2] text-white rounded-full font-semibold text-sm hover:bg-[#004182] transition-colors"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          /* Reviews List */
          <div className="space-y-3">
            {reviews.map((review) => {
              if (!review.courses) return null;

              return (
                <article
                  key={review.id}
                  className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-800 text-sm">
                          Verified {getStudentYear(review.author_year_snapshot)} • {review.author_major_snapshot} Major
                          {review.author_grade_snapshot && (
                            <span className="ml-2 text-xs font-medium text-green-600">
                              Grade: {review.author_grade_snapshot}
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          {getTimeAgo(review.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <span className="text-sm font-bold text-amber-700">{review.rating}</span>
                        <span className="text-xs text-amber-600">★</span>
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <Link
                    href={`/courses/${review.courses.id}`}
                    className="block px-4 py-3 bg-blue-50 border-b border-gray-200 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#0a66c2]" />
                      <span className="text-sm font-semibold text-[#0a66c2]">
                        {review.courses.code}
                      </span>
                      <span className="text-sm text-slate-700">
                        {review.courses.name}
                      </span>
                    </div>
                  </Link>

                  {/* Review Content */}
                  <div className="p-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      "{review.comment}"
                    </p>
                    {review.difficulty && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-600">Difficulty:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((level) => (
                            <div
                              key={level}
                              className={`w-6 h-2 rounded-full ${level <= review.difficulty
                                ? 'bg-orange-400'
                                : 'bg-gray-200'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500">
                          ({review.difficulty}/5)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="px-4 py-3 border-t border-gray-200 flex items-center gap-4">
                    <button className="flex items-center gap-2 text-slate-600 hover:text-[#0a66c2] transition-colors text-sm">
                      <ThumbsUp className="w-4 h-4" />
                      <span>Helpful</span>
                    </button>
                    <button className="flex items-center gap-2 text-slate-600 hover:text-[#0a66c2] transition-colors text-sm">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  );
}
