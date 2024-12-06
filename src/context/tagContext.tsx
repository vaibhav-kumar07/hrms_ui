import React, { createContext, useState, useContext, ReactNode } from "react";

// Context to manage tags
interface TagContextType {
    tags: Record<string, boolean>;
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
}

// Updated the TagProvider to accept children as a prop
interface TagProviderProps {
    children: ReactNode;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider: React.FC<TagProviderProps> = ({ children }) => {
    const [tags, setTags] = useState<Record<string, boolean>>({});

    const addTag = (tag: string) => {
        setTags((prevTags) => ({ ...prevTags, [tag]: true }));
    };

    const removeTag = (tag: string) => {
        setTags((prevTags) => {
            const newTags = { ...prevTags };
            delete newTags[tag];
            return newTags;
        });
    };

    return (
        <TagContext.Provider value={{ tags, addTag, removeTag }}>
            {children}
        </TagContext.Provider>
    );
};

// Hook to use the context
export const useTagContext = () => {
    const context = useContext(TagContext);
    if (!context) {
        throw new Error("useTagContext must be used within TagProvider");
    }
    return context;
};
