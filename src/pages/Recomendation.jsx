import React, { useState, useEffect } from 'react';
import {
  Book,
  Star,
  TrendingUp,
  Heart,
  ExternalLink,
  Filter,
  Search,
  BookOpen,
  Award,
  Clock,
  Users,
  ShoppingCart,
  Bookmark,
  Share2,
  Eye,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Target,
  Zap
} from 'lucide-react';

import './Recommendation.css'; // Importando o CSS para estilos adicionais

const Recommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid');

  // Função para voltar à página anterior
  const handleGoBack = () => {
    window.history.back();
  };

  // Dados dos livros (você pode expandir isso)
  const books = [
    {
      id: 1,
      title: "Mindfulness: Como Encontrar a Paz em um Mundo Frenético",
      author: "Mark Williams",
      category: "mindfulness",
      rating: 4.8,
      price: "R$ 29,90",
      originalPrice: "R$ 39,90",
      discount: 25,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      description: "Um guia prático para incorporar mindfulness no dia a dia e encontrar paz interior.",
      bestseller: true,
      readTime: "6h",
      pages: 280,
      affiliateLink: "#",
      tags: ["meditação", "bem-estar", "autoajuda"]
    },
    {
      id: 2,
      title: "O Poder do Agora",
      author: "Eckhart Tolle",
      category: "espiritualidade",
      rating: 4.9,
      price: "R$ 34,90",
      originalPrice: "R$ 44,90",
      discount: 22,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "Uma jornada em direção à iluminação espiritual através da consciência do momento presente.",
      trending: true,
      readTime: "8h",
      pages: 336,
      affiliateLink: "#",
      tags: ["presente", "consciência", "transformação"]
    },
    {
      id: 3,
      title: "Hábitos Atômicos",
      author: "James Clear",
      category: "produtividade",
      rating: 4.7,
      price: "R$ 42,90",
      originalPrice: "R$ 54,90",
      discount: 22,
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
      description: "Como pequenas mudanças geram grandes resultados através do poder dos hábitos.",
      bestseller: true,
      readTime: "7h",
      pages: 320,
      affiliateLink: "#",
      tags: ["hábitos", "mudança", "crescimento"]
    },
    {
      id: 4,
      title: "A Arte da Meditação",
      author: "Matthieu Ricard",
      category: "mindfulness",
      rating: 4.6,
      price: "R$ 36,90",
      originalPrice: "R$ 49,90",
      discount: 26,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      description: "Aprenda as técnicas fundamentais da meditação com um dos maiores mestres do mundo.",
      readTime: "5h",
      pages: 240,
      affiliateLink: "#",
      tags: ["meditação", "técnicas", "prática"]
    },
    {
      id: 5,
      title: "Ikigai: A Razão de Viver",
      author: "Héctor García",
      category: "filosofia",
      rating: 4.5,
      price: "R$ 31,90",
      originalPrice: "R$ 39,90",
      discount: 20,
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=400&fit=crop",
      description: "Descubra seu propósito de vida através da filosofia japonesa do ikigai.",
      trending: true,
      readTime: "4h",
      pages: 208,
      affiliateLink: "#",
      tags: ["propósito", "filosofia", "vida"]
    },
    {
      id: 6,
      title: "Ansiedade: Como Enfrentar o Mal do Século",
      author: "Augusto Cury",
      category: "psicologia",
      rating: 4.4,
      price: "R$ 28,90",
      originalPrice: "R$ 36,90",
      discount: 22,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      description: "Estratégias práticas para superar a ansiedade e viver com mais tranquilidade.",
      readTime: "6h",
      pages: 256,
      affiliateLink: "#",
      tags: ["ansiedade", "saúde mental", "técnicas"]
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os Livros', icon: Book, count: books.length },
    { id: 'mindfulness', name: 'Mindfulness', icon: Target, count: books.filter(b => b.category === 'mindfulness').length },
    { id: 'produtividade', name: 'Produtividade', icon: Zap, count: books.filter(b => b.category === 'produtividade').length },
    { id: 'espiritualidade', name: 'Espiritualidade', icon: Sparkles, count: books.filter(b => b.category === 'espiritualidade').length },
    { id: 'psicologia', name: 'Psicologia', icon: Users, count: books.filter(b => b.category === 'psicologia').length },
    { id: 'filosofia', name: 'Filosofia', icon: BookOpen, count: books.filter(b => b.category === 'filosofia').length }
  ];

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'todos' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (bookId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookId)) {
      newFavorites.delete(bookId);
    } else {
      newFavorites.add(bookId);
    }
    setFavorites(newFavorites);
  };

  const bestsellers = books.filter(book => book.bestseller);
  const trending = books.filter(book => book.trending);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Botão de voltar */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-700 dark:text-gray-200"
        >
          <ChevronLeft size={20} />
          Voltar
        </button>
        {/* Header da página */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Recomendações Personalizadas
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Descubra Seus Próximos
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> Livros Favoritos</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Curadoria especial de livros sobre mindfulness, desenvolvimento pessoal e bem-estar. 
            Encontre sua próxima leitura transformadora.
          </p>
        </div>

        {/* Estatísticas rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="stats-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-indigo-600">150+</div>
            <div className="text-sm text-gray-600">Livros Curados</div>
          </div>
          <div className="stats-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.8★</div>
            <div className="text-sm text-gray-600">Avaliação Média</div>
          </div>
          <div className="stats-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-pink-600">25%</div>
            <div className="text-sm text-gray-600">Desconto Médio</div>
          </div>
          <div className="stats-card rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1.2M</div>
            <div className="text-sm text-gray-600">Leitores Felizes</div>
          </div>
        </div>

        {/* Categorias */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-card p-4 rounded-xl text-center cursor-pointer ${
                  selectedCategory === category.id
                    ? 'active text-white'
                    : 'bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700'
                }`}
              >
                <category.icon size={24} className="mx-auto mb-2" />
                <div className="font-medium text-sm">{category.name}</div>
                <div className="text-xs opacity-70 mt-1">{category.count} livros</div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Destaques */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Bestsellers */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-yellow-500" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Bestsellers</h3>
            </div>
            <div className="space-y-3">
              {bestsellers.slice(0, 3).map((book) => (
                <div key={book.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800 dark:text-white">{book.title}</div>
                    <div className="text-xs text-gray-500">{book.author}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="text-yellow-400" size={12} fill="currentColor" />
                      <span className="text-xs text-gray-600">{book.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{book.price}</div>
                    <div className="text-xs text-gray-400 line-through">{book.originalPrice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Em Alta */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-orange-500" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Em Alta</h3>
            </div>
            <div className="space-y-3">
              {trending.slice(0, 3).map((book) => (
                <div key={book.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800 dark:text-white">{book.title}</div>
                    <div className="text-xs text-gray-500">{book.author}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="text-yellow-400" size={12} fill="currentColor" />
                      <span className="text-xs text-gray-600">{book.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600">{book.price}</div>
                    <div className="text-xs text-gray-400 line-through">{book.originalPrice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de livros */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {selectedCategory === 'todos' ? 'Todos os Livros' : categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'livro encontrado' : 'livros encontrados'}
            </div>
          </div>

          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'grid-cols-1'
          }`}>
            {filteredBooks.map((book) => (
              <div key={book.id} className="book-card bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {book.discount && (
                      <div className="discount-badge text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{book.discount}%
                      </div>
                    )}
                    {book.bestseller && (
                      <div className="bestseller-badge text-white text-xs font-bold px-2 py-1 rounded-full">
                        <Award size={12} className="inline mr-1" />
                        Bestseller
                      </div>
                    )}
                    {book.trending && (
                      <div className="trending-badge text-white text-xs font-bold px-2 py-1 rounded-full">
                        <TrendingUp size={12} className="inline mr-1" />
                        Em Alta
                      </div>
                    )}
                  </div>

                  {/* Botão de favorito */}
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="absolute top-3 right-3 p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={18}
                      className={favorites.has(book.id) ? 'text-red-500 fill-current' : 'text-gray-400'}
                    />
                  </button>

                  {/* Badge de afiliado */}
                  <div className="affiliate-badge absolute bottom-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Link Afiliado
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-2 mb-1">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">por {book.author}</p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {book.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {book.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Info do livro */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {book.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={12} />
                      {book.pages}p
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400" size={12} fill="currentColor" />
                      {book.rating}
                    </div>
                  </div>

                  {/* Preços */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{book.price}</div>
                      {book.originalPrice && (
                        <div className="text-sm text-gray-400 line-through">{book.originalPrice}</div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Economia de</div>
                      <div className="text-lg font-bold text-orange-500">
                        R$ {(parseFloat(book.originalPrice.replace('R$ ', '').replace(',', '.')) - 
                             parseFloat(book.price.replace('R$ ', '').replace(',', '.'))).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    <a
                      href={book.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <ShoppingCart size={18} />
                      Comprar Agora
                      <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                      <Share2 size={18} className="text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                      <Eye size={18} className="text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer com informações sobre afiliados */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">💡 Programa de Afiliados</h3>
            <p className="text-indigo-100 mb-4">
              Todos os links para compra são links de afiliado. Ao comprar através deles, você nos ajuda a manter 
              este serviço gratuito e de qualidade, sem nenhum custo adicional para você!
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Preços sempre atualizados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Links verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span>Melhor custo-benefício</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;