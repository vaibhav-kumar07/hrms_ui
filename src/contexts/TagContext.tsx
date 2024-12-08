import React, { createContext, useContext, useState, useCallback } from "react";

export const tags = {
    Attendance: "ATTENDANCE",
    Employee: "EMPLOYEE",
    Candidate: "CANDIDATE",
    Leaves: "LEAVES",
} as const;

type TagKeys = keyof typeof tags;

interface TagContextType {
    isTagOn: (tag: TagKeys) => boolean;
    setTag: (tag: TagKeys) => void;
    clearTag: (tag: TagKeys) => void;
}

const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [tagState, setTagState] = useState(new Map<string, boolean>());

    // Check if a tag is on
    const isTagOn = useCallback(
        (tag: TagKeys) => {
            return tagState.get(tags[tag]) || false;
        },
        [tagState],
    );

    // Turn a tag ON
    const setTag = useCallback((tag: TagKeys) => {
        setTagState((prev) => new Map(prev).set(tags[tag], true));
    }, []);

    // Turn a tag OFF
    const clearTag = useCallback((tag: TagKeys) => {
        setTagState((prev) => new Map(prev).set(tags[tag], false));
    }, []);

    return (
        <TagContext.Provider value={{ isTagOn, setTag, clearTag }}>
            {children}
        </TagContext.Provider>
    );
};

export const useTagContext = (): TagContextType => {
    const context = useContext(TagContext);
    if (!context) {
        throw new Error("useTagContext must be used within a TagProvider");
    }
    return context;
};
