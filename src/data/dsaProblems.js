/**
 * Mock DSA problems for the DSA Tracker page.
 *
 * We display ~25 interactive problems in the list.
 * The stats header shows totals for ALL problems (142 / 250 solved).
 * "Baseline" counts represent problems already solved outside this list
 * so that the derived totals (baseline + list solved) match the Overview.
 */

export const TOTAL_PROBLEMS = 250;

/**
 * Baseline solved counts — these represent solved problems NOT shown
 * in the interactive list below. The displayed totals are computed as:
 *   baseline[difficulty] + (solved problems in list for that difficulty)
 */
export const baselineSolved = {
  Easy:   72,   // 72 + 10 solved easy in list = 82
  Medium: 47,   // 47 + 6 solved medium in list = 53
  Hard:   6,    // 6 + 1 solved hard in list = 7
};

export const initialProblems = [
  // ── Easy (10 solved, 2 unsolved) ───────────────────
  { id: 1,  title: 'Two Sum',                           difficulty: 'Easy',   topic: 'Arrays',               solved: true,  description: 'Given an array of integers, return the indices of the two numbers such that they add up to a specific target.', link: 'https://leetcode.com/problems/two-sum/', notes: '' },
  { id: 2,  title: 'Valid Parentheses',                  difficulty: 'Easy',   topic: 'Stack',                solved: true,  description: 'Determine if a string of brackets is valid — every open bracket must be closed in the correct order.', link: 'https://leetcode.com/problems/valid-parentheses/', notes: '' },
  { id: 3,  title: 'Binary Tree Inorder Traversal',      difficulty: 'Easy',   topic: 'Trees',                solved: true,  description: 'Return the inorder traversal of a binary tree as a list of node values.', link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/', notes: '' },
  { id: 4,  title: 'Merge Two Sorted Lists',             difficulty: 'Easy',   topic: 'Linked List',          solved: true,  description: 'Merge two sorted linked lists into one sorted list by splicing nodes together.', link: 'https://leetcode.com/problems/merge-two-sorted-lists/', notes: '' },
  { id: 5,  title: 'Best Time to Buy and Sell Stock',     difficulty: 'Easy',   topic: 'Arrays',               solved: true,  description: 'Find the maximum profit from a single buy-then-sell transaction given daily stock prices.', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', notes: '' },
  { id: 6,  title: 'Valid Anagram',                      difficulty: 'Easy',   topic: 'Strings',              solved: true,  description: 'Determine if one string is an anagram of another by comparing character frequencies.', link: 'https://leetcode.com/problems/valid-anagram/', notes: '' },
  { id: 7,  title: 'Maximum Depth of Binary Tree',       difficulty: 'Easy',   topic: 'Trees',                solved: true,  description: 'Find the maximum depth (number of nodes on the longest root-to-leaf path) of a binary tree.', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', notes: '' },
  { id: 8,  title: 'Climbing Stairs',                   difficulty: 'Easy',   topic: 'Dynamic Programming',  solved: true,  description: 'Count the number of distinct ways to climb n stairs when you can take 1 or 2 steps at a time.', link: 'https://leetcode.com/problems/climbing-stairs/', notes: '' },
  { id: 9,  title: 'Reverse Linked List',               difficulty: 'Easy',   topic: 'Linked List',          solved: true,  description: 'Reverse a singly linked list iteratively or recursively.', link: 'https://leetcode.com/problems/reverse-linked-list/', notes: '' },
  { id: 10, title: 'Contains Duplicate',                difficulty: 'Easy',   topic: 'Arrays',               solved: true,  description: 'Return true if any value appears at least twice in the array.', link: 'https://leetcode.com/problems/contains-duplicate/', notes: '' },
  { id: 11, title: 'Symmetric Tree',                    difficulty: 'Easy',   topic: 'Trees',                solved: false, description: 'Check whether a binary tree is a mirror of itself around its center.', link: 'https://leetcode.com/problems/symmetric-tree/', notes: '' },
  { id: 12, title: 'Implement Queue using Stacks',      difficulty: 'Easy',   topic: 'Stack',                solved: false, description: 'Implement a FIFO queue using only two stacks with push, pop, peek, and empty operations.', link: 'https://leetcode.com/problems/implement-queue-using-stacks/', notes: '' },

  // ── Medium (6 solved, 4 unsolved) ──────────────────
  { id: 13, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Strings',              solved: false, description: 'Find the length of the longest substring that contains no repeated characters using a sliding window.', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', notes: '' },
  { id: 14, title: 'Coin Change',                       difficulty: 'Medium', topic: 'Dynamic Programming',  solved: true,  description: 'Find the fewest number of coins needed to make up a given amount, or return -1 if not possible.', link: 'https://leetcode.com/problems/coin-change/', notes: '' },
  { id: 15, title: 'Binary Tree Level Order Traversal',  difficulty: 'Medium', topic: 'Trees',                solved: true,  description: 'Return the level-order (BFS) traversal of a binary tree, with values grouped by depth.', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', notes: '' },
  { id: 16, title: 'Course Schedule',                   difficulty: 'Medium', topic: 'Graphs',               solved: true,  description: 'Determine if you can finish all courses given a list of prerequisite pairs (cycle detection).', link: 'https://leetcode.com/problems/course-schedule/', notes: '' },
  { id: 17, title: '3Sum',                              difficulty: 'Medium', topic: 'Arrays',               solved: true,  description: 'Find all unique triplets in the array that sum to zero using sorting and two pointers.', link: 'https://leetcode.com/problems/3sum/', notes: '' },
  { id: 18, title: 'Group Anagrams',                    difficulty: 'Medium', topic: 'Strings',              solved: true,  description: 'Group an array of strings so that all anagrams are together, using sorted keys or character counts.', link: 'https://leetcode.com/problems/group-anagrams/', notes: '' },
  { id: 19, title: 'Number of Islands',                 difficulty: 'Medium', topic: 'Graphs',               solved: true,  description: 'Count the number of islands in a 2D grid where "1" is land and "0" is water using DFS or BFS.', link: 'https://leetcode.com/problems/number-of-islands/', notes: '' },
  { id: 20, title: 'Validate Binary Search Tree',       difficulty: 'Medium', topic: 'Trees',                solved: false, description: 'Determine if a binary tree is a valid BST where every node satisfies the BST property.', link: 'https://leetcode.com/problems/validate-binary-search-tree/', notes: '' },
  { id: 21, title: 'Product of Array Except Self',      difficulty: 'Medium', topic: 'Arrays',               solved: false, description: 'Return an array where each element is the product of all other elements, without using division.', link: 'https://leetcode.com/problems/product-of-array-except-self/', notes: '' },
  { id: 22, title: 'Decode Ways',                       difficulty: 'Medium', topic: 'Dynamic Programming',  solved: false, description: 'Count the number of ways to decode a numeric string where "1"–"26" map to "A"–"Z".', link: 'https://leetcode.com/problems/decode-ways/', notes: '' },

  // ── Hard (1 solved, 2 unsolved) ────────────────────
  { id: 23, title: 'Merge K Sorted Lists',              difficulty: 'Hard',   topic: 'Linked List',          solved: true,  description: 'Merge k sorted linked lists into one sorted list using a min-heap or divide-and-conquer.', link: 'https://leetcode.com/problems/merge-k-sorted-lists/', notes: '' },
  { id: 24, title: 'Trapping Rain Water',               difficulty: 'Hard',   topic: 'Arrays',               solved: false, description: 'Compute how much water can be trapped between bars of an elevation map after raining.', link: 'https://leetcode.com/problems/trapping-rain-water/', notes: '' },
  { id: 25, title: 'Word Ladder',                       difficulty: 'Hard',   topic: 'Graphs',               solved: false, description: 'Find the shortest transformation sequence from a begin word to an end word, changing one letter at a time.', link: 'https://leetcode.com/problems/word-ladder/', notes: '' },
];
