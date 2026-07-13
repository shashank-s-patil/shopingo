import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled }) {
  function renderInputsByComponentType(getControlItem) {
    const value = formData[getControlItem.name] || "";
    const commonStyle = {
      background: "var(--smoke)",
      border: "1px solid rgba(201,169,110,0.15)",
      borderRadius: "2px",
      color: "var(--cream)",
      fontFamily: "'Jost', sans-serif",
      fontWeight: 300,
      transition: "border-color 0.3s ease",
    };

    switch (getControlItem.componentType) {
      case "input":
        return (
          <input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            className="w-full px-4 py-3 text-sm outline-none input-luxury"
            style={commonStyle}
          />
        );
      case "select":
        return (
          <Select
            onValueChange={(val) => setFormData({ ...formData, [getControlItem.name]: val })}
            value={value}
          >
            <SelectTrigger
              className="w-full px-4 py-3 text-sm outline-none"
              style={{ ...commonStyle, height: "auto" }}
            >
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent style={{ background: "var(--charcoal)", border: "1px solid rgba(201,169,110,0.2)", borderRadius: "2px" }}>
              {getControlItem.options?.map((opt) => (
                <SelectItem
                  key={opt.id}
                  value={opt.id}
                  style={{ fontFamily: "'Jost', sans-serif", color: "var(--cream)", fontSize: "0.85rem" }}
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "textarea":
        return (
          <textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            rows={4}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            className="w-full px-4 py-3 text-sm outline-none resize-none input-luxury"
            style={commonStyle}
          />
        );
      default:
        return (
          <input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) => setFormData({ ...formData, [getControlItem.name]: e.target.value })}
            className="w-full px-4 py-3 text-sm outline-none input-luxury"
            style={commonStyle}
          />
        );
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-5">
        {formControls.map((controlItem) => (
          <div className="flex flex-col gap-2" key={controlItem.name}>
            <label
              htmlFor={controlItem.name}
              className="text-[0.65rem] tracking-widest uppercase"
              style={{ color: "var(--mist)", fontFamily: "'Jost', sans-serif", fontWeight: 500 }}
            >
              {controlItem.label}
            </label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <button
        disabled={isBtnDisabled}
        type="submit"
        className="btn-gold mt-8 w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ borderRadius: "2px" }}
      >
        {buttonText || "Submit"}
      </button>
    </form>
  );
}

export default CommonForm;
