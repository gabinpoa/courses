'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { getProductContentById } from '@/lib/db/queries';
import Link from 'next/link';

type SelectedLesson = {
  name: string;
  description: string | null;
  contentType?: 'VIDEO' | 'MDX';
  content?: string;
} | null;

type Props = Awaited<ReturnType<typeof getProductContentById>>;
export default function CourseContent(props: Props) {
  const [selectedLesson, setSelectedLesson] = useState<SelectedLesson>(null);

  const courseData = props;

  return (
    <>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold mb-4">{courseData.name}</h1>
        <p className="text-gray-600 mb-4">{courseData.description}</p>
        {selectedLesson ? (
          <Card>
            <CardHeader>
              <CardTitle>{selectedLesson.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLesson.contentType === 'VIDEO' ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={selectedLesson.content}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : selectedLesson.contentType === 'MDX' ? (
                <div className="prose max-w-none">
                  {/* This is a simplified MDX rendering. In a real app, you'd use an MDX parser here */}
                  <pre>{selectedLesson.content}</pre>
                </div>
              ) : (
                // If this happens, the user doesn't have access to the content
                <div>
                  <p>
                    Você precisa se inscrever no curso para acessar este
                    conteúdo.
                  </p>
                  <Link href="/prices">Inscrever-se</Link>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Image
            src={courseData.metadata.thumbnail_url || '/placeholder.svg'}
            alt={courseData.name}
            unoptimized
            width={600}
            height={300}
            className="rounded-md object-cover"
          />
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Course Content</h2>
        <Accordion type="single" collapsible className="w-full">
          {courseData.modules.map((module, moduleIndex) => (
            <AccordionItem value={`module-${moduleIndex}`} key={moduleIndex}>
              <AccordionTrigger>
                {module.name}
                {module.isExtraContent && (
                  <Badge variant="secondary" className="ml-2">
                    Extra
                  </Badge>
                )}
              </AccordionTrigger>
              <AccordionContent>
                {module.lessons.map((lesson, lessonIndex) => (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    key={lessonIndex}
                    onClick={() => setSelectedLesson(lesson)}
                  >
                    {lesson.name}
                  </Button>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
