import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';

export default async function PaginaInicial() {
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              AprendaJá
            </Link>
            <div className="space-x-4">
              <Link href="/cursos" className="hover:underline">
                Cursos
              </Link>
              <Link href="/sobre" className="hover:underline">
                Sobre
              </Link>
              <Link href="/entrar" className="hover:underline">
                Entrar
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-primary to-background py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Desbloqueie Seu Potencial com AprendaJá
            </h1>
            <p className="text-xl mb-8">
              Descubra um mundo de conhecimento com nossos cursos online
              ministrados por especialistas
            </p>
            <Button size="lg" asChild>
              <Link href="/cursos">Explorar Cursos</Link>
            </Button>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Por que Escolher AprendaJá?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader>
                  <BookOpen className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Cursos Ministrados por Especialistas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Aprenda com profissionais da indústria e adquira habilidades
                    práticas
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Suporte da Comunidade</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Conecte-se com colegas e instrutores para um aprendizado
                    colaborativo
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Award className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Certificados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Ganhe certificados reconhecidos ao concluir os cursos</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>Crescimento na Carreira</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Impulsione sua carreira com habilidades e conhecimentos em
                    alta demanda
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Cursos em Destaque
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prices.map((price) => {
                const product = products.find(
                  (product) => product.id === price.productId
                );
                if (product) {
                  return (
                    <Card key={product.id}>
                      <CardHeader>
                        <Image
                          src={
                            product.metadata.thumbnailUrl || '/placeholder.svg'
                          }
                          alt={product.name}
                          width={300}
                          height={150}
                          className="rounded-md object-cover"
                        />
                      </CardHeader>
                      <CardContent>
                        <CardTitle>{product.name}</CardTitle>
                        <CardDescription className="mt-2">
                          {product.description}
                        </CardDescription>
                        <p className="font-bold mt-2">
                          R$ {price.unitAmount! / 100}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={`/cursos/${product.id}/visao-geral`}>
                            Saiba Mais
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                }
                return null;
              })}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/cursos">Ver Todos os Cursos</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">
              Pronto para Começar a Aprender?
            </h2>
            <p className="text-xl mb-8">
              Junte-se a milhares de alunos e aprimore suas habilidades hoje
            </p>
            <Button size="lg" asChild>
              <Link href="/cadastro">Cadastre-se Agora</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2023 AprendaJá. Todos os direitos reservados.</p>
            <nav className="space-x-4 mt-4 md:mt-0">
              <Link href="/termos" className="hover:underline">
                Termos de Serviço
              </Link>
              <Link href="/privacidade" className="hover:underline">
                Política de Privacidade
              </Link>
              <Link href="/contato" className="hover:underline">
                Fale Conosco
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
