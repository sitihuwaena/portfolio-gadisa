# Carousel Component Documentation

A modern, accessible, and highly customizable carousel component built with Embla Carousel and Tailwind CSS.

## Features

- 🎛️ **Fully Controlled**: Complete control over carousel behavior
- ♿ **Accessible**: Built with accessibility in mind (ARIA labels, keyboard navigation)
- 📱 **Responsive**: Works seamlessly across all device sizes
- 🎨 **Customizable**: Easy to style with Tailwind CSS
- 🔄 **Autoplay**: Optional autoplay functionality
- 📍 **Dots Navigation**: Clickable dots for direct navigation
- ⌨️ **Keyboard Support**: Arrow key navigation
- 🎭 **Multiple Variants**: Different carousel types for different use cases

## Installation

```bash
bun add embla-carousel-react embla-carousel-autoplay
```

## Basic Usage

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from "@/components/ui/carousel";

function BasicCarousel() {
  const items = [1, 2, 3, 4, 5];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{item}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselDots count={items.length} />
    </Carousel>
  );
}
```

## Autoplay Carousel

```tsx
import { AutoCarousel } from "@/components/ui/carousel";

function AutoplayCarousel() {
  return (
    <AutoCarousel
      autoplayDelay={3000} // 3 seconds
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {/* Your carousel items */}
      </CarouselContent>
      <CarouselDots count={5} />
    </AutoCarousel>
  );
}
```

## Advanced Configuration

```tsx
function AdvancedCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        skipSnaps: false,
        dragFree: true,
        containScroll: "trimSnaps",
      }}
      orientation="horizontal"
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            {/* Your content */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

## Pre-built Examples

We provide several pre-built carousel examples:

### Skills Carousel
Perfect for showcasing technical skills or technologies:

```tsx
import { SkillsCarousel } from "@/components/ui/carousel-examples";

const skills = [
  { id: 1, title: "React", image: "/react.png", category: "Frontend" },
  { id: 2, title: "Node.js", image: "/nodejs.png", category: "Backend" },
  // ...
];

<SkillsCarousel skills={skills} />
```

### Projects Carousel
Great for portfolio project showcases:

```tsx
import { ProjectsCarousel } from "@/components/ui/carousel-examples";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution...",
    image: "/project1.jpg",
    technologies: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/...",
  },
  // ...
];

<ProjectsCarousel projects={projects} />
```

### Testimonials Carousel
Perfect for client testimonials with autoplay:

```tsx
import { TestimonialsCarousel } from "@/components/ui/carousel-examples";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO",
    company: "Tech Corp",
    content: "Amazing work quality and professional service...",
    avatar: "/avatar1.jpg",
  },
  // ...
];

<TestimonialsCarousel testimonials={testimonials} />
```

## API Reference

### Carousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `opts` | `EmblaOptionsType` | `undefined` | Embla carousel options |
| `plugins` | `EmblaPluginType[]` | `[]` | Embla carousel plugins |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Carousel orientation |
| `setApi` | `(api: CarouselApi) => void` | `undefined` | Callback to get carousel API |

### AutoCarousel Props

Extends all Carousel props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoplayDelay` | `number` | `3000` | Autoplay delay in milliseconds |

### CarouselDots Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | - | Number of dots to display |

## Styling

The carousel components are built with Tailwind CSS and can be easily customized:

```tsx
// Custom button styles
<CarouselPrevious className="left-2 h-12 w-12 border-2 border-primary bg-primary/10 hover:bg-primary hover:text-white" />

// Custom dots
<CarouselDots 
  count={5} 
  className="mt-8"
  // Dots will automatically inherit the styling from the component
/>

// Custom item spacing
<CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
  {/* Your content */}
</CarouselItem>
```

## Accessibility

The carousel is built with accessibility in mind:

- ARIA labels and roles
- Keyboard navigation (Arrow keys)
- Screen reader friendly
- Focus management
- Proper semantic HTML

## Performance Tips

1. **Lazy Loading**: Use lazy loading for images in carousel items
2. **Optimize Images**: Ensure images are properly optimized
3. **Limit Items**: For large datasets, consider virtualization
4. **Autoplay**: Use autoplay sparingly and provide pause controls

## Examples in Portfolio

You can see these carousels in action in:
- Tech Stack page (`/tech-stack`) - Skills carousel
- Projects page (`/projects`) - Projects carousel  
- About page (`/about`) - Testimonials carousel

Happy coding! 🎠✨