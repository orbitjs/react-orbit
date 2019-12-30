# react-orbit-hooks
React bindings for orbit.js


## USAGE

```js
import React, { useEffect } from 'react';
import { useQuery } from 'react-orbit';

export default ArticlesList() {
  const {data: articles = [], query} = useQuery();

  useEffect(() => {
    query(t => t.findRecords('article'));
  }, []);

  return (
    {articles.map((article) => (
      <>
        <h1>{article.attributes.title}</h1>
        <p>{article.attributes.body}</p>
      </>
    ))}
  );
}
```
