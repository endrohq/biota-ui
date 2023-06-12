import { Container } from '@shared/components/container';
import { Paragraph } from '@shared/components/typography/Paragraph';
import { H1 } from '@shared/components/typography/Title';

import { Course } from '@shared/typings';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { courses } from '../../config/courses';

export default function Page() {
  const { query } = useRouter();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (query.courseId) {
      const course = courses.find(
        courseItem => courseItem.id === query.courseId,
      );
      if (course) {
        setCourse(course);
      }
    }
  }, [query.courseId]);

  return (
    <Container>
      <section className="w-full py-20">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-3">
            <H1 className="!text-3xl font-black">{course?.title || '-'}</H1>
            <Paragraph className="w-1/2">
              {course?.description || '-'}
            </Paragraph>
          </div>
        </div>
      </section>
    </Container>
  );
}
