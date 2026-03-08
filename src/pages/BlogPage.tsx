import { useState, useMemo } from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import BlogCard, { type BlogCardData } from "@/components/BlogCard";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

// Common themes/labels across blog pages
const ALL_LABELS = [
  "Basics",
  "Benefits",
  "Breeder",
  "Cats",
  "Claims",
  "Comparison",
  "Costs",
  "Coverage",
  "Dogs",
  "Exclusions",
  "Pet Health",
  "Rescues",
  "Responsible",
  "Terminology",
  "Types",
];

const blogPosts: BlogCardData[] = [
  {
    title: "Pet Insurance 101 - Terminology",
    path: "/terminology",
    description:
      "Learn the essential pet insurance terms and definitions to help you make informed decisions about your pet's coverage. Understand deductibles, premiums, reimbursement rates, and more.",
    image: "/blog/blogpet1.webp",
    date: "January 1, 2026",
    labels: ["Terminology", "Basics", "Coverage"],
  },
  {
    title: "What is Pet Insurance and How It Works",
    path: "/blog/what-is-pet-insurance",
    description:
      "A comprehensive guide to understanding pet insurance, how it works, what it covers, and why it's important for your pet's health and your financial peace of mind.",
    image: "/blog/blogpet2.webp",
    date: "December 25, 2025",
    labels: ["Basics", "Coverage", "Benefits"],
  },
  {
    title: "Why Consider Pet Insurance",
    path: "/blog/why-consider-pet-insurance",
    description:
      "Discover the top reasons to consider pet insurance for your furry friend. Learn about the financial protection, peace of mind, and access to better veterinary care that insurance provides.",
    image: "/blog/blogpet3.webp",
    date: "December 18, 2025",
    labels: ["Benefits", "Pet Health", "Basics"],
  },
  {
    title: "How To Compare Pet Insurance Policies",
    path: "/blog/how-to-compare-pet-insurance-policies",
    description:
      "Learn how to effectively compare different pet insurance policies. Understand key factors like coverage limits, deductibles, reimbursement rates, and exclusions to find the best plan for your pet.",
    image: "/blog/blogpet4.webp",
    date: "December 11, 2025",
    labels: ["Comparison", "Coverage", "Basics"],
  },
  {
    title: "Understanding Pet Insurance Types",
    path: "/blog/understanding-pet-insurance-types",
    description:
      "Explore the different types of pet insurance available, including accident-only, accident & illness, and wellness plans. Find out which type best suits your pet's needs and your budget.",
    image: "/blog/blogpet5.webp",
    date: "December 6, 2025",
    labels: ["Types", "Coverage", "Comparison"],
  },
  {
    title: "Pet Insurance Exclusions and Work Arounds",
    path: "/blog/pet-insurance-exclusions",
    description:
      "Understand common pet insurance exclusions such as pre-existing conditions, breed-specific issues, and elective procedures. Learn strategies to work around these limitations.",
    image: "/blog/blogpet6.webp",
    date: "November 27, 2025",
    labels: ["Exclusions", "Coverage", "Pet Health"],
  },
  {
    title: "How Much Does Pet Insurance Cost",
    path: "/blog/how-much-does-pet-insurance-cost",
    description:
      "Get a breakdown of pet insurance costs, including factors that affect premiums like your pet's age, breed, location, and coverage level. Learn how to find affordable options.",
    image: "/blog/blogpet7.webp",
    date: "November 20, 2025",
    labels: ["Costs", "Comparison", "Basics"],
  },
  {
    title: "Pet Insurance for Dogs",
    path: "/blog/pet-insurance-dogs",
    description:
      "For many dog owners pet insurance is more than just a safety net. It’s a core part of responsible, long-term pet care planning. While no insurance plan is perfect (and coverage will vary by provider, breed, age, and policy terms), the rising costs of veterinary care make insurance an increasingly valuable tool to help manage both expected and unexpected expenses.",
    image: "/blog/blog_pet-insurance-dogs.jpg",
    date: "February 13, 2026",
    labels: ["Basics", "Coverage", "Costs", "Dogs"],
  },
  {
    title: "Pet Insurance for Cats",
    path: "/blog/pet-insurance-cats",
    description:
      "Pet insurance for cats may not be fun to shop for as a cozy cat bed or a fancy scratching post but it can be one of the most important investments in your cat’s health and longevity. For modest monthly premiums you gain a safety net that reduces financial stress when your cat needs serious care.",
    image: "/blog/blog_pet-insurance-cats.jpg",
    date: "February 28, 2026",
    labels: ["Basics", "Coverage", "Costs", "Cats"],
  },
  {
    title: "Rescues and Shelters",
    path: "/blog/pet-insurance-rescue-partners",
    description:
      "You should know your pet insurance options and what fits you and your newly adopted pet the best. As millennials and Gen Z’ers age and continue to responsibly adopt pets from rescues and shelters, one of the facets of sound personal financial behavior that gets overlooked in the modern age is the financial responsibility to your dog or cat – and for that, there’s PIPA Broker.",
    image: "/blog/blog_rescues-and-shelters.webp",
    date: "March 6, 2026",
    labels: ["Costs", "Rescues", "Responsible", "Shelter", "Breeder"],
  },
];

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const filteredPosts = useMemo(() => {
    return blogPosts
      .filter((post) => {
        // Filter by search query
        const matchesSearch =
          searchQuery === "" ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by selected labels
        const matchesLabels =
          selectedLabels.length === 0 ||
          selectedLabels.some((label) => post.labels.includes(label));

        return matchesSearch && matchesLabels;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, selectedLabels]);

  const toggleLabel = (label: string) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLabels([]);
  };

  const hasActiveFilters = searchQuery !== "" || selectedLabels.length > 0;

  return (
    <div className="bg-(--light-pink) min-h-screen pt-24">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col gap-8">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-(--primary-teal-dark) text-4xl md:text-5xl sansita-bold mb-4">
              Pet Insurance Resources
            </h1>
            <p className="text-(--text-dark) nunito-sans text-lg">
              Your guide to understanding and choosing the right pet insurance
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-(--primary-teal) w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-(--primary-teal) focus:border-(--primary-coral) focus:outline-none nunito-sans"
            />
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-(--primary-teal-dark) nunito-sans font-semibold">
                Filter by topic:
              </span>
              {ALL_LABELS.map((label) => (
                <button
                  key={label}
                  onClick={() => toggleLabel(label)}
                  className={cn(
                    "px-4 py-2 rounded-full nunito-sans font-semibold transition-colors duration-200",
                    selectedLabels.includes(label)
                      ? "bg-(--primary-teal) text-white"
                      : "bg-white text-(--primary-teal-dark) hover:bg-(--light-pink)",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="self-start flex items-center gap-2 px-4 py-2 rounded-full bg-(--primary-coral) text-white hover:bg-(--coral-light) transition-colors duration-200 nunito-sans font-semibold"
              >
                <X className="w-4 h-4" />
                Clear All Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          <div className="text-(--text-dark) nunito-sans">
            Showing {filteredPosts.length} of {blogPosts.length} articles
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.path}
                data={post}
                onLabelClick={toggleLabel}
              />
            ))}
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-(--text-dark) nunito-sans text-lg">
                No articles found matching your filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-3 rounded-full bg-(--primary-teal) text-white hover:bg-(--primary-teal-dark) transition-colors duration-200 nunito-sans font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
