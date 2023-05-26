import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import styles from './MarkdownStyles.module.scss'

export const MarkdownTextbox = () => {
    const [inputText, setInputText] = React.useState('');
  
    const handleInputChange = (e) => {
      setInputText(e.target.value);
    };
  
    return (
      <div>
        <textarea
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type Markdown or LaTeX here"
          style={{ display: 'flex', width: '100%', maxWidth: '100%' }}
        />
        <ReactMarkdown
          className={styles.markdown}
          children={inputText}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          c
          
        />
      </div>
    );
};
  

