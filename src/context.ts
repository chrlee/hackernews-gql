// src/context.ts
import { YogaInitialContext } from 'graphql-yoga';
import { userLoader, itemLoader, storyPageLoader } from './database/loaders';

export interface Context extends YogaInitialContext {
  loaders: {
    userLoader: typeof userLoader;
    itemLoader: typeof itemLoader;
    storyPageLoader: typeof storyPageLoader;
  };
}

export function createContext(initialContext: YogaInitialContext): Context {
  return {
    ...initialContext,
    loaders: {
      userLoader,
      itemLoader,
      storyPageLoader,
    },
  };
}
