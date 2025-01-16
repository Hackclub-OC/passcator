import { useState } from 'react';

export interface PasswordRequirement {
  regex: (password: string) => boolean;
  text: string;
  enabled: boolean;
}

export function usePasswordRequirements() {
  const currentYear = new Date().getFullYear();
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const currencySymbols = ['$', '€', '£', '¥', '₹'];
  const continentsAndOceans = ['africa', 'antarctica', 'asia', 'australia', 'europe', 'north america', 'south america', 'arctic', 'atlantic', 'indian', 'pacific', 'southern'];
  const emojis = ['😀', '🎉', '❤️', '🌟', '🍕', '🐱', '🌈', '🚀'];

  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { regex: (password) => password.length >= 12, text: "At least 12 characters", enabled: true },
    { regex: (password) => /[0-9]/.test(password), text: "At least 1 number", enabled: true },
    { regex: (password) => /[a-z]/.test(password), text: "At least 1 lowercase letter", enabled: true },
    { regex: (password) => /[A-Z]/.test(password), text: "At least 1 uppercase letter", enabled: true },
    { regex: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), text: "At least 1 special character", enabled: true },
    { regex: (password) => !/(.)\1{2}/.test(password), text: "No more than 2 repeated characters in a row", enabled: true },
    { regex: (password) => password.includes(currentYear.toString()), text: `Include current year (${currentYear})`, enabled: true },
    { regex: (password) => new RegExp(months.join('|'), 'i').test(password), text: "Include a month name (Jan to Dec)", enabled: true },
    { regex: (password) => new RegExp(days.join('|'), 'i').test(password), text: "Include a day name (Mon to Sun)", enabled: true },
    { regex: (password) => new RegExp(`[${currencySymbols.join('')}]`).test(password), text: "Include a currency symbol ($, €, £, ¥, ₹)", enabled: true },
    { regex: (password) => {
        const numbers = password.match(/\d+/g);
        return numbers ? numbers.reduce((sum, num) => sum + parseInt(num), 0) === 25 : false;
      }, text: "Numbers add up to 25", enabled: true },
    { regex: (password) => {
        const numbers = password.match(/\d+/g);
        return numbers ? numbers.reduce((product, num) => product * parseInt(num), 1) === 40 : false;
      }, text: "Product of numbers is 40", enabled: true },
    { regex: (password) => new RegExp(continentsAndOceans.join('|'), 'i').test(password), text: "Include a continent or ocean name", enabled: true },
    { regex: (password) => new RegExp(emojis.join('|')).test(password), text: "Include an emoji (😀, 🎉, ❤️, 🌟, 🍕, 🐱, 🌈, 🚀)", enabled: true },
    { regex: (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/.test(password), text: "Combination of uppercase, lowercase, number, and special character", enabled: true },
    { regex: (password) => /(.)\1/.test(password), text: "Contains at least one repeated character", enabled: true },
    { regex: (password) => /^(?:(?!password|123456|qwerty).)*$/i.test(password), text: "Doesn't contain common weak passwords", enabled: true },
    { regex: (password) => /^(?=.*[aeiou])(?=.*[bcdfghjklmnpqrstvwxyz]).*$/i.test(password), text: "Contains both vowels and consonants", enabled: true },
    { regex: (password) => /(\w)\1{2,}/.test(password), text: "Contains a triple letter", enabled: true },
    { regex: (password) => /\d{3}-\d{3}-\d{4}/.test(password), text: "Includes a phone number pattern (e.g., 123-456-7890)", enabled: true },
  ]);

  const toggleRequirement = (index: number) => {
    setRequirements((prev) =>
      prev.map((req, i) => (i === index ? { ...req, enabled: !req.enabled } : req))
    );
  };

  return { requirements, toggleRequirement };
}

