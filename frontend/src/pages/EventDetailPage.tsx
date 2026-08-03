import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useEvent, useEvents } from "@/hooks/useEvents";
import { useContentContinuation } from '@/hooks/useContentContinuation';
import SeoHead from "@/components/seo/SeoHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

// --- Reusable Components ---
import EventDetailSkeletonContent from "@/components/skeletons/EventDetailSkeletonContent";
import EventCard from "@/components/events/EventCard";
import RandomProductSection from "@/components/products/RandomProductSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays as CalendarDaysIcon,
  MapPinIcon,
  ExternalLinkIcon,
  ArrowLeftIcon,
} from "lucide-react";
import { parseISO, isPast } from "date-fns";

const EventDetailPage: React.FC = () => {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const { markVisited } = useContentContinuation();

  const { data: event, isLoading, isError, error } = useEvent(eventSlug);

  useEffect(() => {
    if (!event) {
      return;
    }

    markVisited({
      kind: 'event',
      title: event.title,
      path: `/events/${event.slug}`,
      slug: event.slug,
      subtitle: event.location_name || 'Explore this event',
      imageUrl: event.featured_image_url || null,
      visitedAt: new Date().toISOString(),
    });
  }, [event, markVisited]);
  const { data: relatedEvents, isLoading: areRelatedLoading } = useEvents(
    { limit: 3, exclude: eventSlug },
    { enabled: !!event }
  );

  if (isLoading) {
    return <EventDetailSkeletonContent />;
  }

  if (isError || !event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold font-playfair">Event Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          {(error as Error)?.message ||
            "The event you're looking for doesn't exist."}
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/events">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back to All Events
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <SeoHead
        seo={event.seo}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title, href: `/events/${event.slug}` },
        ]}
        heroImageUrl={event.featured_image_url}
      />

      {/* Main Article Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <article>
            <div className="mb-8">
              <Breadcrumbs crumbs={[
                { label: "Home", href: "/" },
                { label: "Events", href: "/events" },
                { label: event.title, href: `/events/${event.slug}` },
              ]} />
              <Link
                to="/events"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary-gold"
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" /> Back to All Events
              </Link>
            </div>
            <header className="mb-8 md:mb-10 text-center">
              <Badge
                variant={
                  isPast(parseISO(event.start_datetime_iso))
                    ? "secondary"
                    : "default"
                }
                className="mb-4"
              >
                {isPast(parseISO(event.start_datetime_iso))
                  ? "Past Event"
                  : "Upcoming"}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-dark-slate !mb-4 leading-tight">
                {event.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted-foreground mt-4 text-md">
                <div className="flex items-center">
                  <CalendarDaysIcon className="w-5 h-5 mr-2 text-primary-gold" />
                  <time dateTime={event.start_datetime_iso}>{event.start_datetime_formatted}</time>
                </div>
                {event.location_name && (
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-primary-gold" />
                    <span>{event.location_name}</span>
                  </div>
                )}
              </div>
            </header>

            {event.featured_image_url && (
              <figure className="my-8 md:my-10 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={event.featured_image_url}
                  alt={`${event.title} event image`}
                  className="w-full h-auto object-cover aspect-video"
                  loading="eager"
                  fetchPriority="high"
                  width={1200}
                  height={675}
                 onError={(event) => { event.currentTarget.src = "/images/placeholder.svg"; }} />
              </figure>
            )}

            <div
              className="prose lg:prose-lg max-w-none mx-auto"
              dangerouslySetInnerHTML={{ __html: event.description_html }}
            />

            {event.event_url && (
              <div className="mt-10 text-center">
                <Button asChild size="lg">
                  <a
                    href={event.event_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Event Website{" "}
                    <ExternalLinkIcon className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </article>

          {/* --- NEW PRODUCT SECTION --- */}
          <div className="my-16 md:my-20 pt-16 border-t border-gray-200">
            <RandomProductSection
              title="Complete Your Event Look"
              limit={3}
              // This unique ID ensures different products are fetched for different event pages
              sectionId={`event-products-${event.slug}`}
            />
          </div>
        </div>
      </div>

      {/* Related Events Section */}
      {!areRelatedLoading && relatedEvents && relatedEvents.data.length > 0 && (
        <section className="bg-soft-cream py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-center text-dark-slate mb-10">
              Other Events You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {relatedEvents.data.map((relatedEvent) => (
                <EventCard key={relatedEvent.id} event={relatedEvent} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EventDetailPage;
