import { CourseListItem } from './_CourseItem';

import { courses } from '../../../config/courses';

export function CourseList() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-4 gap-4">
        {courses.map(course => (
          <CourseListItem course={course} />
        ))}
      </div>
    </div>
  );
}
