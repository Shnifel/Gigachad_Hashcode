import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import styles from './MarkdownStyles.module.scss'
 //Defining Markdown Text Box
export const MarkdownTextbox = (props) => {
    const inputText = props.text;
  
    
  
    return (
     
        <ReactMarkdown
          className={styles.markdown}
          children={inputText}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          c
          
        />
     
    );
};
  

