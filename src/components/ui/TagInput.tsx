'use client';

import { useState, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TagInputProps {
    placeholder?: string;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
}

export function TagInput({ placeholder = "Add a skill...", tags, onTagsChange }: TagInputProps) {
    const [input, setInput] = useState('');

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const trimmedInput = input.trim().replace(/,/g, '');
            if (trimmedInput && !tags.includes(trimmedInput)) {
                onTagsChange([...tags, trimmedInput]);
                setInput('');
            }
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            onTagsChange(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove: string) => {
        onTagsChange(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 mb-2 min-h-[32px]">
                <AnimatePresence>
                    {tags.map(tag => (
                        <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-blue-500/20 text-blue-200 border border-blue-500/30 rounded-full px-3 py-1 text-sm flex items-center gap-2"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="hover:text-white transition-colors focus:outline-none"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.span>
                    ))}
                </AnimatePresence>
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tags.length === 0 ? placeholder : "Add another..."}
                className="input-primary"
            />
        </div>
    );
}
