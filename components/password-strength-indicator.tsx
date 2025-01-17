"use client";

import { useState, useId, useMemo } from "react";
import { Eye, Check, X, Sun, Moon, Laptop } from "lucide-react";
import EyeOff from "@/components/ui/eye-off";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  usePasswordRequirements,
  PasswordRequirement,
} from "./password-requirements";
import { StrengthIndicator } from "./strength-indicator";

export default function PasswordStrengthIndicator() {
  const id = useId();
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { theme = 'system', setTheme } = useTheme();
  const { requirements, toggleRequirement } = usePasswordRequirements();

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const checkStrength = (pass: string) => {
    return requirements.map((req) => ({
      met: req.enabled ? req.regex(pass) : true,
      text: req.text,
      enabled: req.enabled,
    }));
  };

  const strength = checkStrength(password);

  const strengthScore = useMemo(() => {
    const enabledRequirements = requirements.filter((req) => req.enabled);
    const metRequirements = strength.filter((req) => req.met && req.enabled);
    return Math.floor(
      (metRequirements.length / enabledRequirements.length) * 6
    );
  }, [strength, requirements]);

  const switchThemeIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-[1.2rem] w-[1.2rem]" />;
      case "light":
        return <Sun className="h-[1.2rem] w-[1.2rem]" />;
      default:
        return <Laptop className="h-[1.2rem] w-[1.2rem]" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto my-8 border-t border-b md:border-x bg-white dark:bg-black">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
          Password Strength Indicator
        </CardTitle>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              {switchThemeIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <div className="grid gap-4">
              {/* <h4 className="font-medium leading-none">Choose theme</h4> */}
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="mr-1 h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="mr-1 h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme("system")}
                >
                  <Laptop className="mr-1 h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor={id}>Password</Label>
          <div className="relative">
            <Input
              id={id}
              className="pr-10 bg-white dark:bg-neutral-800 dark:text-white"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={strengthScore < 6}
              aria-describedby={`${id}-description`}
            />
            <motion.button
              className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label={isVisible ? "Hide password" : "Show password"}
              aria-pressed={isVisible}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isVisible ? "visible" : "hidden"}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 180 }}
                  transition={{ duration: 0.2 }}
                >
                  {isVisible ? <EyeOff /> : <Eye size={20} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        <StrengthIndicator strengthScore={strengthScore} />

        <div className="space-y-2">
          <p className="text-sm font-medium text-neutral-900 dark:text-white">
            Password requirements:
          </p>
          <ul className="space-y-1" aria-label="Password requirements">
            {strength.map((req, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-between gap-2 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={req.met ? "check" : "x"}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                    >
                      {req.met ? (
                        <Check
                          size={16}
                          className="text-emerald-500 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          size={16}
                          className="text-neutral-500 dark:text-neutral-400"
                          aria-hidden="true"
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <span
                    className={cn(
                      req.met
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-neutral-700 dark:text-neutral-300"
                    )}
                  >
                    {req.text}
                    <span className="sr-only">
                      {req.met
                        ? " - Requirement met"
                        : " - Requirement not met"}
                    </span>
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRequirement(index)}
                  aria-label={`Toggle ${req.text.toLowerCase()} requirement`}
                >
                  {req.enabled ? "Disable" : "Enable"}
                </Button>
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
