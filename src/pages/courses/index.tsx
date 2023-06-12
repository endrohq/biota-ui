import { Container } from '@shared/components/container';
import { CourseList } from '@shared/components/courseList';
import { H1 } from '@shared/components/typography/Title';

export default function Page() {
  return (
    <Container>
      <section className="w-full py-20">
        <div className="container mx-auto">
          <div className="flex flex-col space-y-6 ">
            <H1 className="!text-3xl font-black">Courses</H1>
            <CourseList />
          </div>
        </div>
      </section>
    </Container>
  );
}
