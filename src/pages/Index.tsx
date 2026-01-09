import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ValueCards from '@/components/ValueCards';
import ProductCatalog from '@/components/ProductCatalog';
import QuoteSidebar from '@/components/QuoteSidebar';
import FloatingQuoteButton from '@/components/FloatingQuoteButton';
import Footer from '@/components/Footer';
import { QuoteProvider } from '@/context/QuoteContext';

const Index = () => {
  return (
    <QuoteProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ValueCards />
          <ProductCatalog />
        </main>
        <Footer />
        <QuoteSidebar />
        <FloatingQuoteButton />
      </div>
    </QuoteProvider>
  );
};

export default Index;
