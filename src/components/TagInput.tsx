import { useState, type FC } from 'react';

export interface TagInputProps {}

export const TagInput: FC<TagInputProps> = () => {
  const [tags, setTags] = useState(new Set<string>());
  const [input, setInput] = useState('');

  return (
    <div data-type="tags">
      {Array.from(tags.values()).map((tag) => (
        <div role="tag" key={tag}>
          <span>{tag}</span>
          <button
            onClick={() => {
              void tags.delete(tag);

              setTags(new Set(tags));
            }}
          >
            x
          </button>
        </div>
      ))}
      <input
        onKeyDown={(e) => {
          if ([' ', 'Enter'].includes(e.key)) {
            const tag = input.trim();
            if (tag !== '') {
              setTags(new Set(tags.add(tag)));
              setInput('');
              e.currentTarget.value = '';
            }
          } else if (e.key === 'Backspace') {
            if (input === '') {
              const tagsArray = Array.from(tags.values());
              const lastTag = tagsArray[tagsArray.length - 1];

              if (lastTag !== undefined) {
                void tags.delete(lastTag);
                setTags(new Set(tags));
              }
            }
          }
        }}
        onInput={(e) => setInput(e.currentTarget.value)}
      />
    </div>
  );
};
