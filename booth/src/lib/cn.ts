import { extendTailwindMerge } from 'tailwind-merge'

// Custom typography tokens must be recognized as sizes, not text colors.
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['caption', 'label', 'body', 'section', 'page'] }],
    },
  },
})
export function cn(...values: (string | false | null | undefined)[]) {
  return merge(values.filter(Boolean).join(' '))
}
