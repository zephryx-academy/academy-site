import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CoursePlayer from '@/components/CoursePlayer';
import { COURSES, getCourse } from '@/lib/courses';

export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const course = getCourse((await params).slug);
  // A player with no media behind it has nothing worth indexing.
  return { title: course ? `Learn — ${course.title}` : 'Learn', robots: { index: false, follow: false } };
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  return <CoursePlayer course={course} />;
}
