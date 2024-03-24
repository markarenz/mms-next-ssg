import React, { useMemo, useState, createContext, useContext } from 'react';
import { CmsPost } from '@/cms-posts/interfaces/posts';

type ContextValue = {
  posts: CmsPost[];
  setPosts: Function;
};

const CmsPageContext = createContext({} as ContextValue);

type Props = {
  children: React.ReactNode;
  loadedPosts?: CmsPost[];
};

export const CmsPageContextProvider: React.FC<Props> = ({ children, loadedPosts }) => {
  const [posts, setPosts] = useState<CmsPost[]>(loadedPosts ?? []);

  const contextValue = useMemo((): ContextValue => {
    return {
      posts,
      setPosts,
    };
  }, [posts, setPosts]);

  return <CmsPageContext.Provider value={contextValue}>{children}</CmsPageContext.Provider>;
};

export const useCmsPageContext = () => {
  return useContext(CmsPageContext);
};
