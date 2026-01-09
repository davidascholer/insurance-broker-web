import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export interface BlogCardData {
  title: string;
  path: string;
  description: string;
  image: string;
  date: string;
  labels: string[];
}

interface BlogCardProps {
  data: BlogCardData;
  onLabelClick: (label: string) => void;
  className?: string;
}

const BlogCard = ({ data, onLabelClick, className }: BlogCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer",
        className
      )}
      onClick={() => navigate(data.path)}
    >
      <div className="w-full h-64 overflow-hidden">
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <h3 className="text-(--primary-teal-dark) text-xl sansita-bold line-clamp-2">
          {data.title}
        </h3>
        <p className="text-(--text-dark) text-sm nunito-sans">
          {data.date}
        </p>
        <p className="text-(--text-dark) nunito-sans">
          {data.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.labels.map((label) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                onLabelClick(label);
              }}
              className="px-3 py-1 text-xs rounded-full bg-(--light-pink) text-(--primary-teal-dark) hover:bg-(--primary-teal) hover:text-white transition-colors duration-200 nunito-sans font-semibold"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
