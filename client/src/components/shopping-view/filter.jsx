import { filterOptions } from "@/config";
import { Fragment } from "react";
import { SlidersHorizontal } from "lucide-react";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div style={{ background: "var(--charcoal)", border: "1px solid rgba(201,169,110,0.1)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(201,169,110,0.1)" }}>
        <SlidersHorizontal className="w-3.5 h-3.5" style={{ color: "var(--gold)" }} />
        <h2 className="text-[0.65rem] tracking-widest uppercase font-medium" style={{ color: "var(--gold)", fontFamily: "'Jost', sans-serif" }}>
          Filters
        </h2>
      </div>

      <div className="p-5 space-y-6">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3
                className="text-[0.6rem] tracking-widest uppercase mb-4"
                style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
              >
                {keyItem}
              </h3>
              <div className="flex flex-col gap-2.5">
                {filterOptions[keyItem].map((option) => {
                  const isChecked = filters?.[keyItem]?.indexOf(option.id) > -1;
                  return (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer group"
                      onClick={() => handleFilter(keyItem, option.id)}
                    >
                      {/* Custom checkbox */}
                      <div
                        className="w-4 h-4 flex-shrink-0 flex items-center justify-center transition-all duration-300"
                        style={{
                          border: isChecked ? "1px solid var(--gold)" : "1px solid rgba(201,169,110,0.25)",
                          background: isChecked ? "linear-gradient(135deg, var(--gold-dark), var(--gold))" : "transparent",
                        }}
                      >
                        {isChecked && (
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                            <path d="M1 3L3 5L7 1" stroke="var(--obsidian)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="text-xs transition-colors duration-300"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          color: isChecked ? "var(--gold)" : "var(--mist)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {option.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
            <div style={{ height: "1px", background: "rgba(201,169,110,0.08)" }} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
