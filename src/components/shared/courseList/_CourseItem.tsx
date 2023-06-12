import { Course } from '@shared/typings';
import { getCourseItemRoute } from '@shared/utils/route';
import Link from 'next/link';

interface CourseListItemProps {
  course: Course;
}

export function CourseListItem({ course }: CourseListItemProps) {
  return (
    <Link
      href={getCourseItemRoute(course.id)}
      className="rounded bg-gray-100 px-4 py-2"
    >
      {course.title}
    </Link>
  );
}
