import { Button } from '@shared/components/button';
import { LockOutlined } from '@shared/components/icons/LockOutlined';
import { Modal } from '@shared/components/modal';
import { Course } from '@shared/typings';
import { getCourseItemRoute } from '@shared/utils/route';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { courses } from '../../../config/courses';

interface RequiredCoursesProps {
  requiredCourseIds: string[];
  close: () => void;
}

export function RequiredCourses({
  close,
  requiredCourseIds,
}: RequiredCoursesProps) {
  const [requiredCourses, setRequiredCourses] = useState<Course[]>([]);

  useEffect(() => {
    const foundCourses = courses.filter(course =>
      requiredCourseIds.includes(course.id),
    );
    setRequiredCourses(foundCourses);
  }, [requiredCourseIds]);

  return (
    <Modal close={close} open>
      <div className="flex flex-col items-center space-y-6 py-14">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gray-50">
          <LockOutlined className="text-4xl text-gray-600" />
        </div>
        <div>
          This vote requires following {requiredCourses?.length} courses:
        </div>
        <ul className="flex flex-col space-y-2">
          {requiredCourses?.map(course => (
            <li className="list-disc" key={course.id}>
              {course.title}
            </li>
          ))}
        </ul>
        <div className="!mt-20 w-full">
          <Link href={getCourseItemRoute(requiredCourseIds?.[0])}>
            <Button fullSize className="py-2" onClick={close} variant="primary">
              Start here
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
