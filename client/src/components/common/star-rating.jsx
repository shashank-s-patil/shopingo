import { StarIcon } from "lucide-react";

function StarRatingComponent({ rating, handleRatingChange }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          className={handleRatingChange ? "cursor-pointer" : "cursor-default"}
          style={{ background: "none", border: "none", padding: "2px" }}
        >
          <StarIcon
            className="w-4 h-4 transition-colors duration-200"
            style={{
              fill: star <= rating ? "var(--gold)" : "transparent",
              color: star <= rating ? "var(--gold)" : "rgba(201,169,110,0.3)",
            }}
          />
        </button>
      ))}
    </div>
  );
}

export default StarRatingComponent;
