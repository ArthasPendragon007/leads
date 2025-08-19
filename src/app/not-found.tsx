// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-8">

            <div className="flex flex-col items-center justify-center text-center max-w-xl mx-auto p-12 rounded-lg bg-card shadow-lg">

                <div className="flex flex-col items-center space-y-4 mb-6">
                    <h1 className="text-8xl md:text-9xl font-extrabold text-primary">
                        404
                    </h1>
                </div>

                {/* Título e subtítulo */}
                <h2 className="text-3xl md:text-4xl font-bold mb-3 text-card-foreground">
                    Página Não Encontrada
                </h2>
                <p className="text-lg text-muted-foreground mb-6 text-center max-w-lg">
                    Ops! A página que você está procurando não existe ou foi removida.
                </p>

                {/* Botão para voltar à página inicial com variante outline */}
                <Link href="/leads" passHref>
                    <Button variant="outline" className="text-lg px-10 py-3">
                        Voltar para a página inicial
                    </Button>
                </Link>
            </div>
        </div>
    );
}