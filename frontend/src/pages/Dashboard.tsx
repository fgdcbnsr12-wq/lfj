import React, { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, Eye, Activity, LogOut, Home, Settings, Heart, Sparkles, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePosts } from '@/hooks/usePosts';
import { useEvents } from '@/hooks/useEvents';
import { useWishlist } from '@/hooks/useWishlist';
import { useContentContinuation } from '@/hooks/useContentContinuation';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { items: savedWishlistItems } = useWishlist();
  const { history } = useContentContinuation();
  const { data: postsData } = usePosts({ perPage: 5 });
  const { data: eventsData } = useEvents({ perPage: 5 });

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const postData = [
    { name: 'Jan', posts: 4 },
    { name: 'Feb', posts: 7 },
    { name: 'Mar', posts: 5 },
    { name: 'Apr', posts: 8 },
    { name: 'May', posts: 12 },
    { name: 'Jun', posts: 9 },
  ];

  const visitorsData = [
    { name: 'Jan', visitors: 14020 },
    { name: 'Feb', visitors: 17580 },
    { name: 'Mar', visitors: 13890 },
    { name: 'Apr', visitors: 20490 },
    { name: 'May', visitors: 24950 },
    { name: 'Jun', visitors: 22430 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const recommendationCards = useMemo(() => {
    const fromHistory = history.slice(0, 3);
    const fallback = [
      {
        title: 'Trending wedding jewelry',
        path: '/shop',
        subtitle: 'See our latest statement pieces',
      },
      {
        title: 'Editor picks for gifting',
        path: '/blog',
        subtitle: 'Curated giftable styling stories',
      },
      {
        title: 'Upcoming showcase nights',
        path: '/events',
        subtitle: 'Be first to book your seat',
      },
    ];

    return fromHistory.length > 0
      ? fromHistory.map((item) => ({
          title: item.title,
          path: item.path,
          subtitle: item.subtitle || 'Continue where you left off',
        }))
      : fallback;
  }, [history]);

  const statsCards = [
    {
      title: 'Wishlist Items',
      value: String(savedWishlistItems.length),
      change: savedWishlistItems.length > 0 ? 'Saved for later' : 'No saves yet',
      positive: true,
      icon: Heart,
      color: 'text-pink-500'
    },
    {
      title: 'Posts Read',
      value: '142',
      change: '+12 from last month',
      positive: true,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      title: 'Events Attended',
      value: '8',
      change: '+1 this month',
      positive: true,
      icon: Activity,
      color: 'text-purple-500'
    },
    {
      title: 'Recommendations',
      value: '5',
      change: '+1 new',
      positive: true,
      icon: Eye,
      color: 'text-orange-500'
    }
  ];

  const recentPosts = postsData?.data?.slice(0, 5) || [];
  const recentEvents = eventsData?.data?.slice(0, 5) || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Button
              variant="ghost"
              className="text-lg font-playfair font-bold"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5 mr-2" />
              Latest Fashion Jewellery
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="text-sm">{user?.name}</div>
                  <div className="text-xs text-muted-foreground">{user?.roles?.join(', ')}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/blog')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Browse Content
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/events')}>
                  <Activity className="w-4 h-4 mr-2" />
                  Events
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground text-lg">Here's what's happening in the jewellery world today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    </div>
                    <div className={`p-2 rounded-full bg-gray-100 ${stat.color}`}>
                      <Icon size={20} />
                    </div>
                  </div>
                  <p className={`text-xs mt-2 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Personalized recommendations
            </CardTitle>
            <CardDescription>Based on what you have viewed recently and saved for later.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {recommendationCards.map((item) => (
                <Link key={item.title} to={item.path} className="rounded-xl border p-4 hover:bg-muted/40 transition-colors">
                  <p className="font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-xs text-muted-foreground mb-3">{item.subtitle}</p>
                  <span className="inline-flex items-center text-xs text-primary">
                    Open now <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts and Activity Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts Trending</TabsTrigger>
            <TabsTrigger value="visitors">Visitor Activity</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Posts Chart */}
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Blog Posts This Year</CardTitle>
                <CardDescription>Number of posts published each month</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={postData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="posts" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Visitors Chart */}
          <TabsContent value="visitors">
            <Card>
              <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription>Monthly visitor count trend</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={visitorsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="visitors" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Feed */}
          <TabsContent value="activity">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                  <CardDescription>Latest content from the community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.length > 0 ? (
                      recentPosts.map((post: any) => (
                        <div key={post.id} className="border-l-2 border-primary pl-4 py-2">
                          <h4 className="font-medium truncate cursor-pointer hover:text-primary">{post.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            By {post.author?.name} â€¢ {post.published_at_formatted}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No posts yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Don't miss these jewellery events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentEvents.length > 0 ? (
                      recentEvents.map((event: any) => (
                        <div key={event.id} className="border-l-2 border-primary pl-4 py-2">
                          <h4 className="font-medium truncate cursor-pointer hover:text-primary">{event.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            ðŸ“ {event.location_name}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No events scheduled</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Jump to your favorite sections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="w-full" onClick={() => navigate('/blog')}>
                <FileText className="w-4 h-4 mr-2" />
                Blog
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/shop')}>
                ðŸ’
                Shop
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/events')}>
                <Activity className="w-4 h-4 mr-2" />
                Events
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/tools')}>
                <Settings className="w-4 h-4 mr-2" />
                Tools
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
