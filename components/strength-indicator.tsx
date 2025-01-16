import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StrengthIndicatorProps {
  strengthScore: number;
}

export function StrengthIndicator({ strengthScore }: StrengthIndicatorProps) {
  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-neutral-300 dark:bg-neutral-700";
    if (score <= 2) return "bg-red-500 dark:bg-red-700";
    if (score <= 3) return "bg-orange-500 dark:bg-orange-700";
    if (score <= 4) return "bg-amber-500 dark:bg-amber-700";
    if (score === 5) return "bg-lime-500 dark:bg-lime-700";
    return "bg-emerald-500 dark:bg-emerald-700";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Very weak password";
    if (score === 3) return "Weak password";
    if (score === 4) return "Medium password";
    if (score === 5) return "Strong password";
    return "Very strong password";
  };

  return (
    <>
      <motion.div
        className="h-2 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden"
        role="progressbar"
        aria-valuenow={strengthScore}
        aria-valuemin={0}
        aria-valuemax={6}
        aria-label="Password strength"
      >
        <motion.div
          className={cn("h-full", getStrengthColor(strengthScore))}
          style={{ width: `${(strengthScore / 6) * 100}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${(strengthScore / 6) * 100}%` }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        ></motion.div>
      </motion.div>
      <p className="text-sm font-medium text-neutral-900 dark:text-white">
        {getStrengthText(strengthScore)}
      </p>
    </>
  );
}

