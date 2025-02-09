import CourseContent from '@/components/couse-content';
import { getProductContentById } from '@/lib/db/queries';
import { redirect } from 'next/navigation';

type Props = { params: Promise<{ id: string }> };
export default async function Page({ params }: Props) {
  const { id } = await params;

  let content;
  try {
    content = await getProductContentById(id);
  } catch (error) {
    console.error(error);
    redirect('/cursos/' + id + '/visao-geral');
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CourseContent {...content} />
      </div>
    </div>
  );
}
