'use client';

import { FC } from 'react';

interface RubyProps {
  text: string;
  ruby: string;
}

export const Ruby: FC<RubyProps> = ({ text, ruby }) => {
  return (
    <ruby className="inline-block">
      {text}
      <rt className="text-xs text-gray-600">{ruby}</rt>
    </ruby>
  );
};

interface RubyTextProps {
  children: string | React.ReactNode;
}

// HTMLタグを含む文字列をパースしてルビ付きテキストを表示
export const RubyText: FC<RubyTextProps> = ({ children }) => {
  // 文字列でない場合はそのまま返す
  if (typeof children !== 'string') {
    return <>{children}</>;
  }

  const parseRubyText = (text: string) => {
    const parts = text.split(/(<ruby>.*?<\/ruby>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<ruby>')) {
        const match = part.match(/<ruby>(.*?)<rt>(.*?)<\/rt><\/ruby>/);
        if (match) {
          return <Ruby key={index} text={match[1]} ruby={match[2]} />;
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <>{parseRubyText(children)}</>;
};