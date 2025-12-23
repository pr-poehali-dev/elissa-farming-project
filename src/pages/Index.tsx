import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  weight: string;
  description: string;
}

interface Subscription {
  id: number;
  name: string;
  price: number;
  period: string;
  products: string[];
  weight: string;
  popular?: boolean;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cartCount, setCartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products: Product[] = [
    {
      id: 1,
      name: 'Мраморная говядина премиум',
      price: 2890,
      image: 'https://cdn.poehali.dev/projects/8f8528f2-4958-4f40-8f35-099e3f2052fc/files/26edd820-5da4-4000-bc82-b9d6a8aa44d3.jpg',
      category: 'Говядина',
      weight: '1 кг',
      description: 'Отборная мраморная говядина высшей категории'
    },
    {
      id: 2,
      name: 'Фермерская корзина "Семейная"',
      price: 4500,
      image: 'https://cdn.poehali.dev/projects/8f8528f2-4958-4f40-8f35-099e3f2052fc/files/a817a0ca-edad-408a-938d-160e9062403b.jpg',
      category: 'Корзины',
      weight: '5 кг',
      description: 'Набор премиальных фермерских продуктов для всей семьи'
    },
    {
      id: 3,
      name: 'Говяжья тушенка',
      price: 890,
      image: 'https://cdn.poehali.dev/projects/8f8528f2-4958-4f40-8f35-099e3f2052fc/files/26edd820-5da4-4000-bc82-b9d6a8aa44d3.jpg',
      category: 'Консервы',
      weight: '500 г',
      description: 'Домашняя тушенка из фермерской говядины'
    },
    {
      id: 4,
      name: 'Печеночный паштет',
      price: 650,
      image: 'https://cdn.poehali.dev/projects/8f8528f2-4958-4f40-8f35-099e3f2052fc/files/26edd820-5da4-4000-bc82-b9d6a8aa44d3.jpg',
      category: 'Консервы',
      weight: '300 г',
      description: 'Нежный паштет из свежей фермерской печени'
    }
  ];

  const subscriptions: Subscription[] = [
    {
      id: 1,
      name: 'Еженедельная подписка',
      price: 3900,
      period: 'в неделю',
      products: ['Мраморная говядина', 'Овощи', 'Молочные продукты'],
      weight: '3 кг'
    },
    {
      id: 2,
      name: 'Семейная подписка',
      price: 12500,
      period: 'в месяц',
      products: ['Мясо', 'Птица', 'Овощи', 'Молочка', 'Яйца'],
      weight: '15 кг',
      popular: true
    },
    {
      id: 3,
      name: 'Премиум подписка',
      price: 8900,
      period: 'раз в 2 недели',
      products: ['Премиальное мясо', 'Деликатесы', 'Сыры', 'Овощи'],
      weight: '7 кг'
    }
  ];

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Sprout" className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">Элисса</h1>
              <p className="text-xs text-muted-foreground">Фермерский дом</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setActiveSection('home')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Главная
            </button>
            <button 
              onClick={() => setActiveSection('catalog')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Каталог
            </button>
            <button 
              onClick={() => setActiveSection('subscriptions')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Корзины
            </button>
            <button 
              onClick={() => setActiveSection('delivery')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Доставка
            </button>
            <button 
              onClick={() => setActiveSection('blog')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Блог
            </button>
            <button 
              onClick={() => setActiveSection('reviews')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Отзывы
            </button>
            <button 
              onClick={() => setActiveSection('contacts')}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Icon name="Menu" size={24} />
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 text-center text-muted-foreground">
                  {cartCount === 0 ? 'Корзина пуста' : `Товаров в корзине: ${cartCount}`}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[300px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Icon name="Sprout" className="text-primary" size={24} />
              <span>Элисса</span>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-4 mt-8">
            <button 
              onClick={() => {
                setActiveSection('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="Home" size={20} />
              <span>Главная</span>
            </button>
            <button 
              onClick={() => {
                setActiveSection('catalog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="ShoppingBag" size={20} />
              <span>Каталог</span>
            </button>
            <button 
              onClick={() => {
                setActiveSection('subscriptions');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="Package" size={20} />
              <span>Корзины</span>
            </button>
            <button 
              onClick={() => {
                setActiveSection('delivery');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="Truck" size={20} />
              <span>Доставка</span>
            </button>
            <button 
              onClick={() => {
                setActiveSection('blog');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="BookOpen" size={20} />
              <span>Блог</span>
            </button>
            <button 
              onClick={() => {
                setActiveSection('reviews');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="Star" size={20} />
              <span>Отзывы</span>
            </button>
            <button 
              onClick={() => {
                setActiveSection('contacts');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-4 hover:bg-muted rounded-md transition-colors flex items-center gap-3"
            >
              <Icon name="Phone" size={20} />
              <span>Контакты</span>
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      <main>
        {activeSection === 'home' && (
          <>
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://cdn.poehali.dev/projects/8f8528f2-4958-4f40-8f35-099e3f2052fc/files/daffd0dc-5db7-4b67-9baf-1817a92f0f63.jpg)',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
              </div>
              <div className="container relative z-10 text-center animate-fade-in">
                <Badge className="mb-4 bg-accent text-accent-foreground">Доставка по Москве и МО</Badge>
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Премиальные<br />фермерские продукты
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Мраморная говядина, свежие овощи и молочные деликатесы с доставкой на дом
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setActiveSection('catalog')}
                  >
                    Перейти в каталог
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-white/10 backdrop-blur border-white/20 text-white hover:bg-white/20"
                    onClick={() => setActiveSection('subscriptions')}
                  >
                    Подписаться
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-20 bg-muted/30">
              <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <Card className="text-center border-none shadow-none bg-transparent animate-scale-in">
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Award" className="text-primary" size={32} />
                      </div>
                      <CardTitle className="text-2xl">Премиум качество</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Отборная мраморная говядина и продукты высшей категории
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center border-none shadow-none bg-transparent animate-scale-in" style={{ animationDelay: '0.1s' }}>
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Truck" className="text-primary" size={32} />
                      </div>
                      <CardTitle className="text-2xl">Быстрая доставка</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Доставляем свежие продукты в день заказа по Москве и МО
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center border-none shadow-none bg-transparent animate-scale-in" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Heart" className="text-primary" size={32} />
                      </div>
                      <CardTitle className="text-2xl">Натуральность</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        100% фермерские продукты без химии и добавок
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <section className="py-20">
              <div className="container">
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Популярные товары</h2>
                  <p className="text-muted-foreground text-lg">Отборные продукты нашей фермы</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div 
                        className="relative h-64 overflow-hidden cursor-pointer"
                        onClick={() => {
                          setSelectedProduct(product);
                          setProductDialogOpen(true);
                        }}
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                          {product.category}
                        </Badge>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <Icon name="Eye" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                          <span className="text-sm text-muted-foreground">{product.weight}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button 
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            setSelectedProduct(product);
                            setProductDialogOpen(true);
                          }}
                        >
                          Подробнее
                        </Button>
                        <Button 
                          className="flex-1" 
                          onClick={addToCart}
                        >
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'catalog' && (
          <section className="py-20">
            <div className="container">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Каталог продукции</h2>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="meat">Мясо</TabsTrigger>
                  <TabsTrigger value="preserves">Консервы</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all">
                        <div 
                          className="relative h-64 overflow-hidden cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setProductDialogOpen(true);
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Icon name="Eye" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                            <span className="text-sm text-muted-foreground">{product.weight}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductDialogOpen(true);
                            }}
                          >
                            Подробнее
                          </Button>
                          <Button className="flex-1" onClick={addToCart}>
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="meat">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.filter(p => p.category === 'Говядина' || p.category === 'Корзины').map((product) => (
                      <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all">
                        <div 
                          className="relative h-64 overflow-hidden cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setProductDialogOpen(true);
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Icon name="Eye" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                            <span className="text-sm text-muted-foreground">{product.weight}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductDialogOpen(true);
                            }}
                          >
                            Подробнее
                          </Button>
                          <Button className="flex-1" onClick={addToCart}>
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="preserves">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.filter(p => p.category === 'Консервы').map((product) => (
                      <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all">
                        <div 
                          className="relative h-64 overflow-hidden cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setProductDialogOpen(true);
                          }}
                        >
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                            <Icon name="Eye" className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl">{product.name}</CardTitle>
                          <CardDescription>{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                            <span className="text-sm text-muted-foreground">{product.weight}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                          <Button 
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setSelectedProduct(product);
                              setProductDialogOpen(true);
                            }}
                          >
                            Подробнее
                          </Button>
                          <Button className="flex-1" onClick={addToCart}>
                            <Icon name="ShoppingCart" size={16} className="mr-2" />
                            В корзину
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        )}

        {activeSection === 'subscriptions' && (
          <section className="py-20">
            <div className="container">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Подписки на фермерские корзины</h2>
                <p className="text-muted-foreground text-lg">Регулярная доставка свежих продуктов с экономией до 15%</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {subscriptions.map((sub) => (
                  <Card key={sub.id} className={`relative overflow-hidden ${sub.popular ? 'border-primary shadow-xl' : ''}`}>
                    {sub.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                        Популярная
                      </div>
                    )}
                    <CardHeader className="text-center pb-8 pt-8">
                      <CardTitle className="text-2xl mb-2">{sub.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold text-primary">{sub.price} ₽</span>
                        <span className="text-muted-foreground"> {sub.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">~{sub.weight} продуктов</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {sub.products.map((product, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Icon name="Check" className="text-primary" size={20} />
                            <span>{product}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Button 
                        className="w-full" 
                        variant={sub.popular ? 'default' : 'outline'}
                        onClick={() => {
                          setSelectedSubscription(sub);
                          setSubscriptionDialogOpen(true);
                        }}
                      >
                        Оформить подписку
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-16 max-w-3xl mx-auto">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Info" size={24} />
                      Преимущества подписки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1" size={20} />
                        <div>
                          <strong>Экономия до 15%</strong> по сравнению с разовыми покупками
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1" size={20} />
                        <div>
                          <strong>Гибкий график</strong> — выбирайте удобное время доставки
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1" size={20} />
                        <div>
                          <strong>Приоритетная доставка</strong> и возможность менять состав корзины
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <Icon name="Check" className="text-primary mt-1" size={20} />
                        <div>
                          <strong>Отмена в любой момент</strong> без штрафов и комиссий
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'delivery' && (
          <section className="py-20">
            <div className="container max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Доставка</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="MapPin" className="text-primary" />
                      География доставки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Мы доставляем свежие фермерские продукты по всей Москве и Московской области. 
                      Бесплатная доставка при заказе от 3000 рублей.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Clock" className="text-primary" />
                      Время доставки
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Доставка осуществляется ежедневно с 9:00 до 21:00. Вы можете выбрать удобный временной интервал при оформлении заказа.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={18} />
                        <span>Утренняя доставка: 9:00 - 12:00</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={18} />
                        <span>Дневная доставка: 12:00 - 15:00</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={18} />
                        <span>Вечерняя доставка: 18:00 - 21:00</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Package" className="text-primary" />
                      Упаковка
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Все продукты упакованы в экологичные материалы с соблюдением температурного режима. 
                      Мясо доставляется в термопакетах с хладагентами.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="CreditCard" className="text-primary" />
                      Оплата
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">Принимаем все удобные способы оплаты:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={18} />
                        <span>Наличными курьеру</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={18} />
                        <span>Банковской картой онлайн</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon name="Check" className="text-primary" size={18} />
                        <span>Картой курьеру при получении</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'blog' && (
          <section className="py-20">
            <div className="container">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Блог</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-muted" />
                  <CardHeader>
                    <CardTitle>Как выбрать мраморную говядину</CardTitle>
                    <CardDescription>15 декабря 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Разбираемся в степенях мраморности и делимся секретами выбора премиального мяса.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-muted" />
                  <CardHeader>
                    <CardTitle>Рецепты с фермерскими продуктами</CardTitle>
                    <CardDescription>10 декабря 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Топ-5 рецептов от наших шеф-поваров с использованием фермерских продуктов.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-muted" />
                  <CardHeader>
                    <CardTitle>О нашей ферме</CardTitle>
                    <CardDescription>5 декабря 2024</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      История фермерского дома Элисса и принципы работы с животными.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full">
                      Читать далее
                      <Icon name="ArrowRight" size={16} className="ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'reviews' && (
          <section className="py-20">
            <div className="container max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Отзывы</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Анна Петрова</CardTitle>
                        <CardDescription>Москва, Хамовники</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon key={star} name="Star" size={16} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Заказываю мраморную говядину уже полгода. Качество всегда на высоте, мясо невероятно нежное. 
                      Подписка очень удобная, можно менять состав корзины.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Михаил Соколов</CardTitle>
                        <CardDescription>Московская область, Одинцово</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon key={star} name="Star" size={16} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Открыл для себя фермерскую тушенку — это совершенно другой уровень! 
                      Доставка всегда вовремя, продукты упакованы отлично.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>Елена Волкова</CardTitle>
                        <CardDescription>Москва, Тверская</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon key={star} name="Star" size={16} className="fill-accent text-accent" />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Семейная подписка — находка для нашей большой семьи. Экономим время на походах в магазин, 
                      а продукты всегда свежие и вкусные.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {activeSection === 'contacts' && (
          <section className="py-20">
            <div className="container max-w-4xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Контакты</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Свяжитесь с нами</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-muted-foreground">info@elissa-farm.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Адрес</p>
                        <p className="text-muted-foreground">Московская область, деревня Фермерская</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" className="text-primary mt-1" size={20} />
                      <div>
                        <p className="font-medium">Время работы</p>
                        <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Напишите нам</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Имя</label>
                      <input 
                        type="text" 
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        placeholder="Ваше имя"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <input 
                        type="email" 
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Сообщение</label>
                      <textarea 
                        className="w-full mt-1 px-3 py-2 border rounded-md resize-none"
                        rows={4}
                        placeholder="Ваше сообщение"
                      />
                    </div>
                    <Button className="w-full">
                      Отправить сообщение
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Элисса</h3>
              <p className="text-sm opacity-90">
                Премиальные фермерские продукты с доставкой по Москве и МО
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>Мраморная говядина</li>
                <li>Птица</li>
                <li>Молочные продукты</li>
                <li>Консервы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>О компании</li>
                <li>Доставка и оплата</li>
                <li>Подписки</li>
                <li>Блог</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm opacity-90">
                <li>+7 (495) 123-45-67</li>
                <li>info@elissa-farm.ru</li>
                <li>Ежедневно 9:00-21:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-75">
            © 2024 Элисса - Фермерский дом. Все права защищены.
          </div>
        </div>
      </footer>

      <Dialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Оформление подписки</DialogTitle>
            <DialogDescription>
              {selectedSubscription?.name} — {selectedSubscription?.price} ₽ {selectedSubscription?.period}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Ваше имя</Label>
              <Input id="name" placeholder="Иван Иванов" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Адрес доставки</Label>
              <Input id="address" placeholder="Москва, ул. Примерная, д. 1, кв. 1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-time">Удобное время доставки</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите время" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Утро (9:00 - 12:00)</SelectItem>
                  <SelectItem value="afternoon">День (12:00 - 15:00)</SelectItem>
                  <SelectItem value="evening">Вечер (18:00 - 21:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-date">Дата первой доставки</Label>
              <Input id="start-date" type="date" />
            </div>
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-start gap-2 mb-2">
                <Icon name="Info" className="text-primary mt-0.5" size={16} />
                <p className="text-sm text-muted-foreground">
                  После оформления с вами свяжется наш менеджер для подтверждения заказа
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setSubscriptionDialogOpen(false)}
            >
              Отмена
            </Button>
            <Button 
              className="flex-1"
              onClick={() => {
                setSubscriptionDialogOpen(false);
                alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
              }}
            >
              Оформить подписку
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.name}</DialogTitle>
                <DialogDescription>{selectedProduct.category}</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 py-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Описание</h3>
                    <p className="text-muted-foreground">{selectedProduct.description}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Вес:</span>
                      <span className="font-medium">{selectedProduct.weight}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-muted-foreground">Категория:</span>
                      <Badge>{selectedProduct.category}</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Цена:</span>
                      <span className="text-3xl font-bold text-primary">{selectedProduct.price} ₽</span>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md space-y-2">
                    <div className="flex items-start gap-2">
                      <Icon name="Truck" className="text-primary mt-0.5" size={18} />
                      <p className="text-sm">Бесплатная доставка при заказе от 3000 ₽</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Shield" className="text-primary mt-0.5" size={18} />
                      <p className="text-sm">Гарантия качества и свежести</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Leaf" className="text-primary mt-0.5" size={18} />
                      <p className="text-sm">100% натуральный продукт</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      addToCart();
                      setProductDialogOpen(false);
                    }}
                  >
                    <Icon name="ShoppingCart" size={20} className="mr-2" />
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;