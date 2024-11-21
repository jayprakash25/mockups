'use client'

import { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface FileContent {
  id: string
  title: string
  content: string
  type: 'chat'
}

const mockFiles: FileContent[] = [
  {
    id: '1',
    title: 'React Performance Optimization',
    content: `# React Performance Optimization

## Key Points
1. Use React.memo for component memoization
2. Implement useCallback for function memoization
3. Leverage useMemo for expensive calculations
4. Proper key usage in lists
5. Code splitting with React.lazy

## Example Code
\`\`\`jsx
const MemoizedComponent = React.memo(({ data }) => {
  return <div>{data}</div>
});

// useCallback example
const handleClick = useCallback(() => {
  console.log('Button clicked');
}, []);
\`\`\`

## Best Practices
- Only memoize components when necessary
- Profile performance before optimizing
- Use React DevTools to identify re-renders
    `,
    type: 'chat'
  },
  {
    id: '2',
    title: 'NextJS Authentication Setup',
    content: `# NextJS Authentication Setup

## Steps
1. Install next-auth
2. Configure API routes
3. Set up providers
4. Implement protected routes
5. Handle sessions

## Configuration Example
\`\`\`typescript
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session(session, user) {
      return session
    },
  },
})
\`\`\`

## Security Considerations
- Always use HTTPS
- Implement CSRF protection
- Secure cookie handling
    `,
    type: 'chat'
  },
  {
    id: '3',
    title: 'Database Schema Design',
    content: `# Database Schema Design

## Core Principles
1. Normalization
2. Relationships
3. Indexing
4. Data Integrity

## Example Schema
\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(200) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false
);
\`\`\`

## Best Practices
- Use appropriate data types
- Implement proper constraints
- Plan for scalability
- Consider query patterns
    `,
    type: 'chat'
  },
  {
    id: '4',
    title: 'API Integration Guide',
    content: `# API Integration Guide

## REST API Basics
1. Endpoint Structure
2. HTTP Methods
3. Status Codes
4. Authentication

## Example Implementation
\`\`\`typescript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': \`Bearer \${token}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

## Error Handling
- Implement proper error handling
- Use appropriate status codes
- Log errors effectively
    `,
    type: 'chat'
  },
  {
    id: '5',
    title: 'CSS Grid Layout Tutorial',
    content: `# CSS Grid Layout Tutorial

## Grid Basics
1. Grid Container
2. Grid Items
3. Grid Lines
4. Grid Areas

## Example Layout
\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  height: 100vh;
}

.header {
  grid-column: 1 / -1;
}

.sidebar {
  grid-row: 2 / 3;
}

.main-content {
  grid-column: 2 / -1;
  grid-row: 2 / 3;
}

.footer {
  grid-column: 1 / -1;
}
\`\`\`

## Best Practices
- Use grid areas for named sections
- Implement responsive layouts
- Consider fallbacks for older browsers
    `,
    type: 'chat'
  }
]

interface FilePreviewProps {
  selectedFileId: string;
}

export default function FilePreview({ selectedFileId }: FilePreviewProps) {
  const selectedFile = mockFiles.find(file => file.id === selectedFileId)

  return (
    <div className="h-full w-full">
      <ScrollArea className="h-full">
        <div className="p-4 lg:p-6">
          {selectedFile ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <h1 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">
                {selectedFile.title}
              </h1>
              <div className="markdown-content">
                {selectedFile.content.split('\n').map((line, index) => (
                  <div key={index}>
                    {line.startsWith('```') ? (
                      <pre className="bg-muted p-3 lg:p-4 rounded-lg text-sm">
                        <code>{line.replace(/```\w*/, '')}</code>
                      </pre>
                    ) : line.startsWith('#') ? (
                      <h2 className="text-lg lg:text-xl font-semibold mt-3 lg:mt-4 mb-2">
                        {line.replace(/^#+ /, '')}
                      </h2>
                    ) : (
                      <p className="my-2 text-sm lg:text-base">{line}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a file to preview</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
